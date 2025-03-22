import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-8 h-8">
        <img 
          src="/Screenshot 2025-01-29 172239.png" 
          alt="Crypto Bellwether" 
          className="w-full h-full object-contain rounded-full"
        />
      </div>
      <span className="font-bold text-xl text-white">Crypto Bellwether</span>
    </Link>
  );
};

export default Logo;
