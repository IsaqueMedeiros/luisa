import React, { useState, useEffect } from 'react';
import SkyAndAtmosphere from './skyAndAtmosphere';
import Cityscape from './cityscape';
import InteractiveElements from './interactiveElements';

const NYCCinemaBackground = ({ children, variant = 'day' }) => {
  const [timeOfDay, setTimeOfDay] = useState('golden');
  const [currentQuote, setCurrentQuote] = useState(0);
  const [showingMovie, setShowingMovie] = useState(0);
  const [romanticElements, setRomanticElements] = useState(true);
  const [festivalMode, setFestivalMode] = useState(true);

  const quotes = [
    { text: "I couldn't help but wonder...", show: "SATC", color: "text-pink-400" },
    { text: "Have you met Ted?", show: "HIMYM", color: "text-blue-400" },
    { text: "Winter is coming...", show: "GOT", color: "text-gray-400" },
    { text: "Dancing Queen, young and sweet...", show: "ABBA", color: "text-yellow-400" },
    { text: "The universe has a plan", show: "HIMYM", color: "text-green-400" },
    { text: "I'm looking for love. Real love.", show: "SATC", color: "text-rose-400" },
    { text: "Challenge accepted!", show: "HIMYM", color: "text-orange-400" },
    { text: "A girl has no name", show: "GOT", color: "text-purple-400" },
    { text: "You can dance, you can jive", show: "ABBA", color: "text-teal-400" }
  ];

  const movies = [
    { title: "MAMMA MIA!", genre: "Musical Romance", color: "text-yellow-300" },
    { title: "HOW I MET YOUR MOTHER", genre: "Comedy Romance", color: "text-blue-300" },
    { title: "SEX AND THE CITY", genre: "Romance Drama", color: "text-pink-300" },
    { title: "GAME OF THRONES", genre: "Epic Fantasy", color: "text-purple-300" },
    { title: "MAMMA MIA! HERE WE GO AGAIN", genre: "Musical Romance", color: "text-cyan-300" }
  ];

  useEffect(() => {
    const quoteInterval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
    }, 4000);

    const movieInterval = setInterval(() => {
      setShowingMovie((prev) => (prev + 1) % movies.length);
    }, 5000);

    return () => {
      clearInterval(quoteInterval);
      clearInterval(movieInterval);
    };
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gray-900">
      <SkyAndAtmosphere 
        timeOfDay={timeOfDay} 
        festivalMode={festivalMode} 
        romanticElements={romanticElements} 
      />
      
      <Cityscape 
        timeOfDay={timeOfDay} 
        festivalMode={festivalMode} 
        showingMovie={showingMovie} 
        movies={movies} 
      />

      
      <InteractiveElements 
        timeOfDay={timeOfDay}
        setTimeOfDay={setTimeOfDay}
        festivalMode={festivalMode}
        setFestivalMode={setFestivalMode}
        romanticElements={romanticElements}
        setRomanticElements={setRomanticElements}
        currentQuote={currentQuote}
        quotes={quotes}
        showingMovie={showingMovie}
        movies={movies}
      />

      {/* Content area */}
      <div className="relative z-10 pt-24">
        {children}
      </div>

      {/* Styles */}
      <style jsx>{`
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
          0%, 100% {
            transform: rotate(-3deg);
          }
          50% {
            transform: rotate(3deg);
          }
        }

        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-220%);
          }
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
        
        .animate-gentleFloat {
            animation: gentleFloat 8s ease-in-out infinite;
        }
        
        .animate-slideIn {
            animation: slideIn 0.8s ease-out;
        }

        .animate-sway {
            animation: sway 5s ease-in-out infinite;
        }

        .animate-scroll {
            animation: scroll 20s linear infinite;
        }

        .animate-twinkle {
            animation: twinkle 3s ease-in-out infinite;
        }

        [title]:hover {
            transform: scale(1.4);
            transition: transform 0.3s ease-in-out;
            filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.9));
        }

        .festival-glow {
            box-shadow: 0 0 40px rgba(255, 215, 0, 0.6);
        }

        .romantic-glow {
            box-shadow: 0 0 35px rgba(255, 182, 193, 0.7);
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

        .festival-light {
            animation: festivalPulse 1.8s ease-in-out infinite;
        }
        
        .bg-pattern-red-carpet {
            background-image: 
                linear-gradient(45deg, #c00 25%, transparent 25%, transparent 75%, #c00 75%, #c00),
                linear-gradient(45deg, #c00 25%, transparent 25%, transparent 75%, #c00 75%, #c00);
            background-size: 20px 20px;
            background-position: 0 0, 10px 10px;
        }
      `}</style>
    </div>
  );
};

export default NYCCinemaBackground;