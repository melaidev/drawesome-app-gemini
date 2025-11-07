
import React, { useState, useCallback } from 'react';
import { editImageWithGemini } from './services/geminiService';
import { ImageFile } from './types';
import { ImageUpload } from './components/ImageUpload';
import { ImageDisplay } from './components/ImageDisplay';
import { PromptControls } from './components/PromptControls';
import { Header } from './components/Header';
import { ErrorDisplay } from './components/ErrorDisplay';

const SYSTEM_PROMPT = `Take this drawing created by my child and transform it into a photorealistic image or realistic 3D render. I don't know what it's supposed to be - it could be a creature, object, or something completely from their imagination.
Keep the original shape, proportions, line lengths, and all imperfections exactly as they are in the drawing - including any slanted eyes, uneven lines, or strange markings. Do not correct, smooth out, or change any details of their design.
Make it look like this thing exists in the real world, with realistic textures (skin, fur, metal, etc.) and natural lighting. You can add realistic shadows and an environment or background that fits the feel of the drawing, but don't change anything about the form or details of what they created. No pencil crayon textures or hand-drawn styles - this must look like a photo or CGI render, but staying true to their imagination.`;

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageFile | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImage({ file, dataUrl: reader.result as string });
      setEditedImage(null); // Reset edited image when a new one is uploaded
      setError(null);
    };
    reader.onerror = () => {
        setError("Failed to read the image file.");
    };
    reader.readAsDataURL(file);
  };

  const handleGenerateClick = useCallback(async () => {
    if (!originalImage) { // Prompt is now optional
      setError('Please upload an image.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      // The FileReader result includes a prefix like "data:image/png;base64,"
      // We need to strip this before sending to the Gemini API
      const base64Data = originalImage.dataUrl.split(',')[1];
      const mimeType = originalImage.file.type;

      const newImageBase64 = await editImageWithGemini(base64Data, mimeType, prompt, SYSTEM_PROMPT);
      
      setEditedImage(`data:image/png;base64,${newImageBase64}`);

    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-7xl mx-auto">
        <Header />
        
        <main className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 space-y-6">
            <ImageUpload onImageChange={handleImageChange} originalImagePreview={originalImage?.dataUrl} />
            <PromptControls 
              prompt={prompt} 
              setPrompt={setPrompt} 
              onGenerate={handleGenerateClick} 
              isLoading={isLoading}
              isReadyToGenerate={!!originalImage}
            />
          </div>
          
          <div className="lg:col-span-8">
            <ErrorDisplay error={error} />
            <ImageDisplay 
              originalImage={originalImage?.dataUrl} 
              editedImage={editedImage}
              isLoading={isLoading} 
            />
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
