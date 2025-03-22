import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        className="text-white"
      >
        <rect width="32" height="32" rx="16" fill="currentColor" opacity="0.2" />
        <path 
          d="M10 10L22 22M22 10L10 22" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round"
        />
      </svg>
      <span className="font-bold text-xl text-white">Crypto Bellwether</span>
    </div>
  );
};

export default Logo;
