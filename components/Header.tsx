import React from 'react';

const WandIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.981A10.501 10.501 0 0118 16.5a10.5 10.5 0 01-10.5-10.5c0-1.741.421-3.374 1.185-4.863a.75.75 0 01.819-.162z"
      clipRule="evenodd"
    />
    <path
      fillRule="evenodd"
      d="M11.072 2.193a.75.75 0 01.162.819A8.97 8.97 0 0010.5 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.981A10.501 10.501 0 0119.5 16.5a10.5 10.5 0 01-10.5-10.5c0-1.741.421-3.374 1.185-4.863a.75.75 0 01.819-.162zM13.5 5.25a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zM12 7.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H12zM15.75 9.75a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zM10.5 9.75A.75.75 0 009.75 9h-.008a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008zM9.75 12a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008zM7.5 13.5a.75.75 0 00-.75.75v.008c0 .414.336.75.75.75h.008a.75.75 0 00.75-.75v-.008a.75.75 0 00-.75-.75H7.5z"
      clipRule="evenodd"
    />
  </svg>
);


export const Header: React.FC = () => {
  return (
    <header className="text-center">
      <div className="flex items-center justify-center gap-4">
        <WandIcon className="w-10 h-10 text-purple-400"/>
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-400 to-indigo-500 text-transparent bg-clip-text">
          Drawesome!
        </h1>
      </div>
      <p className="mt-4 text-lg text-gray-400">
        From Heart to World
      </p>
    </header>
  );
};