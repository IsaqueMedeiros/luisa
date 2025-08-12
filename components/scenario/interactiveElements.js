import React from 'react';

const InteractiveElements = ({ 
  timeOfDay, 
  setTimeOfDay, 
  festivalMode, 
  setFestivalMode, 
  romanticElements, 
  setRomanticElements,
  currentQuote,
  quotes,
  showingMovie,
  movies
}) => {
  return (
    <>
      {/* Controls - Mobile responsive */}
      <div className="absolute top-2 sm:top-4 right-2 sm:right-4 z-30 flex gap-1 sm:gap-2 flex-wrap max-w-xs sm:max-w-none">
        {['golden', 'sunset', 'evening'].map((time) => (
          <button
            key={time}
            onClick={() => setTimeOfDay(time)}
            className={`px-2 sm:px-3 py-1 sm:py-1 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 touch-manipulation ${
              timeOfDay === time 
                ? 'bg-white text-gray-800 shadow-md sm:shadow-lg' 
                : 'bg-white/70 text-gray-600 hover:bg-white hover:shadow-sm sm:hover:shadow-md'
            }`}
          >
            {time.charAt(0).toUpperCase() + time.slice(1)}
          </button>
        ))}
        <button
          onClick={() => setFestivalMode(!festivalMode)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 sm:px-3 py-1 sm:py-1 rounded-full text-xs sm:text-sm font-medium hover:from-purple-600 hover:to-pink-600 transition-all duration-300 shadow-md sm:shadow-lg touch-manipulation"
        >
          <span className="hidden sm:inline">{festivalMode ? '🎬 Festival' : '🏙️ City'}</span>
          <span className="sm:hidden">{festivalMode ? '🎬' : '🏙️'}</span>
        </button>
      </div>

      {/* Romantic toggle - Mobile responsive */}
      <div className="absolute top-2 sm:top-4 left-2 sm:left-4 z-30">
        <button
          onClick={() => setRomanticElements(!romanticElements)}
          className="bg-white/80 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-base text-gray-700 hover:bg-white transition-all duration-300 shadow-md sm:shadow-lg touch-manipulation"
        >
          <span className="hidden sm:inline">{romanticElements ? '💕 Romantic Mode' : '🏙️ City Mode'}</span>
          <span className="sm:hidden">{romanticElements ? '💕' : '🏙️'}</span>
        </button>
      </div>

      {/* Floating decorative elements - Mobile optimized */}
      <div className="absolute inset-0 pointer-events-none">
        {romanticElements && (
          <>
            {/* SATC Elements - Mobile responsive positioning */}
            <div className="absolute top-20 sm:top-40 left-8 sm:left-16 text-2xl sm:text-4xl opacity-60 sm:opacity-70 animate-pulse hover:opacity-90 transition-opacity cursor-pointer" 
                    style={{animationDelay: '0s', pointerEvents: 'auto'}}
                    title="Carrie's Manolo Blahniks">
                👠
            </div>
            <div className="absolute top-28 sm:top-56 right-12 sm:right-24 text-xl sm:text-3xl opacity-50 sm:opacity-60 animate-bounce" 
                    style={{animationDelay: '2s'}}
                    title="Charlotte's pearl necklace">
                📿
            </div>
            <div className="absolute top-36 sm:top-72 left-24 sm:left-48 text-lg sm:text-2xl opacity-40 sm:opacity-50 animate-pulse" 
                    style={{animationDelay: '3s'}}
                    title="Samantha's cosmopolitans">
                🍸
            </div>
            
            {/* HIMYM Elements - Mobile responsive */}
            <div className="absolute top-32 sm:top-64 left-16 sm:left-32 text-2xl sm:text-4xl opacity-60 sm:opacity-70 animate-pulse" 
                    style={{animationDelay: '1s'}}
                    title="Ted's architectural blueprints">
                🏗️
            </div>
            <div className="absolute top-24 sm:top-48 right-20 sm:right-40 text-xl sm:text-3xl opacity-50 sm:opacity-60 animate-bounce" 
                    style={{animationDelay: '3s'}}
                    title="Robin's news anchor desk">
                🎤
            </div>
            <div className="absolute top-42 sm:top-84 left-32 sm:left-64 text-lg sm:text-2xl opacity-40 sm:opacity-50 animate-pulse" 
                    style={{animationDelay: '4s'}}
                    title="Barney's suit">
                🤵
            </div>
            
            {/* GOT Elements - Mobile responsive */}
            <div className="absolute top-16 sm:top-32 right-8 sm:right-16 text-xl sm:text-3xl opacity-40 sm:opacity-50 animate-pulse" 
                    style={{animationDelay: '4s'}}
                    title="The cold winds of winter">
                ❄️
            </div>
            <div className="absolute top-36 sm:top-72 left-12 sm:left-24 text-xl sm:text-3xl opacity-45 sm:opacity-55 animate-bounce" 
                    style={{animationDelay: '1.5s'}}
                    title="Daenerys' dragons">
                🐉
            </div>
            <div className="absolute top-44 sm:top-88 right-16 sm:right-32 text-lg sm:text-2xl opacity-35 sm:opacity-45 animate-pulse" 
                    style={{animationDelay: '5s'}}
                    title="Iron Throne">
                👑
            </div>
            
            {/* Mamma Mia Elements - Mobile responsive */}
            <div className="absolute top-22 sm:top-44 left-1/2 text-2xl sm:text-4xl opacity-60 sm:opacity-70 animate-spin" 
                    style={{animationDuration: '6s', animationDelay: '0s'}}
                    title="Dancing Queen energy">
                💃
            </div>
            <div className="absolute top-30 sm:top-60 left-24 sm:left-48 text-xl sm:text-3xl opacity-50 sm:opacity-60 animate-pulse" 
                    style={{animationDelay: '2.5s'}}
                    title="Greek island paradise">
                🏝️
            </div>
            <div className="absolute top-38 sm:top-76 right-24 sm:right-48 text-lg sm:text-2xl opacity-40 sm:opacity-50 animate-bounce" 
                    style={{animationDelay: '3.5s'}}
                    title="ABBA gold records">
                🏆
            </div>
            <div className="absolute top-46 sm:top-92 left-20 sm:left-40 text-xl sm:text-3xl opacity-50 sm:opacity-60 animate-spin" 
                    style={{animationDuration: '8s', animationDelay: '1s'}}
                    title="Disco ball vibes">
                🕺
            </div>
          </>
        )}

        {/* General NYC Elements - Mobile responsive */}
        <div className="absolute top-18 sm:top-36 right-16 sm:right-32 text-xl sm:text-3xl opacity-60 sm:opacity-70 animate-pulse" 
                style={{animationDelay: '1s'}}
                title="Hollywood magic">
            🎬
        </div>
        <div className="absolute top-26 sm:top-52 left-20 sm:left-40 text-lg sm:text-2xl opacity-40 sm:opacity-50 animate-bounce" 
                style={{animationDelay: '3.5s'}}
                title="The city that never sleeps">
            🌃
        </div>
        <div className="absolute top-34 sm:top-68 right-28 sm:right-56 text-base sm:text-xl opacity-35 sm:opacity-45 animate-pulse" 
                style={{animationDelay: '2.8s'}}
                title="Broadway lights">
            🎭
        </div>
        <div className="absolute top-28 sm:top-56 left-4 sm:left-8 text-base sm:text-xl opacity-30 sm:opacity-40 animate-pulse" 
                style={{animationDelay: '2s'}}
                title="Lady Liberty watching over">
            🗽
        </div>
        <div className="absolute top-40 sm:top-80 left-28 sm:left-56 text-lg sm:text-2xl opacity-35 sm:opacity-45 animate-bounce" 
                style={{animationDelay: '4.2s'}}
                title="Times Square energy">
            🎪
        </div>
        <div className="absolute top-48 sm:top-96 right-12 sm:right-24 text-base sm:text-xl opacity-30 sm:opacity-40 animate-pulse" 
                style={{animationDelay: '5.5s'}}
                title="Metropolitan Opera House">
            🎵
        </div>
        
        {/* Birds - Mobile responsive */}
        <div className="absolute top-1/4 left-1/4 text-sm sm:text-xl animate-gentleFloat">🐦</div>
        <div className="absolute top-1/3 right-1/3 text-sm sm:text-xl animate-gentleFloat" style={{animationDelay: '1s'}}>🕊️</div>
      </div>

      {/* Mobile-specific floating quote display */}
      <div className="absolute bottom-20 sm:bottom-32 left-4 sm:left-8 right-4 sm:right-8 z-20 pointer-events-none">
        {currentQuote && (
          <div className="bg-black/70 backdrop-blur-sm rounded-lg sm:rounded-2xl p-3 sm:p-6 text-center shadow-lg sm:shadow-2xl border border-white/20 animate-gentleFloat">
            <p className="text-xs sm:text-lg text-white font-medium italic leading-relaxed mb-2 sm:mb-3">
              "{quotes[currentQuote].text}"
            </p>
            <p className="text-[10px] sm:text-sm text-gray-300 font-semibold">
              — {quotes[currentQuote].character}, {quotes[currentQuote].show}
            </p>
          </div>
        )}
      </div>

      {/* Mobile-optimized touch targets */}
      <style jsx>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(${window.innerWidth < 640 ? '-4px' : '-8px'}); }
        }
        
        .animate-gentleFloat {
          animation: gentleFloat ${window.innerWidth < 640 ? '3s' : '4s'} ease-in-out infinite;
        }
        
        /* Touch-friendly interactions */
        @media (max-width: 640px) {
          button {
            min-height: 44px; /* Apple's recommended touch target size */
            min-width: 44px;
          }
          
          /* Reduce motion intensity on mobile */
          .animate-spin {
            animation-duration: 8s !important;
          }
          
          .animate-bounce {
            animation-duration: 3s;
          }
          
          .animate-pulse {
            animation-duration: 3s;
          }
        }
        
        /* Improve touch responsiveness */
        .touch-manipulation {
          touch-action: manipulation;
        }
        
        /* Reduce motion for performance and accessibility */
        @media (max-width: 640px) and (prefers-reduced-motion: reduce) {
          .animate-bounce,
          .animate-pulse,
          .animate-gentleFloat,
          .animate-spin {
            animation: none;
          }
        }
        
        /* Optimize positioning for mobile landscape */
        @media (max-width: 640px) and (orientation: landscape) {
          .absolute[style*="top:"] {
            transform: scale(0.8);
          }
        }
      `}</style>
    </>
  );
};

export default InteractiveElements;