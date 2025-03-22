'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function AdminTab() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Tab that's always visible */}
      <div 
        className="fixed left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 cursor-pointer rounded-r-md z-50"
        onClick={() => setIsOpen(true)}
      >
        <span className="writing-vertical">Admin</span>
      </div>

      {/* Slide-out panel */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex">
          {/* Background overlay */}
          <div 
            className="fixed inset-0 bg-black opacity-50"
            onClick={() => setIsOpen(false)}
          ></div>
          
          {/* Slide-out panel content */}
          <div className="relative bg-white w-64 p-4 shadow-lg h-full overflow-y-auto">
            <button 
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setIsOpen(false)}
            >
              ✕
            </button>
            
            <h2 className="text-xl font-bold mb-4">Admin Access</h2>
            
            <Link href="/admin" className="block p-2 bg-blue-500 text-white text-center rounded">
              Admin Dashboard
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        .writing-vertical {
          writing-mode: vertical-rl;
          text-orientation: mixed;
          transform: rotate(180deg);
          padding: 10px 0;
        }
      `}</style>
    </>
  );
}
