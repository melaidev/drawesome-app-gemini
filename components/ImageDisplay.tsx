import React from 'react';
import { Spinner } from './Spinner';

interface ImageDisplayProps {
  originalImage: string | undefined | null;
  editedImage: string | null;
  isLoading: boolean;
}

const ImagePlaceholder: React.FC<{ text: string }> = ({ text }) => (
  <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center p-4">
    <span className="text-gray-400 text-center">{text}</span>
  </div>
);

// Reliable external URLs for mockups
const fridgeBgUrl = "https://images.unsplash.com/photo-1619232881248-52b072836261?q=80&w=1974&auto=format&fit=crop";
const tshirtBgUrl = "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1974&auto=format&fit=crop";


export const ImageDisplay: React.FC<ImageDisplayProps> = ({ originalImage, editedImage, isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Original Image */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-lg font-semibold mb-3 text-purple-300">Original Drawing</h2>
        <div className="flex-grow aspect-square flex items-center justify-center">
          {originalImage ? (
            <img src={originalImage} alt="Original" className="max-h-full max-w-full object-contain rounded-md" />
          ) : (
            <ImagePlaceholder text="Upload an image to start" />
          )}
        </div>
      </div>

      {/* Edited Image */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-lg font-semibold mb-3 text-purple-300">Generated Image</h2>
        <div className="flex-grow aspect-square flex items-center justify-center">
          {isLoading ? (
            <div className="text-center text-gray-400">
              <Spinner className="w-12 h-12 mx-auto mb-4" />
              <p>Generating your masterpiece...</p>
              <p className="text-sm mt-2">This can take a moment.</p>
            </div>
          ) : editedImage ? (
            <img src={editedImage} alt="Edited" className="max-h-full max-w-full object-contain rounded-md" />
          ) : (
            <ImagePlaceholder text="Your generated image will appear here" />
          )}
        </div>
      </div>

      {/* Fridge Magnet Mockup */}
      <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-lg font-semibold mb-3 text-purple-300">Fridge Magnet</h2>
        <div 
            className="flex-grow aspect-square flex items-center justify-center relative bg-gray-700 rounded-lg overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${fridgeBgUrl})` }}
        >
            {!isLoading && editedImage ? (
                <div className="relative w-2/5 h-2/5 transform -rotate-6 transition-transform duration-300 hover:scale-110">
                    <img 
                        src={editedImage} 
                        alt="On fridge" 
                        className="w-full h-full object-contain shadow-2xl border-4 border-white bg-white"
                    />
                </div>
            ) : (
                 <ImagePlaceholder text="Product Mockup" />
            )}
        </div>
      </div>
      
      {/* T-Shirt Mockup */}
       <div className="bg-gray-800 p-4 rounded-lg shadow-lg flex flex-col">
        <h2 className="text-lg font-semibold mb-3 text-purple-300">T-Shirt</h2>
        <div 
            className="flex-grow aspect-square flex items-center justify-center relative bg-gray-700 rounded-lg overflow-hidden bg-cover bg-center"
            style={{ backgroundImage: `url(${tshirtBgUrl})` }}
        >
             {!isLoading && editedImage ? (
                <img 
                    src={editedImage} 
                    alt="On T-shirt" 
                    className="relative w-1/3 h-1/3 object-contain transition-transform duration-300 hover:scale-110"
                    style={{ top: '-10%' }} // Adjust position to fit the shirt print area
                />
             ) : (
                <ImagePlaceholder text="Product Mockup" />
             )}
        </div>
      </div>

    </div>
  );
};