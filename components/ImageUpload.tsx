
import React, { useRef } from 'react';

interface ImageUploadProps {
  onImageChange: (file: File) => void;
  originalImagePreview: string | undefined;
}

const UploadIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
);


export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, originalImagePreview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageChange(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-3 text-purple-300">1. Upload Image</h2>
      <div
        className="relative border-2 border-dashed border-gray-600 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400 transition-colors duration-300 h-64 flex flex-col items-center justify-center"
        onClick={handleClick}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {originalImagePreview ? (
          <img src={originalImagePreview} alt="Original preview" className="max-h-full max-w-full object-contain rounded-md" />
        ) : (
          <div className="text-gray-400 flex flex-col items-center">
            <UploadIcon className="w-12 h-12 mb-2" />
            <span className="font-semibold">Click to upload</span>
            <span className="text-sm">PNG, JPG, or WEBP</span>
          </div>
        )}
      </div>
    </div>
  );
};
