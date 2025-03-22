import React from 'react';
import Image from 'next/image';

const Logo = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 relative">
        <Image 
          src="/logo.png" 
          alt="Crypto Bellwether" 
          width={32} 
          height={32} 
          className="rounded-full"
        />
      </div>
      <span className="font-bold text-xl text-white">Crypto Bellwether</span>
    </div>
  );
};

export default Logo;
