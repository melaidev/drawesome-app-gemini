import { GoogleGenAI, Modality } from "@google/genai";

// A singleton instance of the GoogleGenAI class.
// It is initialized lazily to prevent a startup crash if the API key is not available.
let ai: GoogleGenAI | undefined;

/**
 * Initializes and returns a singleton instance of the GoogleGenAI client.
 * Throws an error if the API key is not configured in the environment.
 */
function getAiClient(): GoogleGenAI {
  if (ai) {
    return ai;
  }
  
  // In a browser environment, `process` is not defined. The execution environment
  // is expected to inject this. If it's missing, we need to handle it gracefully
  // instead of crashing the entire application on startup.
  const API_KEY = (typeof process !== 'undefined' && process.env) ? process.env.API_KEY : undefined;

  if (!API_KEY) {
    throw new Error("API_KEY is not configured. Please ensure it is set up correctly in the execution environment.");
  }

  ai = new GoogleGenAI({ apiKey: API_KEY });
  return ai;
}

export const editImageWithGemini = async (
  base64ImageData: string,
  mimeType: string,
  prompt: string,
  systemInstruction: string
): Promise<string> => {
  try {
    const genAI = getAiClient(); // Initialize lazily on first call

    // For image editing models, all text guidance should be in the main prompt.
    // The `systemInstruction` config is not supported for this model.
    const fullPrompt = `${systemInstruction}\n\n${prompt}`;

    const response = await genAI.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64ImageData,
              mimeType: mimeType,
            },
          },
          {
            text: fullPrompt,
          },
        ],
      },
      config: {
        responseModalities: [Modality.IMAGE],
      },
    });

    // Find the part with image data in the response
    const imagePart = response.candidates?.[0]?.content?.parts?.find(part => part.inlineData);

    if (imagePart && imagePart.inlineData) {
      return imagePart.inlineData.data;
    } else {
      // Handle cases where no image is returned with more specific error messages
      const candidate = response.candidates?.[0];
      const finishReason = candidate?.finishReason;
      
      let errorMessage = "Image generation failed.";

      if (finishReason === 'SAFETY') {
        const blockedCategories = candidate.safetyRatings
          ?.filter(r => r.blocked)
          .map(r => r.category.replace('HARM_CATEGORY_', ''))
          .join(', ');
        errorMessage = `Request blocked for safety reasons. Categories: ${blockedCategories || 'Unknown'}. Please modify your prompt or image.`;
      } else if (finishReason === 'NO_IMAGE') {
         errorMessage = "The model could not generate an image from the prompt. Please try modifying your specifications.";
      } else if (finishReason) {
         errorMessage = `Image generation stopped unexpectedly. Reason: ${finishReason}.`;
      } else {
        errorMessage = "No image data was found in the API response. The prompt might have been blocked or the model could not fulfill the request.";
      }
      
      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
      throw error; // Re-throw the specific error to be displayed in the UI
    }
    // Fallback for non-Error exceptions
    throw new Error("An unexpected error occurred during image generation.");
  }
};
