import React from 'react';

const SkyAndAtmosphere = ({ timeOfDay, festivalMode, romanticElements }) => {
  return (
    <>
      {/* Dynamic sky background */}
      <div className={`absolute inset-0 transition-all duration-1000 ${
        timeOfDay === 'golden' 
          ? 'bg-gradient-to-br from-amber-50 via-rose-100 to-orange-100' 
          : timeOfDay === 'sunset'
          ? 'bg-gradient-to-br from-purple-200 via-pink-200 to-orange-300'
          : 'bg-gradient-to-br from-indigo-300 via-purple-200 to-pink-200'
      }`}>
        <div className={`absolute inset-0 transition-opacity duration-1000 ${
          timeOfDay === 'evening' ? 'opacity-40' : 'opacity-10'
        } bg-gradient-to-t from-indigo-900 via-transparent to-transparent`}></div>
        
        {/* Sun/Moon element - Mobile responsive */}
        <div className={`absolute ${timeOfDay === 'evening' ? 'top-1/4 right-1/4' : 'top-1/3 right-1/3'} 
                         w-8 sm:w-16 h-8 sm:h-16 rounded-full transition-all duration-1000 ${
                         timeOfDay === 'golden' ? 'bg-amber-200 shadow-[0_0_30px_15px_rgba(255,204,0,0.5)] sm:shadow-[0_0_60px_30px_rgba(255,204,0,0.5)]' : 
                         timeOfDay === 'sunset' ? 'bg-orange-300 shadow-[0_0_40px_20px_rgba(255,100,0,0.4)] sm:shadow-[0_0_80px_40px_rgba(255,100,0,0.4)]' : 
                         'bg-gray-200 shadow-[0_0_35px_15px_rgba(200,200,255,0.2)] sm:shadow-[0_0_70px_30px_rgba(200,200,255,0.2)]'}`}></div>
      </div>

      {/* Floating particles - Mobile optimized */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(window.innerWidth < 640 ? 20 : 40)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce opacity-30 text-xs sm:text-base"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {['💫', '✨', '💕', '🌟', '💖', '🎭', '🎪', '🎨'][Math.floor(Math.random() * 8)]}
          </div>
        ))}
      </div>

      {/* Spotlights - Mobile responsive */}
      {festivalMode && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(window.innerWidth < 640 ? 6 : 12)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-20 sm:opacity-25"
              style={{
                left: `${5 + i * (window.innerWidth < 640 ? 15 : 8)}%`,
                bottom: '0',
                width: window.innerWidth < 640 ? '2px' : '3px',
                height: '100%',
                background: `linear-gradient(to top, rgba(255, ${100 + i * 20}, ${200 - i * 15}, 0.8), transparent 70%)`,
                transform: `rotate(${-15 + i * 3}deg)`,
                transformOrigin: 'bottom center',
                animation: `sway ${3 + i * 0.5}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>
      )}

      {/* Clouds - Mobile responsive */}
      <div className="absolute inset-0 pointer-events-none opacity-25 sm:opacity-30">
        {[...Array(window.innerWidth < 640 ? 6 : 12)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl sm:text-4xl animate-gentleFloat"
            style={{
              left: `${5 + i * (window.innerWidth < 640 ? 15 : 8)}%`,
              top: `${10 + Math.random() * 30}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            ☁️
          </div>
        ))}
      </div>

      {/* Festival searchlights - Mobile responsive */}
      {festivalMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(window.innerWidth < 640 ? 3 : 6)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-15 sm:opacity-20 animate-pulse"
              style={{
                left: `${10 + i * (window.innerWidth < 640 ? 25 : 15)}%`,
                bottom: '0',
                width: window.innerWidth < 640 ? '6px' : '10px',
                height: '100%',
                background: `linear-gradient(to top, rgba(255, ${150 + i * 20}, ${100 - i * 10}, 0.7), transparent 60%)`,
                transform: `rotate(${-8 + i * 3}deg)`,
                transformOrigin: 'bottom center',
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            />
          ))}
        </div>
      )}

      {/* Romantic overlay - Mobile responsive */}
      <div className="absolute inset-0 opacity-6 sm:opacity-8 pointer-events-none">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255, 182, 193, 0.4) ${window.innerWidth < 640 ? '2px' : '3px'}, transparent ${window.innerWidth < 640 ? '2px' : '3px'}),
                              radial-gradient(circle at 80% 80%, rgba(255, 240, 245, 0.4) ${window.innerWidth < 640 ? '2px' : '3px'}, transparent ${window.innerWidth < 640 ? '2px' : '3px'}),
                              radial-gradient(circle at 40% 60%, rgba(255, 228, 225, 0.4) ${window.innerWidth < 640 ? '1.5px' : '2px'}, transparent ${window.innerWidth < 640 ? '1.5px' : '2px'}),
                              radial-gradient(circle at 60% 40%, rgba(240, 230, 255, 0.3) ${window.innerWidth < 640 ? '1.5px' : '2px'}, transparent ${window.innerWidth < 640 ? '1.5px' : '2px'})`,
            backgroundSize: window.innerWidth < 640 
              ? '40px 40px, 50px 50px, 30px 30px, 35px 35px'
              : '80px 80px, 100px 100px, 60px 60px, 70px 70px'
          }}
        />
      </div>

      {/* Custom CSS for animations - Mobile responsive */}
      <style jsx>{`
        @keyframes sway {
          0% { transform: rotate(var(--rotation-start, -15deg)) translateX(0px); }
          50% { transform: rotate(var(--rotation-mid, 0deg)) translateX(${window.innerWidth < 640 ? '5px' : '10px'}); }
          100% { transform: rotate(var(--rotation-end, 15deg)) translateX(0px); }
        }
        
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(${window.innerWidth < 640 ? '-4px' : '-8px'}); }
        }
        
        .animate-gentleFloat {
          animation: gentleFloat ${window.innerWidth < 640 ? '3s' : '4s'} ease-in-out infinite;
        }
        
        /* Mobile-specific optimizations */
        @media (max-width: 640px) {
          .animate-bounce {
            animation-duration: 2s;
          }
          
          .animate-pulse {
            animation-duration: 3s;
          }
        }
        
        /* Reduce motion for mobile performance */
        @media (max-width: 640px) and (prefers-reduced-motion: reduce) {
          .animate-bounce,
          .animate-pulse,
          .animate-gentleFloat {
            animation: none;
          }
        }
      `}</style>
    </>
  );
};

export default SkyAndAtmosphere;