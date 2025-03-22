import React from 'react';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <img 
        src="/Screenshot 2025-01-29 172239.png" 
        alt="Crypto Bellwether" 
        width={32} 
        height={32} 
      />
      <span className="font-bold text-xl text-white">Crypto Bellwether</span>
    </div>
  );
};

export default Logo;
