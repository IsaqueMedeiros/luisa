import React from "react";
import { useState, useMemo, useEffect } from "react";
import InteractiveCinemaQuiz from "./cinemaQuiz";

const Cityscape = ({ timeOfDay, festivalMode, showingMovie, movies }) => {
  const [quizOpen, setQuizOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive detection properly
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Memoize building configurations for performance
  const buildingConfig = useMemo(
    () => ({
      background: Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: i * 2.2,
        width: 2 + (i % 5) * 0.8,
        height: 25 + (i % 7) * 8,
        opacity: 0.2 + (i % 4) * 0.15,
      })),
      midground: Array.from({ length: 18 }, (_, i) => ({
        id: i,
        left: i * 6,
        width: 5 + (i % 4) * 2,
        height: 45 + (i % 6) * 12,
        windowCount: Math.min(20 + (i % 3) * 8, 40),
      })),
      marqueeLights: {
        top: isMobile ? 8 : 14,
        side: isMobile ? 6 : 10,
      },
      streetElements: {
        crosswalkBars: isMobile ? 6 : 12,
        streetLamps: isMobile ? 6 : 12,
        sidewalkTexture: isMobile ? 20 : 35,
      },
    }),
    [isMobile]
  );

  // Memoize window light calculation
  const getWindowLight = useMemo(
    () => (buildingIndex, windowIndex) => {
      const seed = buildingIndex * 100 + windowIndex;
      return seed % 10 > 3;
    },
    []
  );

  // Common responsive classes
  const responsive = {
    text: {
      xs: "text-[10px] sm:text-sm",
      sm: "text-xs sm:text-lg",
      md: "text-sm sm:text-xl",
      lg: "text-lg sm:text-4xl",
      xl: "text-xl sm:text-5xl",
      xxl: "text-xl sm:text-3xl",
    },
    spacing: {
      xs: "w-1 sm:w-2 h-1 sm:h-2",
      sm: "w-2 sm:w-4 h-2 sm:h-4",
      md: "w-3 sm:w-6 h-3 sm:h-6",
      lg: "w-4 sm:w-8 h-4 sm:h-8",
    },
    containers: {
      sm: "w-12 sm:w-20",
      md: "w-16 sm:w-24",
      lg: "w-20 sm:w-32",
      xl: "w-24 sm:w-36",
    },
  };

  // Memoized building components for better performance
  const BackgroundBuildings = useMemo(
    () => (
      <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-96 z-0">
        {buildingConfig.background.map((building) => (
          <div
            key={building.id}
            className="absolute bottom-0"
            style={{
              left: `${building.left}%`,
              width: `${building.width}%`,
              height: `${building.height}%`,
              background: `linear-gradient(to top, 
              ${timeOfDay === "evening" ? "#1a1a2e" : "#2d3748"}, 
              ${timeOfDay === "evening" ? "#16213e" : "#4a5568"})`,
              opacity: building.opacity,
              borderRadius: "2px 2px 0 0",
              boxShadow: "inset 0 -4px 0 rgba(0,0,0,0.2)",
            }}
          />
        ))}
      </div>
    ),
    [buildingConfig.background, timeOfDay]
  );

  const MidgroundBuildings = useMemo(
    () => (
      <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-[32rem] z-10">
        {buildingConfig.midground.map((building) => (
          <div
            key={building.id}
            className="absolute bottom-0"
            style={{
              left: `${building.left}%`,
              width: `${building.width}%`,
              height: `${building.height}%`,
              background: `linear-gradient(to top, 
              ${timeOfDay === "evening" ? "#2d2545" : "#4a5568"}, 
              ${timeOfDay === "evening" ? "#42375c" : "#718096"})`,
              opacity: 0.65,
              borderRadius: "4px 4px 0 0",
              boxShadow:
                "inset 0 -8px 0 rgba(0,0,0,0.4), 0 0 12px rgba(0,0,0,0.5)",
            }}
          >
            {Array.from({ length: building.windowCount }, (_, j) => (
              <div
                key={j}
                className="absolute w-1 sm:w-2 h-1 sm:h-2 rounded-sm"
                style={{
                  left: `${10 + (j % 4) * 20}%`,
                  top: `${10 + Math.floor(j / 4) * 15}%`,
                  background: getWindowLight(building.id, j)
                    ? timeOfDay === "evening"
                      ? "#ffd700"
                      : "#f0e68c"
                    : "transparent",
                  opacity: getWindowLight(building.id, j) ? 0.95 : 0,
                  boxShadow: getWindowLight(building.id, j)
                    ? "0 0 3px rgba(255, 215, 0, 0.6)"
                    : "none",
                }}
              />
            ))}
          </div>
        ))}
      </div>
    ),
    [buildingConfig.midground, timeOfDay, getWindowLight]
  );

  const MarqueeLights = useMemo(
    () => (
      <div className="absolute inset-0 pointer-events-none">
        {/* Top row lights */}
        {Array.from({ length: buildingConfig.marqueeLights.top }, (_, i) => (
          <div
            key={`top-${i}`}
            className="absolute w-2 sm:w-4 h-2 sm:h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg sm:shadow-xl"
            style={{
              left: `${6 + i * (isMobile ? 11 : 6.5)}%`,
              top: "6px",
              animationDelay: `${i * 120}ms`,
              boxShadow: "0 0 6px rgba(255, 255, 0, 0.9)",
            }}
          />
        ))}

        {/* Right side lights */}
        {Array.from({ length: buildingConfig.marqueeLights.side }, (_, i) => (
          <div
            key={`right-${i}`}
            className="absolute w-2 sm:w-4 h-2 sm:h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg sm:shadow-xl"
            style={{
              right: "6px",
              top: `${8 + i * (isMobile ? 14 : 9.5)}%`,
              animationDelay: `${(i + 14) * 120}ms`,
              boxShadow: "0 0 6px rgba(255, 255, 0, 0.9)",
            }}
          />
        ))}
      </div>
    ),
    [buildingConfig.marqueeLights, isMobile]
  );

  return (
    <>
      {/* NYC Skyline - Responsive container */}
      <div className="absolute bottom-0 left-0 right-0 h-[32rem] sm:h-[48rem] overflow-hidden">
        {/* Background buildings */}
        {BackgroundBuildings}

        {/* Central Park - Optimized structure */}
        <div className="absolute bottom-24 sm:bottom-40 left-1/4 w-56 sm:w-[28rem] h-20 sm:h-32 bg-gradient-to-t from-green-800 to-green-600 rounded-t-2xl sm:rounded-t-3xl shadow-xl sm:shadow-2xl z-5">
          <div className="absolute inset-2 sm:inset-3 bg-gradient-to-t from-green-700 to-green-500 rounded-t-2xl sm:rounded-t-3xl">
            {/* Simplified park details */}
            <div className="absolute top-2 sm:top-3 left-4 sm:left-6 w-3 sm:w-5 h-3 sm:h-5 bg-green-600 rounded-full shadow-sm sm:shadow-lg" />
            <div className="absolute top-3 sm:top-6 right-4 sm:right-8 w-2 sm:w-4 h-2 sm:h-4 bg-green-700 rounded-full" />
            <div className="absolute top-1/2 left-1/3 w-8 sm:w-16 h-4 sm:h-8 bg-blue-400 rounded-full opacity-70 shadow-inner" />
            <div className="absolute top-2 sm:top-4 left-4 sm:left-8 w-12 sm:w-20 h-0.5 sm:h-1 bg-amber-600 rounded-full opacity-60" />
            <div className="absolute bottom-3 sm:bottom-6 right-5 sm:right-10 w-8 sm:w-16 h-0.5 sm:h-1 bg-amber-600 rounded-full opacity-60" />
          </div>
        </div>

        {/* Mid-ground buildings */}
        {MidgroundBuildings}

        {/* Empire State Building */}
        <div className="absolute bottom-0 left-[6%] w-20 sm:w-32 h-64 sm:h-[38rem] bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-lg sm:rounded-t-xl shadow-xl sm:shadow-2xl z-25">
          {/* Building tiers */}
          <div className="absolute top-8 sm:top-16 left-1 sm:left-2 right-1 sm:right-2 h-8 sm:h-16 bg-gray-600 rounded-t-lg sm:rounded-t-xl border-t-2 sm:border-t-4 border-gray-400" />

          {/* Spire */}
          <div className="absolute -top-12 sm:-top-20 left-1/2 transform -translate-x-1/2 w-6 sm:w-12 h-16 sm:h-24 bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-lg sm:rounded-t-xl">
            <div className="absolute -top-4 sm:-top-8 left-1/2 transform -translate-x-1/2 w-2 sm:w-4 h-8 sm:h-16 bg-gray-800 rounded-t-full" />
            {festivalMode && (
              <div className="absolute -top-6 sm:-top-10 left-1/2 transform -translate-x-1/2 w-4 sm:w-8 h-2 sm:h-4 bg-red-500 animate-pulse rounded shadow-lg sm:shadow-xl" />
            )}
          </div>

          {/* Optimized windows */}
          {Array.from({ length: 60 }, (_, i) => (
            <div
              key={i}
              className={`absolute w-1 sm:w-2 h-1 sm:h-2 rounded-sm ${
                (i + Math.floor(i / 4)) % 3 === 0
                  ? "bg-yellow-300 animate-pulse"
                  : "bg-gray-650"
              }`}
              style={{
                left: `${2 + (i % 4) * 4}px`,
                top: `${20 + Math.floor(i / 4) * 8}px`,
                animationDelay: `${(i % 20) * 0.2}s`,
              }}
            />
          ))}

          {/* Lighting bands */}
          <div className="absolute top-24 sm:top-36 left-0 right-0 h-2 sm:h-4 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 shadow-md sm:shadow-lg" />
          <div className="absolute top-40 sm:top-64 left-0 right-0 h-1.5 sm:h-3 bg-amber-500" />
        </div>

        {/* Chrysler Building */}
        <div className="absolute bottom-0 left-[16%] w-12 sm:w-20 h-56 sm:h-96 bg-gradient-to-t from-gray-600 to-silver rounded-t-lg sm:rounded-t-xl shadow-xl sm:shadow-2xl z-25">
          {/* Crown */}
          <div className="absolute -top-16 sm:-top-24 left-1/2 transform -translate-x-1/2 w-10 sm:w-16 h-20 sm:h-28 bg-gradient-to-t from-gray-500 to-yellow-300 rounded-t-full">
            <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 w-6 sm:w-10 h-3 sm:h-6 bg-yellow-500 rounded-full animate-pulse shadow-md sm:shadow-lg" />
          </div>

          {/* Simplified windows */}
          {Array.from({ length: 40 }, (_, i) => (
            <div
              key={i}
              className={`absolute w-1 sm:w-2 h-1 sm:h-2 rounded-sm ${
                i % 4 < 2 ? "bg-yellow-300 animate-pulse" : "bg-gray-600"
              }`}
              style={{
                left: `${2 + (i % 3) * 3}px`,
                top: `${24 + Math.floor(i / 3) * 6}px`,
                animationDelay: `${(i % 15) * 0.15}s`,
              }}
            />
          ))}
        </div>

        {/* Grand Cinema - FIXED HEIGHT */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-xs sm:max-w-4xl h-80 sm:h-[43rem] z-30 px-4 sm:px-0">
          {/* Quiz button - IMPROVED POSITIONING AND COLORS */}
          <button
            onClick={() => setQuizOpen(true)}
            className="absolute -top-12 sm:-top-16 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 hover:from-yellow-300 hover:via-orange-400 hover:to-red-400 text-white font-bold px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-lg rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 border-2 border-yellow-300 hover:border-yellow-200 z-50"
          >
            🎬 Descobrir meu Filme ✨
          </button>

          <div className="w-full h-full bg-gradient-to-t from-gray-800 to-gray-600 rounded-t-3xl shadow-2xl relative overflow-hidden border-4 border-gray-500">
            {/* Main screen - OPTIMIZED FOR MOBILE */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 h-56 sm:h-[26rem] bg-black rounded-2xl sm:rounded-3xl border-4 sm:border-6 border-yellow-400 shadow-2xl overflow-hidden">
              {quizOpen ? (
                <div className="w-full h-full relative">
                  <InteractiveCinemaQuiz
                    onQuizOpen={() => setQuizOpen(true)}
                    onQuizClose={() => setQuizOpen(false)}
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center h-full px-2 sm:px-10 py-2 sm:py-8 bg-gradient-to-b from-gray-900 via-black to-gray-900">
  <div className="text-center space-y-1 sm:space-y-6">
    <div className={`text-base sm:text-4xl font-bold ${movies[showingMovie].color} animate-pulse drop-shadow-lg`}>
      ★ PREMIERE ★
    </div>
    <div className={`text-lg sm:text-5xl text-yellow-400 font-bold animate-pulse shadow-2xl tracking-wide leading-tight`}>
      {movies[showingMovie].title}
    </div>
    <div className={`text-sm sm:text-3xl text-white font-semibold tracking-wider`}>
      {movies[showingMovie].genre}
    </div>
    <div className={`text-xs sm:text-xl text-yellow-300 animate-pulse font-medium`}>
      ✨ NOW SHOWING ✨
    </div>
  </div>
</div>
              )}

              {/* Marquee lights */}
              {MarqueeLights}

              {/* News ticker - IMPROVED FOR MOBILE */}
              <div className="absolute bottom-0 left-0 w-full h-8 sm:h-10 bg-red-600 overflow-hidden border-t-4 border-yellow-400">
                <div className="animate-scroll whitespace-nowrap text-base sm:text-lg text-white font-bold leading-8 sm:leading-10 h-full flex items-center">
                  <span className="inline-block px-4 sm:px-6">
                    🎬 RED CARPET
                  </span>
                  <span className="inline-block px-4 sm:px-6">
                    • CELEBRITIES •
                  </span>
                  <span className="inline-block px-4 sm:px-6">
                    VIP SCREENING
                  </span>
                  <span className="inline-block px-4 sm:px-6">• POPCORN •</span>
                  <span className="inline-block px-4 sm:px-6">MERCH 🎬</span>
                </div>
              </div>
            </div>

            {/* Entrance - IMPROVED MOBILE SIZING */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-36 sm:w-48 h-20 sm:h-36">
              <div className="w-full h-full bg-gradient-to-t from-red-900 to-red-700 rounded-t-3xl shadow-inner relative border-4 border-red-800">
                <div className="absolute top-2 sm:top-6 left-1/2 transform -translate-x-1/2 w-28 sm:w-32 h-6 sm:h-10 bg-yellow-400 rounded-lg text-center font-bold text-red-900 flex items-center justify-center border-3 border-yellow-500 shadow-lg">
                  <span className="text-xs sm:text-lg">★ VIP ★</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Other buildings - Simplified */}
        <div className="absolute bottom-0 left-[35%] w-24 sm:w-36 h-44 sm:h-64 bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-lg sm:rounded-t-xl shadow-lg sm:shadow-xl z-25">
          <div className="absolute top-3 sm:top-5 left-2 sm:left-4 right-2 sm:right-4 h-10 sm:h-16 bg-pink-800 rounded-md sm:rounded-lg flex items-center justify-center">
            <span className={`${responsive.text.sm} text-white font-bold`}>
              CHARLOTTE'S
            </span>
          </div>
        </div>
      </div>

      {/* Street */}
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-20 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-xl sm:shadow-2xl border-t border-2 border-gray-900 z-40">
        <div className="absolute top-1/2 left-0 right-0 h-1 sm:h-1.5 bg-yellow-400 opacity-95 transform -translate-y-1/2 shadow-sm" />

        {/* Crosswalk */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2 sm:space-x-4">
          {Array.from(
            { length: buildingConfig.streetElements.crosswalkBars },
            (_, i) => (
              <div
                key={i}
                className="w-4 sm:w-8 h-1 sm:h-2 bg-white opacity-95 rounded-sm shadow-sm"
              />
            )
          )}
        </div>

        {/* Sidewalk with pedestrians */}
        <div className="absolute -top-12 sm:-top-20 left-0 right-0 h-12 sm:h-20 bg-gradient-to-r from-gray-500 to-gray-400 border-t-2 sm:border-t-3 border-gray-600">
          <div className="absolute bottom-2 sm:bottom-4 left-[8%] text-lg sm:text-3xl">
            🚶‍♂️
          </div>
          <div className="absolute bottom-1 sm:bottom-3 left-[25%] text-lg sm:text-3xl">
            👩‍💼
          </div>
          <div className="absolute bottom-3 sm:bottom-5 left-[45%] text-lg sm:text-3xl">
            👫
          </div>
          <div className="absolute bottom-2 sm:bottom-4 left-[65%] text-lg sm:text-3xl">
            👨‍👩‍👧
          </div>
          <div className="absolute bottom-1 sm:bottom-3 left-[85%] text-lg sm:text-3xl">
            🚶‍♀️
          </div>
        </div>
      </div>

      {/* Optimized CSS */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll ${isMobile ? "12s" : "18s"} linear infinite;
        }
        @keyframes gentleFloat {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        .animate-gentleFloat {
          animation: gentleFloat 4s ease-in-out infinite;
        }

        /* Reduce animations on mobile for performance */
        @media (max-width: 640px) {
          .animate-pulse {
            animation-duration: 3s;
          }
        }

        /* GPU acceleration for better performance */
        .animate-pulse,
        .animate-scroll,
        .animate-bounce {
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>
    </>
  );
};

export default Cityscape;
