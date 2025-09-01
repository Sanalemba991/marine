'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, User, Clock, Tag } from 'lucide-react';
import HTMLFlipBook from 'react-pageflip';
import { motion, AnimatePresence } from 'framer-motion';

interface BlogPage {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: string;
  excerpt: string;
  content: string;
  tags: string[];
}

// Page component with forwardRef for react-pageflip compatibility
const Page = React.forwardRef((props: { children: React.ReactNode }, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div 
      ref={ref} 
      className="h-full w-full bg-white rounded-lg shadow-lg overflow-hidden"
      style={{ padding: '16px', boxSizing: 'border-box' }}
    >
      {props.children}
    </div>
  );
});
Page.displayName = 'Page';

// Cover component with forwardRef
const PageCover = React.forwardRef((props: { children: React.ReactNode }, ref: React.Ref<HTMLDivElement>) => {
  return (
    <div 
      ref={ref} 
      className="h-full w-full bg-gradient-to-br from-blue-600 to-purple-700 rounded-lg shadow-xl flex items-center justify-center"
      data-density="hard"
    >
      <div className="text-center text-white p-8">
        {props.children}
      </div>
    </div>
  );
});
PageCover.displayName = 'PageCover';

const BlogFlipbook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isFlipbookReady, setIsFlipbookReady] = useState(false);
  const flipBook = useRef<any>(null);

  const blogPages: BlogPage[] = [
    {
      id: 1,
      title: "The Future of Web Development",
      subtitle: "Exploring Next.js 14 and Beyond",
      author: "Sarah Chen",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop",
      excerpt: "Discover how Next.js 14 is revolutionizing the way we build modern web applications with its new features and optimizations.",
      content: "The landscape of web development continues to evolve at breakneck speed. With the release of Next.js 14, developers now have access to powerful new features that streamline the development process and enhance user experience.",
      tags: ["Next.js", "React", "Web Development"]
    },
    {
      id: 2,
      title: "Mastering TypeScript",
      subtitle: "Advanced Patterns for Modern Applications",
      author: "Michael Rodriguez",
      date: "March 20, 2024",
      readTime: "12 min read",
      category: "Programming",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop",
      excerpt: "Deep dive into advanced TypeScript patterns that will elevate your code quality and developer experience.",
      content: "TypeScript has become the de facto standard for building robust JavaScript applications. As projects grow in complexity, understanding advanced patterns becomes crucial.",
      tags: ["TypeScript", "Programming", "Best Practices"]
    },
    {
      id: 3,
      title: "AI in Design Systems",
      subtitle: "How Machine Learning is Reshaping UX",
      author: "Emma Thompson",
      date: "March 25, 2024",
      readTime: "10 min read",
      category: "Design",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop",
      excerpt: "Explore how artificial intelligence is transforming design systems and creating more personalized user experiences.",
      content: "The intersection of artificial intelligence and user experience design is creating unprecedented opportunities for personalization and efficiency.",
      tags: ["AI", "Design Systems", "UX"]
    },
  ];

  const nextPage = () => {
    if (flipBook.current && isFlipbookReady && currentPage < totalPages - 1) {
      try {
        flipBook.current.pageFlip().flipNext();
      } catch (error) {
        console.error('Error flipping next page:', error);
      }
    }
  };

  const prevPage = () => {
    if (flipBook.current && isFlipbookReady && currentPage > 0) {
      try {
        flipBook.current.pageFlip().flipPrev();
      } catch (error) {
        console.error('Error flipping previous page:', error);
      }
    }
  };

  const goToPage = (pageIndex: number) => {
    if (flipBook.current && isFlipbookReady && pageIndex >= 0 && pageIndex < totalPages) {
      try {
        flipBook.current.pageFlip().flip(pageIndex);
      } catch (error) {
        console.error('Error going to page:', error);
      }
    }
  };

  const onPage = (e: { data: number }) => {
    setCurrentPage(e.data);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (flipBook.current && flipBook.current.pageFlip) {
        try {
          const pageFlip = flipBook.current.pageFlip();
          if (pageFlip) {
            setTotalPages(pageFlip.getPageCount());
            setIsFlipbookReady(true);
          }
        } catch (error) {
          console.error('Error initializing flipbook:', error);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevPage();
      } else if (e.key === 'ArrowRight') {
        nextPage();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentPage, isFlipbookReady]);

  // Responsive dimensions
  const getFlipbookDimensions = () => {
    if (typeof window === 'undefined') return { width: 400, height: 500 };
    
    if (window.innerWidth < 640) {
      return { width: 280, height: 380 };
    } else if (window.innerWidth < 768) {
      return { width: 350, height: 450 };
    } else if (window.innerWidth < 1024) {
      return { width: 450, height: 550 };
    } else {
      return { width: 500, height: 600 };
    }
  };

  const { width, height } = getFlipbookDimensions();

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative py-8 px-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Main Flipbook Container */}
      <div 
        className="relative w-full max-w-4xl mx-auto"
        style={{ height: `${height}px` }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        {/* React PageFlip Component */}
        <HTMLFlipBook
          ref={flipBook}
          width={width}
          height={height}
          size="stretch"
          minWidth={280}
          maxWidth={600}
          minHeight={380}
          maxHeight={700}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onPage}
          className="bg-transparent mx-auto"
          style={{ position: 'relative' }}
          startPage={0}
          drawShadow={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={0}
          showPageCorners={true}
          disableFlipByClick={false}
        >
          {/* Cover Page */}
          <PageCover>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-2xl md:text-3xl font-bold mb-3">Tech Blog Flipbook</h1>
              <p className="text-lg md:text-xl opacity-90">Interactive reading experience</p>
              <div className="mt-6 text-xs md:text-sm opacity-80">
                <p>Use arrow keys or navigation buttons</p>
                <p>Click on page corners to flip</p>
              </div>
            </motion.div>
          </PageCover>

          {/* Content Pages */}
          {blogPages.map((blog, index) => (
            <Page key={blog.id}>
              <div className="flex flex-col h-full">
                {/* Image Section */}
                <div className="h-32 md:h-40 relative overflow-hidden rounded-t-lg mb-3">
                  <motion.img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover"
                    initial={{ scale: 1.1 }}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="absolute top-2 left-2">
                    <span className="bg-white/90 backdrop-blur-sm text-gray-800 px-2 py-1 rounded-full text-xs font-semibold shadow-md">
                      {blog.category}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 overflow-y-auto p-1">
                  {/* Meta Information */}
                  <div className="flex items-center gap-2 text-gray-600 mb-3 flex-wrap text-xs">
                    <div className="flex items-center gap-1">
                      <User size={12} />
                      <span>{blog.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar size={12} />
                      <span>{blog.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock size={12} />
                      <span>{blog.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <motion.h2 
                    className="text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {blog.title}
                  </motion.h2>

                  {/* Subtitle */}
                  <motion.h3 
                    className="text-sm md:text-md text-gray-700 mb-2 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    {blog.subtitle}
                  </motion.h3>

                  {/* Excerpt */}
                  <motion.p 
                    className="text-gray-600 text-xs md:text-sm leading-relaxed mb-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    {blog.excerpt}
                  </motion.p>

                  {/* Tags */}
                  <motion.div 
                    className="flex items-center gap-1 mb-3 flex-wrap"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <Tag size={12} className="text-gray-500" />
                    {blog.tags.map((tag, tagIndex) => (
                      <span 
                        key={tagIndex}
                        className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </motion.div>

                  {/* Read More Button */}
                  <motion.button 
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 rounded-full font-semibold text-xs hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-md"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Read Full Article
                  </motion.button>
                </div>

                {/* Page Number */}
                <div className="pt-2 text-center text-xs text-gray-500 border-t mt-2">
                  Page {index + 1} of {blogPages.length}
                </div>
              </div>
            </Page>
          ))}

          {/* Back Cover */}
          <PageCover>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-2xl md:text-3xl font-bold mb-3">Thank You</h2>
              <p className="text-lg md:text-xl opacity-90">Hope you enjoyed the reading experience</p>
              <div className="mt-6 text-xs md:text-sm opacity-80">
                <p>Created with React & react-pageflip</p>
              </div>
            </motion.div>
          </PageCover>
        </HTMLFlipBook>

        {/* Navigation Controls - Only show when hovering */}
        <AnimatePresence>
          {isHovering && (
            <>
              <motion.button
                onClick={prevPage}
                disabled={currentPage === 0 || !isFlipbookReady}
                className={`absolute left-2 md:left-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 z-10 ${
                  currentPage === 0 || !isFlipbookReady
                    ? 'opacity-50 cursor-not-allowed' 
                    : 'hover:bg-white hover:scale-110 hover:shadow-xl'
                }`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronLeft size={20} className="text-gray-700" />
              </motion.button>

              <motion.button
                onClick={nextPage}
                disabled={currentPage === totalPages - 1 || !isFlipbookReady}
                className={`absolute right-2 md:right-4 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-white/90 backdrop-blur-sm shadow-lg transition-all duration-300 z-10 ${
                  currentPage === totalPages - 1 || !isFlipbookReady
                    ? 'opacity-50 cursor-not-allowed'
                    : 'hover:bg-white hover:scale-110 hover:shadow-xl'
                }`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronRight size={20} className="text-gray-700" />
              </motion.button>
            </>
          )}
        </AnimatePresence>

        {/* Page Indicators */}
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex gap-1.5">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                disabled={!isFlipbookReady}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  index === currentPage
                    ? 'bg-white scale-125 shadow-lg'
                    : 'bg-white/50 hover:bg-white/80 hover:scale-110'
                } ${!isFlipbookReady ? 'opacity-50 cursor-not-allowed' : ''}`}
              />
            ))}
          </div>
        </div>

        {/* Floating Page Counter */}
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
            Page {currentPage + 1} of {totalPages}
          </div>
        </div>

        {/* Keyboard Navigation Hint */}
        <motion.div 
          className="absolute bottom-12 right-2 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-white/90 backdrop-blur-sm text-gray-700 px-2 py-1 rounded-lg text-xs shadow-lg">
            Use ← → keys to navigate
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Error Boundary Component
interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error('Blog flipbook error:', error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="h-screen w-full flex items-center justify-center bg-gray-900 text-white">
          <div className="text-center p-6 bg-gray-800 rounded-lg shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
            <p className="text-gray-400 mb-4">The flipbook encountered an error.</p>
            <details className="text-left mb-4 text-sm text-gray-500">
              {this.state.error && this.state.error.toString()}
            </details>
            <button
              onClick={this.resetErrorBoundary}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

// Main export with error boundary
export default function Flipbook() {
  return (
    <ErrorBoundary>
      <BlogFlipbook />
    </ErrorBoundary>
  );
}