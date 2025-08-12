import React from "react";
import { useState } from "react";
import InteractiveCinemaQuiz from "./cinemaQuiz";

const Cityscape = ({ timeOfDay, festivalMode, showingMovie, movies }) => {
  // Deterministic values to prevent hydration issues

  const [quizOpen, setQuizOpen] = useState(false);

  const backgroundBuildings = Array.from({ length: 50 }, (_, i) => ({
    left: i * 2.2,
    width: 2 + (i % 5) * 0.8,
    height: 25 + (i % 7) * 8,
    opacity: 0.2 + (i % 4) * 0.15,
  }));

  const midgroundBuildings = Array.from({ length: 18 }, (_, i) => ({
    left: i * 6,
    width: 5 + (i % 4) * 2,
    height: 45 + (i % 6) * 12,
    windowCount: 20 + (i % 3) * 8,
  }));

  const getWindowLight = (buildingIndex, windowIndex) => {
    const seed = buildingIndex * 100 + windowIndex;
    return seed % 10 > 3;
  };

  return (
    <>
      {/* NYC Skyline - Responsive container */}
      <div className="absolute bottom-0 left-0 right-0 h-[32rem] sm:h-[48rem] overflow-hidden">
        {/* Background buildings - Far distance with responsive positioning */}
        <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-96 z-0">
          {backgroundBuildings.map((building, i) => (
            <div
              key={i}
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

        {/* Central Park - Responsive positioning and sizing */}
        <div className="absolute bottom-24 sm:bottom-40 left-1/4 w-56 sm:w-[28rem] h-20 sm:h-32 bg-gradient-to-t from-green-800 to-green-600 rounded-t-2xl sm:rounded-t-3xl shadow-xl sm:shadow-2xl z-5">
          <div className="absolute inset-2 sm:inset-3 bg-gradient-to-t from-green-700 to-green-500 rounded-t-2xl sm:rounded-t-3xl">
            {/* Park details with responsive sizes */}
            <div className="absolute top-2 sm:top-3 left-4 sm:left-6 w-3 sm:w-5 h-3 sm:h-5 bg-green-600 rounded-full shadow-sm sm:shadow-lg"></div>
            <div className="absolute top-3 sm:top-6 right-4 sm:right-8 w-2 sm:w-4 h-2 sm:h-4 bg-green-700 rounded-full"></div>
            <div className="absolute bottom-2 sm:bottom-3 left-6 sm:left-12 w-4 sm:w-6 h-2 sm:h-4 bg-green-600 rounded-full"></div>
            <div className="absolute bottom-2 sm:bottom-4 right-3 sm:right-6 w-3 sm:w-5 h-2 sm:h-3 bg-green-700 rounded-full"></div>
            <div className="absolute top-1/2 left-1/3 w-8 sm:w-16 h-4 sm:h-8 bg-blue-400 rounded-full opacity-70 shadow-inner"></div>
            <div className="absolute top-2 sm:top-3 left-1/2 w-2 sm:w-3 h-2 sm:h-3 bg-amber-800 rounded-full"></div>
            <div className="absolute bottom-1 sm:bottom-2 right-1/3 w-2 sm:w-4 h-2 sm:h-4 bg-green-900 rounded-full"></div>
            {/* Walking paths */}
            <div className="absolute top-2 sm:top-4 left-4 sm:left-8 w-12 sm:w-20 h-0.5 sm:h-1 bg-amber-600 rounded-full opacity-60"></div>
            <div className="absolute bottom-3 sm:bottom-6 right-5 sm:right-10 w-8 sm:w-16 h-0.5 sm:h-1 bg-amber-600 rounded-full opacity-60"></div>
          </div>
        </div>

        {/* Mid-ground buildings - Responsive heights */}
        <div className="absolute bottom-0 left-0 right-0 h-64 sm:h-[32rem] z-10">
          {midgroundBuildings.map((building, i) => (
            <div
              key={i}
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
              {Array.from(
                { length: Math.min(building.windowCount, 40) },
                (_, j) => (
                  <div
                    key={j}
                    className="absolute w-1 sm:w-2 h-1 sm:h-2 rounded-sm"
                    style={{
                      left: `${10 + (j % 4) * 20}%`,
                      top: `${10 + Math.floor(j / 4) * 15}%`,
                      background: getWindowLight(i, j)
                        ? timeOfDay === "evening"
                          ? "#ffd700"
                          : "#f0e68c"
                        : "transparent",
                      opacity: getWindowLight(i, j) ? 0.95 : 0,
                      boxShadow: getWindowLight(i, j)
                        ? "0 0 3px rgba(255, 215, 0, 0.6)"
                        : "none",
                    }}
                  />
                )
              )}
            </div>
          ))}
        </div>

        {/* Empire State Building - Mobile responsive */}
        <div className="absolute bottom-0 left-[6%] w-20 sm:w-32 h-64 sm:h-[38rem] bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-lg sm:rounded-t-xl shadow-xl sm:shadow-2xl z-25">
          {/* Building tiers */}
          <div className="absolute top-8 sm:top-16 left-1 sm:left-2 right-1 sm:right-2 h-8 sm:h-16 bg-gray-600 rounded-t-lg sm:rounded-t-xl border-t-2 sm:border-t-4 border-gray-400"></div>
          <div className="absolute top-4 sm:top-8 left-2 sm:left-4 right-2 sm:right-4 h-6 sm:h-14 bg-gray-550 rounded-t-lg sm:rounded-t-xl border-t-1 sm:border-t-2 border-gray-350"></div>

          {/* Spire */}
          <div className="absolute -top-12 sm:-top-20 left-1/2 transform -translate-x-1/2 w-6 sm:w-12 h-16 sm:h-24 bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-lg sm:rounded-t-xl">
            <div className="absolute -top-4 sm:-top-8 left-1/2 transform -translate-x-1/2 w-2 sm:w-4 h-8 sm:h-16 bg-gray-800 rounded-t-full"></div>
            {festivalMode && (
              <div className="absolute -top-6 sm:-top-10 left-1/2 transform -translate-x-1/2 w-4 sm:w-8 h-2 sm:h-4 bg-red-500 animate-pulse rounded shadow-lg sm:shadow-xl"></div>
            )}
          </div>

          {/* Windows - Responsive grid */}
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
                boxShadow:
                  (i + Math.floor(i / 4)) % 3 === 0
                    ? "0 0 2px rgba(255, 255, 0, 0.7)"
                    : "none",
              }}
            />
          ))}

          {/* Signature lighting bands */}
          <div className="absolute top-24 sm:top-36 left-0 right-0 h-2 sm:h-4 bg-gradient-to-r from-amber-600 via-amber-400 to-amber-600 shadow-md sm:shadow-lg"></div>
          <div className="absolute top-40 sm:top-64 left-0 right-0 h-1.5 sm:h-3 bg-amber-500"></div>
          <div className="absolute top-48 sm:top-80 left-0 right-0 h-1 sm:h-2 bg-amber-400"></div>
        </div>

        {/* Chrysler Building - Mobile responsive */}
        <div className="absolute bottom-0 left-[16%] w-12 sm:w-20 h-56 sm:h-96 bg-gradient-to-t from-gray-600 to-silver rounded-t-lg sm:rounded-t-xl shadow-xl sm:shadow-2xl z-25">
          {/* Iconic crown */}
          <div className="absolute -top-16 sm:-top-24 left-1/2 transform -translate-x-1/2 w-10 sm:w-16 h-20 sm:h-28 bg-gradient-to-t from-gray-500 to-yellow-300 rounded-t-full">
            <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 w-6 sm:w-10 h-3 sm:h-6 bg-yellow-500 rounded-full animate-pulse shadow-md sm:shadow-lg"></div>
            <div className="absolute top-6 sm:top-12 left-0 w-2 sm:w-4 h-4 sm:h-8 bg-gray-600 rounded-r-full"></div>
            <div className="absolute top-6 sm:top-12 right-0 w-2 sm:w-4 h-4 sm:h-8 bg-gray-600 rounded-l-full"></div>
            <div className="absolute top-12 sm:top-20 left-1 sm:left-2 w-1.5 sm:w-3 h-3 sm:h-6 bg-yellow-400 rounded-full"></div>
            <div className="absolute top-12 sm:top-20 right-1 sm:right-2 w-1.5 sm:w-3 h-3 sm:h-6 bg-yellow-400 rounded-full"></div>
          </div>

          {/* Building details */}
          <div className="absolute top-20 sm:top-32 left-0 w-2.5 sm:w-5 h-2.5 sm:h-5 bg-yellow-500 rounded-full animate-pulse shadow-md sm:shadow-lg"></div>
          <div className="absolute top-20 sm:top-32 right-0 w-2.5 sm:w-5 h-2.5 sm:h-5 bg-yellow-500 rounded-full animate-pulse"></div>
          <div className="absolute top-28 sm:top-44 left-1/2 transform -translate-x-1/2 w-4 sm:w-8 h-1.5 sm:h-3 bg-yellow-400 rounded"></div>

          {/* Windows pattern - Reduced for mobile */}
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

          {/* Art Deco vertical lines */}
          <div className="absolute top-0 left-2 sm:left-4 w-1 sm:w-2 h-full bg-gradient-to-b from-transparent via-yellow-300 to-transparent opacity-50"></div>
          <div className="absolute top-0 right-2 sm:right-4 w-1 sm:w-2 h-full bg-gradient-to-b from-transparent via-yellow-300 to-transparent opacity-50"></div>
        </div>

        {/* Flatiron Building - Mobile responsive */}
        <div
          className="absolute bottom-0 left-[30%] w-16 sm:w-24 h-48 sm:h-80 bg-gradient-to-t from-amber-600 to-amber-400 shadow-xl sm:shadow-2xl z-25"
          style={{ clipPath: "polygon(0 100%, 100% 100%, 50% 0)" }}
        >
          <div className="absolute top-12 sm:top-20 left-3 sm:left-6 w-1 sm:w-2 h-1 sm:h-2 bg-amber-700 rounded-sm animate-pulse"></div>
          <div
            className="absolute top-20 sm:top-36 left-6 sm:left-12 w-1 sm:w-2 h-1 sm:h-2 bg-amber-700 rounded-sm animate-pulse"
            style={{ animationDelay: "0.5s" }}
          ></div>
          <div
            className="absolute top-28 sm:top-52 left-4 sm:left-9 w-1 sm:w-2 h-1 sm:h-2 bg-amber-700 rounded-sm animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div className="absolute top-36 sm:top-68 left-1/2 transform -translate-x-1/2 w-1.5 sm:w-3 h-12 sm:h-24 bg-amber-700 rounded-full"></div>
          <div className="absolute top-8 sm:top-16 left-1/2 transform -translate-x-1/2 w-4 sm:w-8 h-1 sm:h-2 bg-amber-800 rounded"></div>
        </div>

        {/* MacLaren's Pub - Mobile responsive */}
        <div className="absolute bottom-0 left-[42%] w-20 sm:w-32 h-40 sm:h-56 bg-gradient-to-t from-amber-700 to-amber-500 rounded-t-lg sm:rounded-t-xl shadow-lg sm:shadow-xl z-25">
          <div className="absolute top-2 sm:top-4 left-1.5 sm:left-3 right-1.5 sm:right-3 h-8 sm:h-14 bg-amber-900 rounded-md sm:rounded-lg flex items-center justify-center border-2 sm:border-3 border-amber-800 shadow-inner">
            <span className="text-xs sm:text-lg text-amber-100 font-bold tracking-wide">
              MacLAREN'S
            </span>
          </div>
          <div className="absolute top-11 sm:top-20 left-1.5 sm:left-3 right-1.5 sm:right-3 h-4 sm:h-8 bg-amber-800 rounded flex items-center justify-center border border-2 border-amber-700">
            <span className="text-[10px] sm:text-sm text-yellow-200 font-semibold">
              PUB
            </span>
          </div>

          {/* Pub windows */}
          <div className="absolute top-18 sm:top-32 left-3 sm:left-6 w-2.5 sm:w-5 h-2.5 sm:h-5 bg-yellow-400 rounded animate-pulse shadow-md sm:shadow-lg"></div>
          <div
            className="absolute top-18 sm:top-32 right-3 sm:right-6 w-2.5 sm:w-5 h-2.5 sm:h-5 bg-yellow-400 rounded animate-pulse"
            style={{ animationDelay: "0.7s" }}
          ></div>
          <div
            className="absolute top-24 sm:top-40 left-6 sm:left-12 w-3 sm:w-6 h-3 sm:h-6 bg-orange-400 rounded animate-pulse"
            style={{ animationDelay: "1.2s" }}
          ></div>
          <div
            className="absolute top-28 sm:top-48 left-9 sm:left-18 w-2.5 sm:w-5 h-2.5 sm:h-5 bg-yellow-300 rounded animate-pulse"
            style={{ animationDelay: "1.8s" }}
          ></div>

          {/* Entrance */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-4 sm:w-8 h-4 sm:h-8 bg-amber-900 rounded-t-md sm:rounded-t-lg border-t-2 sm:border-t-3 border-amber-800"></div>
          <div className="absolute bottom-6 sm:bottom-12 left-1/2 transform -translate-x-1/2 w-12 sm:w-20 h-4 sm:h-8 bg-amber-950 rounded border border-2 border-amber-800"></div>
        </div>

        {/* Grand Cinema - MOBILE OPTIMIZED */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-80 sm:w-[52rem] h-[80rem] sm:h-[40rem] z-30">
          <div className="w-full h-full bg-gradient-to-t from-gray-800 to-gray-600 rounded-t-2xl sm:rounded-t-3xl shadow-xl sm:shadow-2xl relative overflow-hidden border-2 sm:border-4 border-gray-500">
            {/* Giant marquee display */}
            <div className="absolute top-4 sm:top-8 left-4 sm:left-8 right-4 sm:right-8 h-48 sm:h-[26rem] bg-black rounded-2xl sm:rounded-3xl border-3 sm:border-6 border-yellow-400 shadow-xl sm:shadow-2xl overflow-hidden">
              {quizOpen ? (
                // QUIZ inside the cinema screen
                <InteractiveCinemaQuiz
                  onQuizOpen={() => setQuizOpen(true)}
                  onQuizClose={() => setQuizOpen(false)}
                />
              ) : (
                // MOVIE INFO when quiz is not open
                <div className="flex flex-col justify-center items-center h-full px-4 sm:px-10 py-4 sm:py-8 bg-gradient-to-b from-gray-900 via-black to-gray-900">
                  <div className="text-center space-y-2 sm:space-y-6">
                    <div
                      className={`text-lg sm:text-4xl font-bold ${movies[showingMovie].color} animate-pulse drop-shadow-lg`}
                    >
                      ★ PREMIERE ★
                    </div>
                    <div className="text-xl sm:text-5xl text-yellow-400 font-bold animate-pulse shadow-2xl tracking-wide">
                      {movies[showingMovie].title}
                    </div>
                    <div className="text-sm sm:text-3xl text-white font-semibold tracking-wider">
                      {movies[showingMovie].genre}
                    </div>
                    <div className="text-xs sm:text-xl text-yellow-300 animate-pulse font-medium">
                      ✨ NOW SHOWING ✨
                    </div>
                    <div className="text-[10px] sm:text-lg text-gray-300">
                      EXCLUSIVE ENGAGEMENT
                    </div>
                  </div>
                </div>
              )}

              {/* Marquee lights - Mobile optimized */}
              <div className="absolute inset-0 pointer-events-none">
                {/* Top row lights */}
                {Array.from(
                  { length: window.innerWidth < 640 ? 8 : 14 },
                  (_, i) => (
                    <div
                      key={`top-${i}`}
                      className="absolute w-2 sm:w-4 h-2 sm:h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg sm:shadow-xl"
                      style={{
                        left: `${
                          6 + i * (window.innerWidth < 640 ? 11 : 6.5)
                        }%`,
                        top: "6px",
                        animationDelay: `${i * 120}ms`,
                        boxShadow: "0 0 6px rgba(255, 255, 0, 0.9)",
                      }}
                    />
                  )
                )}

                {/* Right and bottom lights - fewer on mobile */}
                {Array.from(
                  { length: window.innerWidth < 640 ? 6 : 10 },
                  (_, i) => (
                    <div
                      key={`right-${i}`}
                      className="absolute w-2 sm:w-4 h-2 sm:h-4 bg-yellow-400 rounded-full animate-pulse shadow-lg sm:shadow-xl"
                      style={{
                        right: "6px",
                        top: `${8 + i * (window.innerWidth < 640 ? 14 : 9.5)}%`,
                        animationDelay: `${(i + 14) * 120}ms`,
                        boxShadow: "0 0 6px rgba(255, 255, 0, 0.9)",
                      }}
                    />
                  )
                )}
              </div>

              {/* News ticker - Mobile responsive */}
              <div className="absolute bottom-0 left-0 w-full h-6 sm:h-10 bg-red-600 overflow-hidden border-t-2 sm:border-t-4 border-yellow-400">
                <div className="animate-scroll whitespace-nowrap text-sm sm:text-lg text-white font-bold leading-6 sm:leading-10 h-full flex items-center">
                  <span className="inline-block px-3 sm:px-6">
                    🎬 RED CARPET
                  </span>
                  <span className="inline-block px-3 sm:px-6">
                    • CELEBRITIES •
                  </span>
                  <span className="inline-block px-3 sm:px-6">
                    VIP SCREENING
                  </span>
                  <span className="inline-block px-3 sm:px-6">• POPCORN •</span>
                  <span className="inline-block px-3 sm:px-6">MERCH 🎬</span>
                </div>
              </div>
            </div>

            {/* Grand entrance - Mobile responsive */}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 sm:w-48 h-20 sm:h-36">
              <div className="w-full h-full bg-gradient-to-t from-red-900 to-red-700 rounded-t-2xl sm:rounded-t-3xl shadow-inner relative border-2 sm:border-4 border-red-800">
                {/* VIP sign */}
                <div className="absolute top-2 sm:top-6 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-6 sm:h-10 bg-yellow-400 rounded-md sm:rounded-lg text-center font-bold text-red-900 flex items-center justify-center border-2 sm:border-3 border-yellow-500 shadow-md sm:shadow-lg">
                  <span className="text-xs sm:text-base">★ VIP ★</span>
                </div>

                {/* Double doors */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-12 sm:h-20 bg-red-800 rounded-t-lg sm:rounded-t-xl border-2 sm:border-3 border-red-600">
                  <div className="absolute top-1 sm:top-2 left-1 sm:left-2 w-6 sm:w-8 h-10 sm:h-16 bg-red-900 rounded border border-red-700"></div>
                  <div className="absolute top-1 sm:top-2 right-1 sm:right-2 w-6 sm:w-8 h-10 sm:h-16 bg-red-900 rounded border border-red-700"></div>
                  <div className="absolute top-4 sm:top-8 left-2 sm:left-4 w-1 sm:w-2 h-1 sm:h-2 bg-yellow-400 rounded-full"></div>
                  <div className="absolute top-4 sm:top-8 right-2 sm:right-4 w-1 sm:w-2 h-1 sm:h-2 bg-yellow-400 rounded-full"></div>
                </div>

                {/* Decorative columns */}
                <div className="absolute -left-4 sm:-left-8 bottom-0 w-2 sm:w-4 h-12 sm:h-24 bg-yellow-600 rounded-t-md sm:rounded-t-lg shadow-md sm:shadow-lg"></div>
                <div className="absolute -right-4 sm:-right-8 bottom-0 w-2 sm:w-4 h-12 sm:h-24 bg-yellow-600 rounded-t-md sm:rounded-t-lg shadow-md sm:shadow-lg"></div>

                {/* Extended red carpet */}
                <div className="absolute -bottom-3 sm:-bottom-6 left-1/2 transform -translate-x-1/2 w-40 sm:w-56 h-3 sm:h-6 bg-red-800 rounded shadow-xl sm:shadow-2xl border border-2 border-red-900"></div>
              </div>
            </div>

            {/* Cinema building windows - Mobile responsive */}
            <div className="absolute top-56 sm:top-40 left-6 sm:left-12 w-4 sm:w-8 h-4 sm:h-8 bg-yellow-200 rounded-md sm:rounded-lg animate-pulse shadow-md sm:shadow-lg"></div>
            <div
              className="absolute top-60 sm:top-48 left-12 sm:left-24 w-4 sm:w-8 h-4 sm:h-8 bg-yellow-200 rounded-md sm:rounded-lg animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute top-60 sm:top-56 right-6 sm:right-12 w-4 sm:w-8 h-4 sm:h-8 bg-yellow-200 rounded-md sm:rounded-lg animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-64 sm:top-64 right-12 sm:right-24 w-4 sm:w-8 h-4 sm:h-8 bg-yellow-200 rounded-md sm:rounded-lg animate-pulse"
              style={{ animationDelay: "1.5s" }}
            ></div>

            {/* Cinema name */}
            
          </div>
          
        </div> 
        <button
              onClick={() => setQuizOpen(true)}
              className="mt-[4rem] bg-gradient-to-r ml-[30%] from-pink-500 via-purple-500 to-blue-500 text-white px-6 py-2 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center space-x-2">
                Descobrir meu Filme &gt;
              </div>
            </button>

        {/* Charlotte's Boutique - Mobile responsive */}
        <div className="absolute bottom-0 right-[10%] w-24 sm:w-36 h-44 sm:h-64 bg-gradient-to-t from-pink-600 to-pink-400 rounded-t-lg sm:rounded-t-xl shadow-lg sm:shadow-xl z-25">
          <div className="absolute top-3 sm:top-5 left-2 sm:left-4 right-2 sm:right-4 h-10 sm:h-16 bg-pink-800 rounded-md sm:rounded-lg flex items-center justify-center border-2 sm:border-3 border-pink-700 shadow-inner">
            <span className="text-xs sm:text-lg text-white font-bold tracking-wide">
              CHARLOTTE'S
            </span>
          </div>
          <div className="absolute top-14 sm:top-22 left-2 sm:left-4 right-2 sm:right-4 h-4 sm:h-8 bg-pink-700 rounded flex items-center justify-center border border-2 border-pink-600">
            <span className="text-[10px] sm:text-sm text-white font-semibold">
              BOUTIQUE
            </span>
          </div>

          {/* Store windows */}
          <div className="absolute top-20 sm:top-36 left-4 sm:left-8 w-2.5 sm:w-5 h-2.5 sm:h-5 bg-pink-900 rounded-full animate-pulse shadow-md sm:shadow-lg"></div>
          <div
            className="absolute top-22 sm:top-40 right-4 sm:right-8 w-2.5 sm:w-5 h-2.5 sm:h-5 bg-pink-900 rounded-full animate-pulse"
            style={{ animationDelay: "0.8s" }}
          ></div>
          <div
            className="absolute top-26 sm:top-48 left-8 sm:left-16 w-3 sm:w-6 h-3 sm:h-6 bg-pink-900 rounded-full animate-pulse"
            style={{ animationDelay: "1.4s" }}
          ></div>

          {/* Store entrance */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-6 sm:h-12 bg-pink-900 rounded-t-md sm:rounded-t-lg shadow-inner border border-2 border-pink-800"></div>

          {/* Fashion elements */}
          <div className="absolute top-28 sm:top-44 left-1/2 transform -translate-x-1/2 text-xl sm:text-3xl animate-pulse">
            👠
          </div>
          <div
            className="absolute top-32 sm:top-52 left-5 sm:left-10 text-xl sm:text-3xl animate-bounce"
            style={{ animationDelay: "1s" }}
          >
            👗
          </div>
          <div className="absolute top-20 sm:top-32 left-2 sm:left-4 right-2 sm:right-4 h-16 sm:h-24 bg-pink-300/40 rounded-b-md sm:rounded-b-lg"></div>
        </div>

        {/* Modern office building - Mobile responsive */}
        <div className="absolute bottom-0 right-[2%] w-16 sm:w-24 h-56 sm:h-80 bg-gradient-to-t from-gray-600 to-gray-400 rounded-t-lg sm:rounded-t-xl shadow-lg sm:shadow-xl z-25">
          <div className="absolute top-8 sm:top-12 left-2 sm:left-4 right-2 sm:right-4 h-2 sm:h-4 bg-yellow-500 rounded-md sm:rounded-lg shadow-md sm:shadow-lg"></div>
          <div className="absolute top-16 sm:top-24 left-2 sm:left-4 w-2.5 sm:w-5 h-2.5 sm:h-5 bg-yellow-400 rounded-full animate-pulse shadow-md sm:shadow-lg"></div>
          <div
            className="absolute top-20 sm:top-32 left-7 sm:left-14 w-2.5 sm:w-5 h-2.5 sm:h-5 bg-yellow-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
          <div
            className="absolute top-24 sm:top-40 left-4 sm:left-8 w-2.5 sm:w-5 h-2.5 sm:h-5 bg-yellow-400 rounded-full animate-pulse"
            style={{ animationDelay: "0.8s" }}
          ></div>
          <div
            className="absolute top-28 sm:top-48 left-8 sm:left-16 w-2.5 sm:w-5 h-2.5 sm:h-5 bg-yellow-400 rounded-full animate-pulse"
            style={{ animationDelay: "1.2s" }}
          ></div>
          <div className="absolute top-0 left-4 sm:left-8 w-1.5 sm:w-3 h-full bg-gradient-to-b from-transparent via-gray-600 to-transparent opacity-50 rounded-full"></div>
        </div>

        {/* Purple residential building - Mobile responsive */}
        <div className="absolute bottom-0 left-[2%] w-28 sm:w-40 h-64 sm:h-96 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t-lg sm:rounded-t-xl shadow-xl sm:shadow-2xl z-25">
          <div className="absolute top-12 sm:top-16 left-6 sm:left-10 w-3 sm:w-6 h-3 sm:h-6 bg-purple-800 rounded-full animate-pulse shadow-md sm:shadow-lg"></div>
          <div
            className="absolute top-18 sm:top-28 left-11 sm:left-22 w-3 sm:w-6 h-3 sm:h-6 bg-purple-800 rounded-full animate-pulse"
            style={{ animationDelay: "0.7s" }}
          ></div>
          <div
            className="absolute top-24 sm:top-40 left-8 sm:left-16 w-3 sm:w-6 h-3 sm:h-6 bg-purple-800 rounded-full animate-pulse"
            style={{ animationDelay: "1.4s" }}
          ></div>
          <div
            className="absolute top-30 sm:top-52 left-3 sm:left-6 w-3 sm:w-6 h-3 sm:h-6 bg-purple-800 rounded-full animate-pulse"
            style={{ animationDelay: "2.1s" }}
          ></div>
          <div className="absolute top-40 sm:top-68 left-0 right-0 h-2 sm:h-4 bg-gradient-to-r from-amber-500 via-amber-300 to-amber-500 shadow-md sm:shadow-lg"></div>
          <div className="absolute top-8 sm:top-12 left-1/2 transform -translate-x-1/2 w-12 sm:w-16 h-1.5 sm:h-3 bg-purple-800 rounded"></div>
        </div>

        {/* Additional skyline buildings - Mobile responsive */}
        <div className="absolute bottom-0 left-[56%] w-12 sm:w-16 h-48 sm:h-72 bg-gradient-to-t from-teal-600 to-teal-400 rounded-t-lg sm:rounded-t-xl shadow-md sm:shadow-lg opacity-90 z-15"></div>
        <div className="absolute bottom-0 left-[63%] w-14 sm:w-18 h-40 sm:h-64 bg-gradient-to-t from-orange-600 to-orange-400 rounded-t-lg sm:rounded-t-xl shadow-md sm:shadow-lg opacity-85 z-15"></div>
        <div className="absolute bottom-0 right-[25%] w-16 sm:w-20 h-36 sm:h-56 bg-gradient-to-t from-green-600 to-green-400 rounded-t-lg sm:rounded-t-xl shadow-md sm:shadow-lg opacity-80 z-15"></div>
      </div>

      {/* NYC Street - Mobile responsive */}
      <div className="absolute bottom-0 left-0 right-0 h-12 sm:h-20 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 shadow-xl sm:shadow-2xl border-t border-2 border-gray-900 z-40">
        {/* Road markings */}
        <div className="absolute top-1/2 left-0 right-0 h-1 sm:h-1.5 bg-yellow-400 opacity-95 transform -translate-y-1/2 shadow-sm"></div>

        {/* Responsive crosswalk */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex space-x-2 sm:space-x-4">
          {Array.from({ length: window.innerWidth < 640 ? 6 : 12 }, (_, i) => (
            <div
              key={i}
              className="w-4 sm:w-8 h-1 sm:h-2 bg-white opacity-95 rounded-sm shadow-sm"
            ></div>
          ))}
        </div>

        {/* Street lamps - Fewer on mobile */}
        {Array.from({ length: window.innerWidth < 640 ? 6 : 12 }, (_, i) => (
          <div
            key={i}
            className="absolute bottom-full"
            style={{ left: `${i * (window.innerWidth < 640 ? 16 : 8.5) + 4}%` }}
          >
            <div className="w-1 sm:w-2 h-12 sm:h-24 bg-gray-900 mx-auto rounded-t-sm"></div>
            <div
              className="w-3 sm:w-6 h-3 sm:h-6 bg-yellow-300 rounded-full animate-pulse shadow-[0_0_10px_5px_rgba(255,255,0,0.5)] sm:shadow-[0_0_20px_10px_rgba(255,255,0,0.5)]"
              style={{ animationDelay: `${i * 0.4}s` }}
            ></div>
          </div>
        ))}

        {/* Enhanced sidewalk - Mobile responsive */}
        <div className="absolute -top-12 sm:-top-20 left-0 right-0 h-12 sm:h-20 bg-gradient-to-r from-gray-500 to-gray-400 border-t-2 sm:border-t-3 border-gray-600">
          {/* Sidewalk texture - Fewer elements on mobile */}
          {Array.from({ length: window.innerWidth < 640 ? 20 : 35 }, (_, i) => (
            <div
              key={i}
              className="absolute top-2 sm:top-4 h-1 sm:h-1.5 bg-gray-600 rounded-sm"
              style={{
                left: `${i * (window.innerWidth < 640 ? 5 : 3)}%`,
                width: window.innerWidth < 640 ? "4.5%" : "2.8%",
                transform: `rotate(${(i % 7) - 3}deg)`,
              }}
            />
          ))}

          {/* Pedestrians - Mobile responsive spacing */}
          <div className="absolute bottom-2 sm:bottom-4 left-[8%] text-lg sm:text-3xl">
            🚶‍♂️
          </div>
          <div className="absolute bottom-1 sm:bottom-3 left-[20%] text-lg sm:text-3xl">
            👩‍💼
          </div>
          <div className="absolute bottom-3 sm:bottom-5 left-[35%] text-lg sm:text-3xl">
            👫
          </div>
          <div className="absolute bottom-2 sm:bottom-4 left-[50%] text-lg sm:text-3xl">
            👨‍👩‍👧
          </div>
          <div className="absolute bottom-1 sm:bottom-3 left-[65%] text-lg sm:text-3xl">
            🚶
          </div>
          <div className="absolute bottom-3 sm:bottom-5 left-[80%] text-lg sm:text-3xl">
            👮‍♂️
          </div>
          <div className="absolute bottom-2 sm:bottom-4 left-[92%] text-lg sm:text-3xl">
            🚶‍♀️
          </div>
        </div>
      </div>

      {/* Enhanced Vehicles - Mobile responsive */}

      {/* Custom CSS for smooth animations */}
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
          animation: scroll 18s linear infinite;
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

        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .animate-scroll {
            animation: scroll 12s linear infinite;
          }
        }
      `}</style>
    </>
  );
};

export default Cityscape;
