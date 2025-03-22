import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* Simple placeholder circle */}
      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
        <span className="text-white font-bold text-xs">CB</span>
      </div>
      <span className="font-bold text-xl text-white">Crypto Bellwether</span>
    </Link>
  );
};

export default Logo;
