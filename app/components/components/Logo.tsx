import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* Temporary text-based logo until we resolve the image issue */}
      <div className="flex items-center justify-center w-8 h-8 bg-white rounded-full">
        <span className="text-lg font-bold text-black">CB</span>
      </div>
      <span className="font-bold text-xl text-white">Crypto Bellwether</span>
    </Link>
  );
};

export default Logo;
