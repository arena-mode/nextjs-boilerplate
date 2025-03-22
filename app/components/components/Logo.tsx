import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <img 
        src="/goat.png" 
        alt="Crypto Bellwether" 
        width={32} 
        height={32} 
        className="rounded-full"
      />
      <span className="font-bold text-xl text-white">Crypto Bellwether</span>
    </Link>
  );
};

export default Logo;
