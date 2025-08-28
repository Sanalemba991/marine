// components/Flipbook.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipbookProps {
  pages: React.ReactNode[];
  width?: number;
  height?: number;
  className?: string;
  showControls?: boolean;
  showIndicators?: boolean;
}

export default function Flipbook({
  pages,
  width = 400,
  height = 600,
  className = '',
  showControls = true,
  showIndicators = true
}: FlipbookProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const flipbookRef = useRef<HTMLDivElement>(null);

  const totalPages = pages.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1 && !isFlipping) {
      setIsFlipping(true);
      setCurrentPage(prev => prev + 1);
      setTimeout(() => setIsFlipping(false), 500);
    }
  };

  const prevPage = () => {
    if (currentPage > 0 && !isFlipping) {
      setIsFlipping(true);
      setCurrentPage(prev => prev - 1);
      setTimeout(() => setIsFlipping(false), 500);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextPage();
      if (e.key === 'ArrowLeft') prevPage();
      if (e.key === 'Home') goToPage(0);
      if (e.key === 'End') goToPage(totalPages - 1);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, isFlipping]);

  const goToPage = (pageIndex: number) => {
    if (pageIndex >= 0 && pageIndex < totalPages && !isFlipping) {
      setIsFlipping(true);
      setCurrentPage(pageIndex);
      setTimeout(() => setIsFlipping(false), 500);
    }
  };

  // Handle swipe gestures for mobile
  useEffect(() => {
    const element = flipbookRef.current;
    if (!element) return;

    let touchStartX = 0;
    let touchEndX = 0;

    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    };

    const handleSwipe = () => {
      if (touchEndX < touchStartX - 50) {
        nextPage(); // Swipe left
      } else if (touchEndX > touchStartX + 50) {
        prevPage(); // Swipe right
      }
    };

    element.addEventListener('touchstart', handleTouchStart);
    element.addEventListener('touchend', handleTouchEnd);

    return () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentPage, isFlipping]);

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Flipbook Container */}
      <div
        ref={flipbookRef}
        className="relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl shadow-2xl overflow-hidden border-2 border-gray-300"
        style={{ width, height }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* Current Page */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 w-full h-full bg-white p-6"
            style={{
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'hidden'
            }}
          >
            <div className="w-full h-full flex items-center justify-center overflow-auto">
              {pages[currentPage]}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Page Corner for Visual Effect */}
        <div 
          className={`absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-gray-500 to-transparent cursor-pointer z-10 transition-all duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-70'
          }`}
          onClick={nextPage}
        />
        
        {/* Left Page Corner for Previous Page */}
        <div 
          className={`absolute top-0 left-0 w-12 h-12 bg-gradient-to-br from-gray-500 to-transparent cursor-pointer z-10 transition-all duration-300 ${
            isHovering ? 'opacity-100' : 'opacity-70'
          }`}
          onClick={prevPage}
        />
      </div>

      {/* Navigation Controls */}
      {showControls && (
        <div className="flex gap-4 mt-6">
          <button
            onClick={prevPage}
            disabled={currentPage === 0 || isFlipping}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-md"
          >
            ← Previous
          </button>
          
          <span className="px-4 py-2 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg text-gray-700 font-medium shadow-md flex items-center">
            Page {currentPage + 1} of {totalPages}
          </span>
          
          <button
            onClick={nextPage}
            disabled={currentPage === totalPages - 1 || isFlipping}
            className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed hover:from-blue-600 hover:to-blue-700 transition-all duration-300 font-medium shadow-md"
          >
            Next →
          </button>
        </div>
      )}

      {/* Page Indicators */}
      {showIndicators && (
        <div className="flex gap-2 mt-4">
          {pages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToPage(index)}
              disabled={isFlipping}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentPage 
                  ? 'bg-blue-500 scale-125' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to page ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Sample usage component with example pages
export function FlipbookDemo() {
  const samplePages = [
    <div key={1} className="text-center p-4">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Welcome to the Flipbook!</h2>
      <p className="text-gray-600 mb-8">Swipe or use the buttons to navigate through the pages.</p>
      <div className="text-8xl mb-4 animate-bounce">📖</div>
      <p className="text-sm text-gray-500">Use arrow keys or click the page corners</p>
    </div>,
    
    <div key={2} className="text-center p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Page 2: Features</h3>
      <div className="space-y-3 text-left max-w-md mx-auto">
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <span className="text-green-500 text-xl">✓</span>
          <span>Smooth page transitions</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
          <span className="text-blue-500 text-xl">✓</span>
          <span>Keyboard navigation</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
          <span className="text-purple-500 text-xl">✓</span>
          <span>Responsive design</span>
        </div>
        <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
          <span className="text-yellow-500 text-xl">✓</span>
          <span>Touch swipe support</span>
        </div>
      </div>
      <div className="mt-8 text-6xl animate-pulse">✨</div>
    </div>,
    
    <div key={3} className="text-center p-6">
      <h3 className="text-2xl font-bold mb-4 text-gray-800">Page 3: Content Showcase</h3>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg mb-6 border border-blue-200">
        <p className="text-blue-800 font-medium">You can put any React content here!</p>
      </div>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="bg-red-100 p-3 rounded-lg border border-red-200 shadow-sm">Card 1</div>
        <div className="bg-green-100 p-3 rounded-lg border border-green-200 shadow-sm">Card 2</div>
        <div className="bg-yellow-100 p-3 rounded-lg border border-yellow-200 shadow-sm">Card 3</div>
        <div className="bg-purple-100 p-3 rounded-lg border border-purple-200 shadow-sm">Card 4</div>
      </div>
      <div className="text-sm text-gray-500 mt-4">
        Try keyboard shortcuts: ← → arrows, Home, End
      </div>
    </div>,
    
    <div key={4} className="text-center p-6">
      <h3 className="text-2xl font-bold mb-6 text-gray-800">Final Page</h3>
      <p className="text-gray-700 mb-8">Thanks for exploring the flipbook component!</p>
      <div className="text-8xl mb-4 animate-spin">🎉</div>
      <p className="text-sm text-gray-500">Built with Next.js, Tailwind CSS, and Framer Motion</p>
    </div>
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Interactive Flipbook</h1>
        <p className="text-gray-600 mb-8">A responsive flipbook component with smooth animations</p>
        <Flipbook 
          pages={samplePages} 
          width={500}
          height={700}
          className="mb-8"
        />
        <div className="bg-white p-4 rounded-lg shadow-md max-w-md mx-auto">
          <h3 className="font-medium text-gray-800 mb-2">Navigation Tips</h3>
          <ul className="text-sm text-gray-600 text-left">
            <li>• Click page corners to flip</li>
            <li>• Use arrow keys for keyboard navigation</li>
            <li>• Swipe left/right on touch devices</li>
            <li>• Use Home/End keys to jump to first/last page</li>
          </ul>
        </div>
      </div>
    </div>
  );
}