import React from 'react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      {/* Simple SVG icon */}
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="bg-white rounded-full p-1">
        <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="black" strokeWidth="2" />
        <path d="M2 17l10 5 10-5" stroke="black" strokeWidth="2" />
        <path d="M2 12l10 5 10-5" stroke="black" strokeWidth="2" />
      </svg>
      <span className="font-bold text-xl text-white">Crypto Bellwether</span>
    </Link>
  );
};

export default Logo;
