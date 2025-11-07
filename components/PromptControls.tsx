
import React from 'react';
import { Spinner } from './Spinner';

interface PromptControlsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onGenerate: () => void;
  isLoading: boolean;
  isReadyToGenerate: boolean;
}

export const PromptControls: React.FC<PromptControlsProps> = ({ prompt, setPrompt, onGenerate, isLoading, isReadyToGenerate }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold mb-3 text-purple-300">2. Add Specifications</h2>
      <textarea
        className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-300 resize-none"
        rows={4}
        placeholder="e.g. 'Use a unicorn theme' or 'Make it look like a watercolor painting' or 'use no background'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !isReadyToGenerate}
        className="mt-4 w-full flex items-center justify-center bg-purple-600 text-white font-bold py-3 px-4 rounded-md hover:bg-purple-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
      >
        {isLoading ? (
          <>
            <Spinner />
            Generating...
          </>
        ) : (
          'Generate Image'
        )}
      </button>
    </div>
  );
};
