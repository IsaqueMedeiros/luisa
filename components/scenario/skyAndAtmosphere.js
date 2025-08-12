import React, { useState, useEffect } from 'react';

const SkyAndAtmosphere = ({ timeOfDay, festivalMode, romanticElements }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Don't render dynamic content until client-side hydration
  if (!isClient) {
    return (
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
      </div>
    );
  }

  const particleCount = isMobile ? 20 : 40;
  const cloudCount = isMobile ? 6 : 12;
  const spotlightCount = isMobile ? 6 : 12;
  const searchlightCount = isMobile ? 3 : 6;

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
        
        {/* Sun/Moon element */}
        <div className={`absolute ${timeOfDay === 'evening' ? 'top-1/4 right-1/4' : 'top-1/3 right-1/3'} 
                         w-8 sm:w-16 h-8 sm:h-16 rounded-full transition-all duration-1000 ${
                         timeOfDay === 'golden' ? 'bg-amber-200 shadow-[0_0_30px_15px_rgba(255,204,0,0.5)] sm:shadow-[0_0_60px_30px_rgba(255,204,0,0.5)]' : 
                         timeOfDay === 'sunset' ? 'bg-orange-300 shadow-[0_0_40px_20px_rgba(255,100,0,0.4)] sm:shadow-[0_0_80px_40px_rgba(255,100,0,0.4)]' : 
                         'bg-gray-200 shadow-[0_0_35px_15px_rgba(200,200,255,0.2)] sm:shadow-[0_0_70px_30px_rgba(200,200,255,0.2)]'}`}></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(particleCount)].map((_, i) => {
          const particles = ['💫', '✨', '💕', '🌟', '💖', '🎭', '🎪', '🎨'];
          return (
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
              {particles[Math.floor(Math.random() * particles.length)]}
            </div>
          );
        })}
      </div>

      {/* Spotlights */}
      {festivalMode && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(spotlightCount)].map((_, i) => (
            <div
              key={i}
              className={`absolute opacity-20 sm:opacity-25 ${isMobile ? 'w-0.5' : 'w-1'} h-full spotlight-beam`}
              style={{
                left: `${5 + i * (isMobile ? 15 : 8)}%`,
                bottom: '0',
                background: `linear-gradient(to top, rgba(255, ${100 + i * 20}, ${200 - i * 15}, 0.8), transparent 70%)`,
                transform: `rotate(${-15 + i * 3}deg)`,
                transformOrigin: 'bottom center',
                animation: `sway ${3 + i * 0.5}s ease-in-out infinite alternate`
              }}
            />
          ))}
        </div>
      )}

      {/* Clouds */}
      <div className="absolute inset-0 pointer-events-none opacity-25 sm:opacity-30">
        {[...Array(cloudCount)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl sm:text-4xl animate-gentleFloat"
            style={{
              left: `${5 + i * (isMobile ? 15 : 8)}%`,
              top: `${10 + Math.random() * 30}%`,
              animationDelay: `${i * 1.2}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            ☁️
          </div>
        ))}
      </div>

      {/* Festival searchlights */}
      {festivalMode && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(searchlightCount)].map((_, i) => (
            <div
              key={i}
              className={`absolute opacity-15 sm:opacity-20 animate-pulse ${isMobile ? 'w-1.5' : 'w-2.5'} h-full`}
              style={{
                left: `${10 + i * (isMobile ? 25 : 15)}%`,
                bottom: '0',
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

      {/* Romantic overlay */}
      <div className="absolute inset-0 opacity-6 sm:opacity-8 pointer-events-none">
        <div 
          className={`w-full h-full ${isMobile ? 'romantic-overlay-mobile' : 'romantic-overlay-desktop'}`}
        />
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes sway {
          0% { transform: rotate(-15deg) translateX(0px); }
          50% { transform: rotate(0deg) translateX(${isMobile ? '5px' : '10px'}); }
          100% { transform: rotate(15deg) translateX(0px); }
        }
        
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(${isMobile ? '-4px' : '-8px'}); }
        }
        
        .animate-gentleFloat {
          animation: gentleFloat ${isMobile ? '3s' : '4s'} ease-in-out infinite;
        }

        .romantic-overlay-mobile {
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(255, 182, 193, 0.4) 2px, transparent 2px),
            radial-gradient(circle at 80% 80%, rgba(255, 240, 245, 0.4) 2px, transparent 2px),
            radial-gradient(circle at 40% 60%, rgba(255, 228, 225, 0.4) 1.5px, transparent 1.5px),
            radial-gradient(circle at 60% 40%, rgba(240, 230, 255, 0.3) 1.5px, transparent 1.5px);
          background-size: 40px 40px, 50px 50px, 30px 30px, 35px 35px;
        }

        .romantic-overlay-desktop {
          background-image: 
            radial-gradient(circle at 20% 20%, rgba(255, 182, 193, 0.4) 3px, transparent 3px),
            radial-gradient(circle at 80% 80%, rgba(255, 240, 245, 0.4) 3px, transparent 3px),
            radial-gradient(circle at 40% 60%, rgba(255, 228, 225, 0.4) 2px, transparent 2px),
            radial-gradient(circle at 60% 40%, rgba(240, 230, 255, 0.3) 2px, transparent 2px);
          background-size: 80px 80px, 100px 100px, 60px 60px, 70px 70px;
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