import React, { useState, useEffect } from 'react';

const PlaylistContainer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [characterAnimation, setCharacterAnimation] = useState('idle');
  const [movieRecommendation, setMovieRecommendation] = useState('');

  const questions = [
    {
      id: 'mood',
      character: 'carrie',
      question: "Darling, what kind of evening are we creating tonight?",
      gesture: 'pointing',
      options: [
        { value: 'cozy', label: '🕯️ Intimate & Cozy' },
        { value: 'passionate', label: '💋 Passionate & Intense' },
        { value: 'dreamy', label: '✨ Dreamy & Whimsical' },
        { value: 'nostalgic', label: '💭 Nostalgic & Sweet' }
      ]
    },
    {
      id: 'genre',
      character: 'ted',
      question: "Now, architecturally speaking, what foundation should our perfect evening have?",
      gesture: 'explaining',
      options: [
        { value: 'classic', label: '🎭 Classic Romance' },
        { value: 'comedy', label: '😄 Romantic Comedy' },
        { value: 'drama', label: '🎪 Romantic Drama' },
        { value: 'fantasy', label: '🌟 Fantasy Romance' }
      ]
    },
    {
      id: 'era',
      character: 'carrie',
      question: "Which era speaks to your romantic soul tonight?",
      gesture: 'thinking',
      options: [
        { value: 'modern', label: '📱 Modern Day' },
        { value: 'classic', label: '🎬 Golden Hollywood' },
        { value: 'vintage', label: '🌹 Vintage Charm' },
        { value: 'timeless', label: '⏰ Timeless Stories' }
      ]
    },
    {
      id: 'ending',
      character: 'ted',
      question: "And finally, how should our story conclude this magical evening?",
      gesture: 'romantic',
      options: [
        { value: 'happy', label: '💖 Happily Ever After' },
        { value: 'bittersweet', label: '🥀 Beautifully Bittersweet' },
        { value: 'hopeful', label: '🌅 Hopeful & Inspiring' },
        { value: 'passionate', label: '🔥 Intensely Passionate' }
      ]
    }
  ];

  const movieDatabase = {
    'cozy-classic-modern-happy': 'The Holiday - A perfect cozy evening with modern charm',
    'passionate-drama-vintage-bittersweet': 'Casablanca - Timeless passion and beautiful heartbreak',
    'dreamy-fantasy-timeless-hopeful': 'The Princess Bride - Whimsical adventure and true love',
    'nostalgic-comedy-classic-happy': 'Roman Holiday - Sweet nostalgia with Audrey Hepburn magic',
    // Add more combinations...
    'default': 'When Harry Met Sally - Because sometimes the perfect movie is about perfect friendship turning into love'
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCharacterAnimation(prev => prev === 'idle' ? 'walking' : 'idle');
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleAnswer = (questionId, answer) => {
    const newAnswers = { ...answers, [questionId]: answer };
    setAnswers(newAnswers);
    
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Generate movie recommendation
      const key = Object.values(newAnswers).join('-');
      const movie = movieDatabase[key] || movieDatabase['default'];
      setMovieRecommendation(movie);
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setMovieRecommendation('');
  };

  const currentQ = questions[currentQuestion];
  const isCarrie = currentQ?.character === 'carrie';

  if (showResult) {
    return (
      <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-amber-900 via-amber-800 to-black">
        {/* Background Cinema Scene */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
          <div className="absolute top-20 left-10 w-8 h-8 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-4 h-4 bg-amber-300 rounded-full opacity-40 animate-pulse delay-1000"></div>
        </div>

        {/* Cinema Marquee */}
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2">
          <div className="bg-black border-4 border-amber-400 rounded-lg px-8 py-4 shadow-2xl">
            <div className="flex space-x-2 mb-2">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: `${i * 100}ms`}}></div>
              ))}
            </div>
            <h1 className="text-amber-400 text-2xl font-bold text-center">NOW SHOWING</h1>
          </div>
        </div>

        {/* Result Display */}
        <div className="flex flex-col items-center justify-center min-h-screen px-8">
          <div className="bg-black/80 backdrop-blur-sm border-2 border-amber-400 rounded-2xl p-8 max-w-2xl text-center shadow-2xl">
            <h2 className="text-amber-400 text-3xl font-bold mb-6">✨ Perfect Match Found! ✨</h2>
            
            {/* Both Characters Celebrating */}
            <div className="flex justify-center space-x-8 mb-6">
              {/* Carrie */}
              <div className="relative">
                <div className="w-24 h-32 bg-pink-600 rounded-t-full relative animate-bounce">
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-pink-300 rounded-full border-4 border-amber-400"></div>
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-pink-700 rounded-full"></div>
                  <div className="absolute -right-2 top-16 w-6 h-12 bg-pink-500 rounded-full transform rotate-45"></div>
                  <div className="absolute -left-2 top-16 w-6 h-12 bg-pink-500 rounded-full transform -rotate-45"></div>
                </div>
                <div className="w-8 h-16 bg-pink-800 mx-auto"></div>
                <div className="flex justify-center space-x-2">
                  <div className="w-4 h-8 bg-pink-900 rounded-b-lg"></div>
                  <div className="w-4 h-8 bg-pink-900 rounded-b-lg"></div>
                </div>
                <div className="absolute -top-2 -right-2 text-2xl animate-spin">💋</div>
              </div>

              {/* Ted */}
              <div className="relative">
                <div className="w-24 h-32 bg-blue-600 rounded-t-full relative animate-bounce" style={{animationDelay: '0.5s'}}>
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 bg-blue-300 rounded-full border-4 border-amber-400"></div>
                  <div className="absolute top-20 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-blue-700 rounded-full"></div>
                  <div className="absolute -right-2 top-16 w-6 h-12 bg-blue-500 rounded-full transform rotate-45"></div>
                  <div className="absolute -left-2 top-16 w-6 h-12 bg-blue-500 rounded-full transform -rotate-45"></div>
                </div>
                <div className="w-8 h-16 bg-blue-800 mx-auto"></div>
                <div className="flex justify-center space-x-2">
                  <div className="w-4 h-8 bg-blue-900 rounded-b-lg"></div>
                  <div className="w-4 h-8 bg-blue-900 rounded-b-lg"></div>
                </div>
                <div className="absolute -top-2 -left-2 text-2xl animate-bounce">🎬</div>
              </div>
            </div>

            <div className="bg-amber-400/20 border border-amber-400 rounded-lg p-6 mb-6">
              <h3 className="text-amber-300 text-2xl font-semibold mb-3">{movieRecommendation}</h3>
              <p className="text-amber-100 text-lg italic">"The perfect movie for a perfect evening together"</p>
            </div>

            <div className="flex justify-center space-x-4">
              <button 
                onClick={resetQuiz}
                className="bg-amber-400 hover:bg-amber-500 text-black font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
              >
                🎭 Choose Another Movie
              </button>
            </div>
          </div>
        </div>

        {/* Floating Hearts */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-float opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: '6s'
            }}
          >
            ❤️
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-amber-900 via-amber-800 to-black">
      {/* Background Cinema Scene */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute top-20 left-10 w-8 h-8 bg-amber-400 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-4 h-4 bg-amber-300 rounded-full opacity-40 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-10 w-6 h-6 bg-amber-500 rounded-full opacity-50 animate-pulse delay-2000"></div>
      </div>

      {/* Cinema Marquee */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-black border-4 border-amber-400 rounded-lg px-8 py-4 shadow-2xl">
          <div className="flex space-x-2 mb-2">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="w-3 h-3 bg-amber-400 rounded-full animate-pulse" style={{animationDelay: `${i * 100}ms`}}></div>
            ))}
          </div>
          <h1 className="text-amber-400 text-xl font-bold text-center">MOVIE NIGHT CURATOR</h1>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-80 bg-black/50 rounded-full p-2 z-10">
        <div 
          className="bg-gradient-to-r from-pink-500 to-amber-400 h-2 rounded-full transition-all duration-500"
          style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
        ></div>
      </div>

      <div className="flex flex-col items-center justify-center min-h-screen px-8 relative z-10">
        {/* Character Display */}
        <div className="mb-8 relative">
          {isCarrie ? (
            /* Carrie Bradshaw */
            <div className="relative">
              <div className={`w-32 h-40 bg-pink-600 rounded-t-full relative transition-all duration-1000 ${characterAnimation === 'walking' ? 'animate-bounce' : ''}`}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-pink-300 rounded-full border-4 border-amber-400 shadow-lg">
                  <div className="absolute inset-2 bg-gray-200 rounded-full opacity-80"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">📸</div>
                </div>
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-pink-700 rounded-full"></div>
                
                {/* Arms with gestures */}
                <div className={`absolute -right-3 top-20 w-8 h-16 bg-pink-500 rounded-full transition-transform duration-500 ${
                  currentQ.gesture === 'pointing' ? 'transform rotate-45' : 
                  currentQ.gesture === 'thinking' ? 'transform -rotate-12' : 'transform rotate-12'
                }`}></div>
                <div className={`absolute -left-3 top-20 w-8 h-16 bg-pink-500 rounded-full transition-transform duration-500 ${
                  currentQ.gesture === 'pointing' ? 'transform -rotate-45' : 
                  currentQ.gesture === 'thinking' ? 'transform rotate-45' : 'transform -rotate-12'
                }`}></div>
              </div>
              <div className="w-10 h-20 bg-pink-800 mx-auto"></div>
              <div className="flex justify-center space-x-2">
                <div className="w-5 h-12 bg-pink-900 rounded-b-lg"></div>
                <div className="w-5 h-12 bg-pink-900 rounded-b-lg"></div>
              </div>
              
              {/* Carrie's accessories */}
              <div className="absolute -top-4 -right-4 text-3xl animate-pulse">👠</div>
              <div className="absolute top-8 -left-6 text-2xl animate-bounce">💄</div>
            </div>
          ) : (
            /* Ted Mosby */
            <div className="relative">
              <div className={`w-32 h-40 bg-blue-600 rounded-t-full relative transition-all duration-1000 ${characterAnimation === 'walking' ? 'animate-bounce' : ''}`}>
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-blue-300 rounded-full border-4 border-amber-400 shadow-lg">
                  <div className="absolute inset-2 bg-gray-200 rounded-full opacity-80"></div>
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xs">📸</div>
                </div>
                <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-10 h-10 bg-blue-700 rounded-full"></div>
                
                {/* Arms with gestures */}
                <div className={`absolute -right-3 top-20 w-8 h-16 bg-blue-500 rounded-full transition-transform duration-500 ${
                  currentQ.gesture === 'explaining' ? 'transform rotate-25' : 
                  currentQ.gesture === 'romantic' ? 'transform -rotate-25' : 'transform rotate-12'
                }`}></div>
                <div className={`absolute -left-3 top-20 w-8 h-16 bg-blue-500 rounded-full transition-transform duration-500 ${
                  currentQ.gesture === 'explaining' ? 'transform -rotate-25' : 
                  currentQ.gesture === 'romantic' ? 'transform rotate-25' : 'transform -rotate-12'
                }`}></div>
              </div>
              <div className="w-10 h-20 bg-blue-800 mx-auto"></div>
              <div className="flex justify-center space-x-2">
                <div className="w-5 h-12 bg-blue-900 rounded-b-lg"></div>
                <div className="w-5 h-12 bg-blue-900 rounded-b-lg"></div>
              </div>
              
              {/* Ted's accessories */}
              <div className="absolute -top-4 -right-4 text-2xl animate-pulse">🏛️</div>
              <div className="absolute top-8 -left-6 text-2xl animate-bounce">📐</div>
            </div>
          )}
        </div>

        {/* Speech Bubble */}
        <div className="relative mb-8 max-w-2xl">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border-2 border-amber-400">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white/90 rotate-45 border-t-2 border-l-2 border-amber-400"></div>
            <h2 className={`text-2xl font-bold mb-4 ${isCarrie ? 'text-pink-600' : 'text-blue-600'}`}>
              {currentQ.question}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentQ.options.map((option, index) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQ.id, option.value)}
                  className="bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-black font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Question Counter */}
        <div className="text-amber-300 text-lg font-medium">
          Question {currentQuestion + 1} of {questions.length}
        </div>
      </div>

      {/* Floating Cinema Elements */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute text-3xl opacity-20 animate-float"
          style={{
            left: `${20 + i * 20}%`,
            top: `${30 + (i % 2) * 40}%`,
            animationDelay: `${i * 3}s`,
            animationDuration: '8s'
          }}
        >
          🎬
        </div>
      ))}

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PlaylistContainer;