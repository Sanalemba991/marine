"use client";

import React, { useState, useEffect, useRef } from "react";
import image1 from "../assets/book-pages/page-1.jpg";
import image2 from "../assets/book-pages/page-2.jpg";
import image3 from "../assets/book-pages/page-3.jpg";
import image4 from "../assets/book-pages/page-4.jpg";
import image5 from "../assets/book-pages/page-5.jpg";
import image6 from "../assets/book-pages/page-6.jpg";
import image7 from "../assets/book-pages/page-7.jpg";
import image8 from "../assets/book-pages/page-8.jpg";
import image9 from "../assets/book-pages/page-9.jpg";
import image10 from "../assets/book-pages/page-10.jpg";
import image11 from "../assets/book-pages/page-11.jpg";
import image12 from "../assets/book-pages/page-12.jpg";
import image13 from "../assets/book-pages/page-13.jpg";
import image14 from "../assets/book-pages/page-14.jpg";
import image15 from "../assets/book-pages/page-15.jpg";
import image16 from "../assets/book-pages/page-16.jpg";
import image17 from "../assets/book-pages/page-17.jpg";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  User,
  Clock,
  Tag,
} from "lucide-react";
import HTMLFlipBook from "react-pageflip";
import { motion, AnimatePresence } from "framer-motion";

interface BlogPage {
  id: number;
  title: string;
  subtitle: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  image: any;
  excerpt: string;
  content: string;
  tags: string[];
}

// Page component with forwardRef for react-pageflip compatibility
const Page = React.forwardRef(
  (props: { children: React.ReactNode }, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className="h-full w-full bg-white overflow-hidden"
        style={{ boxShadow: "none" }}
      >
        {props.children}
      </div>
    );
  }
);
Page.displayName = "Page";

// Cover component with forwardRef
const PageCover = React.forwardRef(
  (props: { children: React.ReactNode }, ref: React.Ref<HTMLDivElement>) => {
    return (
      <div
        ref={ref}
        className="h-full w-full bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center"
        data-density="hard"
        style={{ boxShadow: "none" }}
      >
        <div className="text-center text-white p-8">{props.children}</div>
      </div>
    );
  }
);
PageCover.displayName = "PageCover";

const BlogFlipbook = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [isFlipbookReady, setIsFlipbookReady] = useState(false);
  const flipBook = useRef<any>(null);

 const blogPages: BlogPage[] = [
    {
      id: 1,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image1,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 2,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image2,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 3,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image3,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 4,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image4,
      excerpt: "",
      content: "",
      tags: [],
    },
    // Add more pages as needed
    {
      id: 5,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image5,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 6,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image6,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 7,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image7,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 8,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image8,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 9,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image9,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 10,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image10,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 11,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image11,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 12,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image12,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 13,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image13,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 14,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image14,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 15,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image15,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 16,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image16,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 17,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image17,
      excerpt: "",
      content: "",
      tags: [],
    },
    {
      id: 18,
      title: "",
      subtitle: "",
      author: "",
      date: "",
      readTime: "",
      category: "",
      image: image17,
      excerpt: "",
      content: "",
      tags: [],
    },
    

  ];

  const nextPage = () => {
    if (flipBook.current && isFlipbookReady && currentPage < totalPages - 1) {
      try {
        flipBook.current.pageFlip().flipNext();
      } catch (error) {
        console.error("Error flipping next page:", error);
      }
    }
  };

  const prevPage = () => {
    if (flipBook.current && isFlipbookReady && currentPage > 0) {
      try {
        flipBook.current.pageFlip().flipPrev();
      } catch (error) {
        console.error("Error flipping previous page:", error);
      }
    }
  };

  const goToPage = (pageIndex: number) => {
    if (
      flipBook.current &&
      isFlipbookReady &&
      pageIndex >= 0 &&
      pageIndex < totalPages
    ) {
      try {
        flipBook.current.pageFlip().flip(pageIndex);
      } catch (error) {
        console.error("Error going to page:", error);
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
          console.error("Error initializing flipbook:", error);
        }
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        prevPage();
      } else if (e.key === "ArrowRight") {
        nextPage();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPage, isFlipbookReady]);

  // Calculate dimensions based on aspect ratio (1747x2486 ≈ 0.702)
  const getFlipbookDimensions = () => {
    if (typeof window === "undefined") return { width: 350, height: 500 };

    const aspectRatio = 1747 / 2486; // Your image aspect ratio
    
    if (window.innerWidth < 640) {
      const width = Math.min(280, window.innerWidth - 40);
      return { width, height: width / aspectRatio };
    } else if (window.innerWidth < 768) {
      const width = Math.min(350, window.innerWidth - 60);
      return { width, height: width / aspectRatio };
    } else if (window.innerWidth < 1024) {
      const width = Math.min(450, window.innerWidth - 80);
      return { width, height: width / aspectRatio };
    } else {
      const width = Math.min(500, window.innerWidth - 100);
      return { width, height: width / aspectRatio };
    }
  };

  const { width, height } = getFlipbookDimensions();

  // Calculate the actual content page number
  const contentPageNumber = currentPage === 0 ? 0 : // Cover page
                          currentPage > totalPages - 2 ? blogPages.length : // Back cover or beyond
                          currentPage; // Content pages

  // Calculate total content pages (excluding covers)
  const totalContentPages = Math.max(0, totalPages - 2);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative py-8 px-4 bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
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
          minWidth={250}
          maxWidth={600}
          minHeight={350}
          maxHeight={850}
          maxShadowOpacity={0.3}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={onPage}
          className="bg-transparent mx-auto"
          style={{ 
            position: "relative", 
            border: "none", 
            borderRadius: "0",
            boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2)"
          }}
          startPage={0}
          drawShadow={true}
          flippingTime={800}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          clickEventForward={true}
          useMouseEvents={true}
          swipeDistance={0}
          showPageCorners={false}
          disableFlipByClick={false}
        >
          {/* Cover Page with Full Background Image */}
          <PageCover>
            <div
              className="h-full w-full relative overflow-hidden"
              style={{ border: "none", borderRadius: "0" }}
            >
              {/* Background Image - Using first image for cover */}
              <img
                src={blogPages[0]?.image?.src}
                alt="Cover"
                className="w-full h-full object-cover"
                style={{ border: "none", borderRadius: "0" }}
              />

              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content overlay */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h1 className="text-2xl md:text-3xl font-bold mb-3 text-center drop-shadow-lg">
                  Tech Blog Flipbook
                </h1>
                <p className="text-lg md:text-xl opacity-90 text-center drop-shadow-lg">
                  Interactive reading experience
                </p>
                <div className="mt-6 text-xs md:text-sm opacity-80 text-center">
                  <p className="drop-shadow-md">
                    Use arrow keys or navigation buttons
                  </p>
                  <p className="drop-shadow-md">
                    Click on page corners to flip
                  </p>
                </div>
              </motion.div>
            </div>
          </PageCover>

          {/* Content Pages */}
          {blogPages.map((blog, index) => (
            <Page key={blog.id}>
              {/* Full-size Image Section */}
              <div
                className="h-full w-full relative overflow-hidden bg-gray-100 flex items-center justify-center"
                style={{ border: "none", borderRadius: "0" }}
              >
                <img
                  src={blog.image.src}
                  alt={blog.title || `Page ${blog.id}`}
                  className="max-w-full max-h-full object-contain"
                  style={{ border: "none", borderRadius: "0" }}
                />
                <div className="absolute bottom-2 left-0 right-0 text-center text-xs text-gray-500">
                  Page {index + 1} of {blogPages.length}
                </div>
              </div>
            </Page>
          ))}

          {/* Back Cover with Full Background Image */}
          <PageCover>
            <div
              className="h-full w-full relative overflow-hidden"
              style={{ border: "none", borderRadius: "0" }}
            >
              {/* Background Image - Using last image for back cover */}
              <img
                src={blogPages[blogPages.length - 1]?.image?.src}
                alt="Back Cover"
                className="w-full h-full object-cover"
                style={{ border: "none", borderRadius: "0" }}
              />

              {/* Overlay for better text readability */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* Content overlay */}
              <motion.div
                className="absolute inset-0 flex flex-col justify-center items-center text-white p-6 z-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-3 text-center drop-shadow-lg">
                  Thank You
                </h2>
                <p className="text-lg md:text-xl opacity-90 text-center drop-shadow-lg">
                  Hope you enjoyed the reading experience
                </p>
                <div className="mt-6 text-xs md:text-sm opacity-80 text-center">
                  <p className="drop-shadow-md">
                    Created with React & react-pageflip
                  </p>
                </div>
              </motion.div>
            </div>
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
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white hover:scale-110 hover:shadow-xl"
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
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-white hover:scale-110 hover:shadow-xl"
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
                    ? "bg-white scale-125 shadow-lg"
                    : "bg-white/50 hover:bg-white/80 hover:scale-110"
                } ${!isFlipbookReady ? "opacity-50 cursor-not-allowed" : ""}`}
              />
            ))}
          </div>
        </div>

        {/* Floating Page Counter */}
        <div className="absolute top-2 right-2 z-10">
          <div className="bg-black/80 backdrop-blur-sm text-white px-2 py-1 rounded-full text-xs font-medium">
            {currentPage === 0 ? "Cover" : 
             currentPage >= totalPages - 1 ? "Back Cover" : 
             `Page ${contentPageNumber} of ${totalContentPages}`}
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

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    console.error("Blog flipbook error:", error, errorInfo);
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
            <p className="text-gray-400 mb-4">
              The flipbook encountered an error.
            </p>
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