import React, { useState, useEffect, useMemo, useCallback } from 'react';
import SkyAndAtmosphere from './skyAndAtmosphere';
import Cityscape from './cityscape';
import InteractiveElements from './interactiveElements';

const NYCCinemaBackground = ({ children, variant = 'day' }) => {
  const [timeOfDay, setTimeOfDay] = useState('golden');
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showingMovie, setShowingMovie] = useState(0);
  const [romanticElements, setRomanticElements] = useState(true);
  const [festivalMode, setFestivalMode] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Static data - memoized to prevent recreation
  const staticData = useMemo(() => ({
    quotes: [
      { text: "I couldn't help but wonder...", show: "SATC", color: "text-pink-400" },
      { text: "Have you met Ted?", show: "HIMYM", color: "text-blue-400" },
      { text: "Winter is coming...", show: "GOT", color: "text-gray-400" },
      { text: "Dancing Queen, young and sweet...", show: "ABBA", color: "text-yellow-400" },
      { text: "The universe has a plan", show: "HIMYM", color: "text-green-400" },
      { text: "I'm looking for love. Real love.", show: "SATC", color: "text-rose-400" },
      { text: "Challenge accepted!", show: "HIMYM", color: "text-orange-400" },
      { text: "A girl has no name", show: "GOT", color: "text-purple-400" },
      { text: "You can dance, you can jive", show: "ABBA", color: "text-teal-400" }
    ],
    movies: [
      { title: "MAMMA MIA!", genre: "Musical Romance", color: "text-yellow-300" },
      { title: "HOW I MET YOUR MOTHER", genre: "Comedy Romance", color: "text-blue-300" },
      { title: "SEX AND THE CITY", genre: "Romance Drama", color: "text-pink-300" },
      { title: "GAME OF THRONES", genre: "Epic Fantasy", color: "text-purple-300" },
      { title: "MAMMA MIA! HERE WE GO AGAIN", genre: "Musical Romance", color: "text-cyan-300" }
    ]
  }), []);

  // Optimized mobile detection
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    
    const debouncedResize = debounce(checkMobile, 150);
    window.addEventListener('resize', debouncedResize);
    return () => window.removeEventListener('resize', debouncedResize);
  }, []);

  // Memoized interval configurations
  const intervalConfig = useMemo(() => ({
    quote: isMobile ? 5000 : 4000, // Slower on mobile to reduce battery drain
    movie: isMobile ? 6000 : 5000
  }), [isMobile]);

  // Optimized interval management
  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % staticData.quotes.length);
    }, intervalConfig.quote);

    const movieInterval = setInterval(() => {
      setShowingMovie((prev) => (prev + 1) % staticData.movies.length);
    }, intervalConfig.movie);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(movieInterval);
    };
  }, [staticData.quotes.length, staticData.movies.length, intervalConfig]);

  // Memoized handlers to prevent unnecessary re-renders
  const handleTimeOfDayChange = useCallback((newTime) => {
    setTimeOfDay(newTime);
  }, []);

  const handleFestivalModeToggle = useCallback((mode) => {
    setFestivalMode(mode);
  }, []);

  const handleRomanticElementsToggle = useCallback((elements) => {
    setRomanticElements(elements);
  }, []);

  // Memoized CSS variables for better performance
  const cssVariables = useMemo(() => ({
    '--scroll-duration': isMobile ? '12s' : '18s',
    '--pulse-duration': isMobile ? '3s' : '2s',
    '--float-duration': isMobile ? '6s' : '4s'
  }), [isMobile]);

  // Memoized component props to prevent unnecessary re-renders
  const componentProps = useMemo(() => ({
    sky: {
      timeOfDay,
      festivalMode,
      romanticElements,
      isMobile
    },
    cityscape: {
      timeOfDay,
      festivalMode,
      showingMovie,
      movies: staticData.movies,
      isMobile
    },
    interactive: {
      timeOfDay,
      setTimeOfDay: handleTimeOfDayChange,
      festivalMode,
      setFestivalMode: handleFestivalModeToggle,
      romanticElements,
      setRomanticElements: handleRomanticElementsToggle,
      currentQuote,
      quotes: staticData.quotes,
      showingMovie,
      movies: staticData.movies,
      isMobile
    }
  }), [
    timeOfDay,
    festivalMode,
    romanticElements,
    currentQuote,
    showingMovie,
    staticData,
    handleTimeOfDayChange,
    handleFestivalModeToggle,
    handleRomanticElementsToggle,
    isMobile
  ]);

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-gray-900"
      style={cssVariables}
    >
      <SkyAndAtmosphere {...componentProps.sky} />
      
      <Cityscape {...componentProps.cityscape} />
      
      <InteractiveElements {...componentProps.interactive} />

      {/* Content area with mobile-optimized spacing */}
      <div className="relative z-10 pt-16 sm:pt-24">
        {children}
      </div>

      {/* Optimized styles with CSS custom properties */}
      <style jsx>{`
        /* Base animations - using CSS custom properties for dynamic values */
        @keyframes scroll {
          0% { transform: translateX(100%); }
          100% { transform: translateX(-100%); }
        }
        
        @keyframes gentleFloat {
          0%, 100% { 
            transform: translateY(0px) translateX(0) rotate(0deg); 
            opacity: 0.6;
          }
          50% { 
            transform: translateY(-20px) translateX(10px) rotate(2deg); 
            opacity: 0.9;
          }
        }
        
        @keyframes slideIn {
          from {
            transform: translateX(-100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes sway {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }

        @keyframes twinkle {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.2);
          }
        }

        @keyframes festivalPulse {
          0%, 100% {
            opacity: 0.4;
            box-shadow: 0 0 8px currentColor;
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 25px currentColor;
          }
        }
        
        /* Animation classes using CSS custom properties */
        .animate-scroll {
          animation: scroll var(--scroll-duration, 18s) linear infinite;
          transform: translateZ(0); /* GPU acceleration */
          will-change: transform;
        }
        
        .animate-gentleFloat {
          animation: gentleFloat var(--float-duration, 8s) ease-in-out infinite;
          transform: translateZ(0);
        }
        
        .animate-slideIn {
          animation: slideIn 0.8s ease-out;
        }

        .animate-sway {
          animation: sway 5s ease-in-out infinite;
          transform: translateZ(0);
        }

        .animate-twinkle {
          animation: twinkle var(--pulse-duration, 3s) ease-in-out infinite;
          transform: translateZ(0);
        }

        .festival-light {
          animation: festivalPulse 1.8s ease-in-out infinite;
        }

        /* Interactive hover effects with performance optimization */
        [title]:hover {
          transform: scale(1.4);
          transition: transform 0.3s ease-in-out;
          filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.9));
          will-change: transform, filter;
        }

        /* Specialized glow effects */
        .festival-glow {
          box-shadow: 0 0 40px rgba(255, 215, 0, 0.6);
        }

        .romantic-glow {
          box-shadow: 0 0 35px rgba(255, 182, 193, 0.7);
        }
        
        /* Background pattern - optimized */
        .bg-pattern-red-carpet {
          background-image: 
            linear-gradient(45deg, #c00 25%, transparent 25%, transparent 75%, #c00 75%, #c00),
            linear-gradient(45deg, #c00 25%, transparent 25%, transparent 75%, #c00 75%, #c00);
          background-size: 20px 20px;
          background-position: 0 0, 10px 10px;
        }

        /* Mobile-specific performance optimizations */
        @media (max-width: 768px) {
          /* Reduce animation complexity on mobile */
          .animate-pulse {
            animation-duration: var(--pulse-duration, 3s);
          }
          
          /* Optimize transforms for mobile */
          .animate-gentleFloat {
            animation-duration: var(--float-duration, 6s);
          }
          
          /* Reduce will-change usage on mobile */
          .animate-scroll {
            will-change: auto;
          }
          
          /* Disable some expensive effects on mobile */
          [title]:hover {
            transform: scale(1.2);
            filter: none;
          }
        }

        /* Reduced motion preference support */
        @media (prefers-reduced-motion: reduce) {
          .animate-pulse,
          .animate-scroll,
          .animate-gentleFloat,
          .animate-sway,
          .animate-twinkle,
          .festival-light {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
          }
          
          [title]:hover {
            transform: none;
            transition: none;
          }
        }

        /* Performance optimizations for all animations */
        .animate-pulse,
        .animate-scroll,
        .animate-gentleFloat,
        .animate-sway,
        .animate-twinkle {
          backface-visibility: hidden;
          perspective: 1000px;
        }
      `}</style>
    </div>
  );
};

// Utility function for debouncing resize events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default NYCCinemaBackground;