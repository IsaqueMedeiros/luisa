import React, { useState, useEffect } from 'react';
import { Heart, Star, Film, Calendar, Coffee, Music, Palette, MapPin, Camera, Play, Sparkles, Award, Zap, Clock, Gift } from 'lucide-react';

const InteractiveCinemaQuiz = ({ onQuizClose }) => {
  const [currentDay, setCurrentDay] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [particles, setParticles] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const quizData = [
    {
      "dia": "Romance",
      "emoji": "💕",
      "tema": "Que tipo de amor te toca?",
      "cor": "from-rose-400 via-pink-500 to-red-500",
      "perguntas": [
        {
          "texto": "Qual história de amor mais te emociona?",
          "opcoes": [
            { texto: "Amor que supera obstáculos impossíveis", pontos: 5, emoji: "🌟" },
            { texto: "Romance doce e cotidiano", pontos: 3, emoji: "☕" },
            { texto: "Paixão intensa e avassaladora", pontos: 4, emoji: "🔥" },
            { texto: "Amizade que vira amor verdadeiro", pontos: 2, emoji: "💝" }
          ]
        },
        {
          "texto": "Momento romântico perfeito seria:",
          "opcoes": [
            { texto: "Dançar sob as estrelas", pontos: 5, emoji: "✨" },
            { texto: "Cozinhar juntos rindo muito", pontos: 3, emoji: "👨‍🍳" },
            { texto: "Viajar para um lugar mágico", pontos: 4, emoji: "🌍" },
            { texto: "Assistir filmes abraçadinhos", pontos: 2, emoji: "🍿" }
          ]
        },
        {
          "texto": "O que mais valoriza no amor?",
          "opcoes": [
            { texto: "Cumplicidade e conexão profunda", pontos: 5, emoji: "💫" },
            { texto: "Carinho e cuidado mútuo", pontos: 3, emoji: "🤗" },
            { texto: "Aventura e descobertas juntos", pontos: 4, emoji: "🗺️" },
            { texto: "Paz e segurança emocional", pontos: 2, emoji: "🏠" }
          ]
        }
      ]
    },
    {
      "dia": "Aventura",
      "emoji": "🌟",
      "tema": "Qual sua vibe aventureira?",
      "cor": "from-amber-400 via-orange-500 to-red-500",
      "perguntas": [
        {
          "texto": "Aventura dos sonhos seria:",
          "opcoes": [
            { texto: "Explorar uma cidade antiga e misteriosa", pontos: 5, emoji: "🏛️" },
            { texto: "Roadtrip sem destino definido", pontos: 4, emoji: "🚗" },
            { texto: "Acampar sob um céu estrelado", pontos: 3, emoji: "⭐" },
            { texto: "Descobrir um café escondido na cidade", pontos: 2, emoji: "☕" }
          ]
        },
        {
          "texto": "Quando assiste um filme de aventura, você:",
          "opcoes": [
            { texto: "Se imagina vivendo aquela jornada", pontos: 4, emoji: "🎬" },
            { texto: "Fica na torcida pelos personagens", pontos: 3, emoji: "📺" },
            { texto: "Analisa cada detalhe da história", pontos: 5, emoji: "🔍" },
            { texto: "Só quer relaxar e se divertir", pontos: 2, emoji: "😊" }
          ]
        },
        {
          "texto": "Seu tipo de herói/heroína favorito:",
          "opcoes": [
            { texto: "Corajoso(a) que luta pelo que é certo", pontos: 5, emoji: "⚔️" },
            { texto: "Inteligente que resolve tudo com sabedoria", pontos: 4, emoji: "🧠" },
            { texto: "Divertido(a) que usa humor nas dificuldades", pontos: 3, emoji: "😄" },
            { texto: "Sensível que toca o coração dos outros", pontos: 2, emoji: "💖" }
          ]
        }
      ]
    },
    {
      "dia": "Fantasia",
      "emoji": "🦋",
      "tema": "Que mundo mágico te chama?",
      "cor": "from-purple-400 via-violet-500 to-indigo-600",
      "perguntas": [
        {
          "texto": "Se pudesse viver em um mundo fantástico:",
          "opcoes": [
            { texto: "Reino encantado com castelos e magia", pontos: 5, emoji: "🏰" },
            { texto: "Floresta mágica com criaturas místicas", pontos: 4, emoji: "🧚" },
            { texto: "Cidade futurista com tecnologia incrível", pontos: 3, emoji: "🌆" },
            { texto: "Vila aconchegante com pessoas especiais", pontos: 2, emoji: "🏘️" }
          ]
        },
        {
          "texto": "Poder mágico que mais te fascina:",
          "opcoes": [
            { texto: "Voar pelos céus infinitos", pontos: 5, emoji: "🕊️" },
            { texto: "Curar dores e trazer felicidade", pontos: 2, emoji: "💚" },
            { texto: "Viajar no tempo para qualquer época", pontos: 4, emoji: "⏰" },
            { texto: "Ler mentes e entender corações", pontos: 3, emoji: "💭" }
          ]
        }
      ]
    },
    {
      "dia": "Drama",
      "emoji": "🎭",
      "tema": "Que emoções te movem?",
      "cor": "from-blue-400 via-blue-500 to-blue-600",
      "perguntas": [
        {
          "texto": "História que mais te emociona:",
          "opcoes": [
            { texto: "Superação pessoal contra todas as odds", pontos: 5, emoji: "💪" },
            { texto: "Sacrifício por amor à família", pontos: 4, emoji: "👨‍👩‍👧‍👦" },
            { texto: "Encontrar propósito após uma perda", pontos: 3, emoji: "🌅" },
            { texto: "Amizade que transforma vidas", pontos: 2, emoji: "🤝" }
          ]
        },
        {
          "texto": "Quando um filme te faz chorar, você:",
          "opcoes": [
            { texto: "Deixa as lágrimas fluírem naturalmente", pontos: 3, emoji: "😢" },
            { texto: "Tenta disfarçar mas fica emocionada", pontos: 4, emoji: "🥺" },
            { texto: "Chora e ainda quer conversar sobre", pontos: 5, emoji: "💬" },
            { texto: "Prefere filmes que te fazem sorrir", pontos: 2, emoji: "😊" }
          ]
        }
      ]
    },
    {
      "dia": "Comédia",
      "emoji": "😄",
      "tema": "O que te faz rir?",
      "cor": "from-yellow-400 via-amber-500 to-orange-500",
      "perguntas": [
        {
          "texto": "Seu tipo de humor favorito:",
          "opcoes": [
            { texto: "Comédia inteligente e sarcástica", pontos: 4, emoji: "🤓" },
            { texto: "Humor romântico e fofo", pontos: 5, emoji: "🥰" },
            { texto: "Situações absurdas e engraçadas", pontos: 3, emoji: "🤪" },
            { texto: "Comédia leve e despretensiosa", pontos: 2, emoji: "😌" }
          ]
        },
        {
          "texto": "Noite perfeita de diversão seria:",
          "opcoes": [
            { texto: "Stand-up comedy ao vivo", pontos: 4, emoji: "🎤" },
            { texto: "Comédia romântica com pipoca", pontos: 5, emoji: "🍿" },
            { texto: "Série engraçada em maratona", pontos: 2, emoji: "📺" },
            { texto: "Improvisação e jogos divertidos", pontos: 3, emoji: "🎭" }
          ]
        }
      ]
    }
  ];

  const createParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 6; i++) {
      newParticles.push({
        id: Math.random(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 70 + 15,
        delay: Math.random() * 1.5,
        type: i % 2 === 0 ? '💖' : '✨'
      });
    }
    setParticles(newParticles);
  };

  const handleAnswer = (answerIndex, points) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const newScore = score + points;
    setScore(newScore);
    
    if (points >= 4) {
      setStreak(streak + 1);
      createParticles();
    } else {
      setStreak(0);
    }

    const dayKey = `day${currentDay}`;
    const questionKey = `q${currentQuestion}`;
    
    setAnswers(prev => ({
      ...prev,
      [dayKey]: {
        ...prev[dayKey],
        [questionKey]: { answerIndex, points }
      }
    }));

    setIsTransitioning(true);
    
    setTimeout(() => {
      if (currentQuestion < quizData[currentDay].perguntas.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else if (currentDay < quizData.length - 1) {
        setCurrentDay(currentDay + 1);
        setCurrentQuestion(0);
      } else {
        setShowResult(true);
      }
      setIsTransitioning(false);
      setSelectedAnswer(null);
    }, 1200);
  };

  const restart = () => {
    setCurrentDay(0);
    setCurrentQuestion(0);
    setAnswers({});
    setShowResult(false);
    setIsTransitioning(false);
    setScore(0);
    setStreak(0);
    setParticles([]);
    setSelectedAnswer(null);
  };

  const getPersonalityResult = () => {
    if (score >= 65) return {
      title: "Alma Romântica Épica",
      description: "Você ama histórias grandiosas de amor e aventura que tocam o coração profundamente",
      movie: "La La Land",
      genre: "Musical Romântico",
      emoji: "💫",
      color: "from-pink-400 via-rose-500 to-red-500",
      movies: ["The Notebook", "Casablanca", "Titanic"]
    };
    if (score >= 50) return {
      title: "Espírito Aventureiro", 
      description: "Busca filmes cheios de magia, aventura e mundos incríveis para explorar",
      movie: "Mamma Mia!",
      genre: "Musical Aventura",
      emoji: "🌟",
      color: "from-amber-400 via-orange-500 to-red-500",
      movies: ["The Princess Bride", "Moana", "Wonder Woman"]
    };
    if (score >= 35) return {
      title: "Coração Sensível",
      description: "Aprecia filmes que exploram emoções profundas e conexões humanas genuínas",
      movie: "About Time",
      genre: "Drama Romântico",
      emoji: "🦋",
      color: "from-blue-400 via-purple-500 to-indigo-500",
      movies: ["Inside Out", "Her", "Eternal Sunshine"]
    };
    return {
      title: "Essência Doce",
      description: "Adora comédias românticas leves que aquecem o coração e fazem sorrir",
      movie: "You've Got Mail",
      genre: "Comédia Romântica",
      emoji: "🌸",
      color: "from-yellow-400 via-pink-400 to-rose-400",
      movies: ["10 Things I Hate About You", "Crazy, Stupid, Love", "The Holiday"]
    };
  };

  const currentQuiz = quizData[currentDay];
  const currentQ = currentQuiz.perguntas[currentQuestion];
  const totalQuestions = quizData.reduce((acc, day) => acc + day.perguntas.length, 0);
  const answeredQuestions = currentDay === 0 ? currentQuestion : 
    quizData.slice(0, currentDay).reduce((acc, day) => acc + day.perguntas.length, 0) + currentQuestion;
  const progress = (answeredQuestions / totalQuestions) * 100;

  if (showResult) {
    const result = getPersonalityResult();
    return (
      <div className="h-full w-full flex flex-col justify-center items-center p-3 sm:p-6 relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-pink-500/10 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-purple-500/10 rounded-full blur-xl animate-pulse delay-700"></div>
          <div className="absolute top-1/2 right-1/3 w-20 h-20 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-1000"></div>
        </div>

        {/* Celebration Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute text-xl sm:text-2xl z-20 animate-bounce"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: '2s'
            }}
          >
            {particle.type}
          </div>
        ))}
        
        <div className="relative z-10 text-center space-y-3 sm:space-y-6 max-w-md mx-auto">
          
          {/* Result Emoji */}
          <div className="text-4xl sm:text-6xl mb-3 animate-bounce">{result.emoji}</div>
          
          {/* Title */}
          <h2 className={`text-xl sm:text-3xl font-bold bg-gradient-to-r ${result.color} bg-clip-text text-transparent animate-pulse drop-shadow-lg leading-tight`}>
            {result.title}
          </h2>
          
          {/* Description */}
          <p className="text-sm sm:text-lg text-gray-200 font-medium leading-relaxed px-2">
            {result.description}
          </p>
          
          {/* Stats Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-2xl">
            <div className="grid grid-cols-3 gap-4 text-center mb-4">
              <div className="space-y-1">
                <div className="text-lg sm:text-2xl font-bold text-yellow-400">{score}</div>
                <div className="text-xs sm:text-sm text-gray-300">Pontos</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg sm:text-2xl font-bold text-pink-400">{streak}</div>
                <div className="text-xs sm:text-sm text-gray-300">Sequência</div>
              </div>
              <div className="space-y-1">
                <div className="text-lg sm:text-2xl font-bold text-purple-400">{Math.round((score/75)*100)}%</div>
                <div className="text-xs sm:text-sm text-gray-300">Match</div>
              </div>
            </div>

            {/* Main Movie Recommendation */}
            <div className="border-t border-white/20 pt-4">
              <div className="flex items-center justify-center mb-2">
                <Film className="w-4 h-4 sm:w-5 sm:h-5 mr-2 text-yellow-400" />
                <span className="font-semibold text-sm sm:text-base text-white">Filme Perfeito Para Você</span>
              </div>
              <div className="text-lg sm:text-xl font-bold text-yellow-300 mb-1">{result.movie}</div>
              <div className="text-xs sm:text-sm text-gray-300 bg-white/10 rounded-full px-3 py-1 inline-block">
                {result.genre}
              </div>
            </div>

            {/* Additional Recommendations */}
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="text-xs sm:text-sm text-gray-300 mb-2">Outras sugestões especiais:</div>
              <div className="flex flex-wrap gap-1.5 justify-center">
                {result.movies.map((movie, index) => (
                  <span key={index} className="text-xs bg-white/20 text-gray-200 rounded-full px-2 py-1">
                    {movie}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex justify-center space-x-3 pt-2">
            <button
              onClick={restart}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span>🔄</span>
              <span>Refazer</span>
            </button>
            <button
              onClick={onQuizClose}
              className="bg-gray-700/80 hover:bg-gray-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-base font-semibold transition-all duration-300 backdrop-blur-sm border border-gray-600 flex items-center space-x-2"
            >
              <span>✖️</span>
              <span>Voltar</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full w-full bg-gradient-to-br ${currentQuiz.cor} transition-all duration-700 ${isTransitioning ? 'scale-95 opacity-70' : 'scale-100 opacity-100'} relative overflow-hidden flex flex-col`}>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/6 w-24 h-24 bg-white/5 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/6 w-20 h-20 bg-white/5 rounded-full blur-xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-white/5 rounded-full blur-xl animate-pulse delay-1000"></div>
      </div>

      {/* Celebration Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute text-lg sm:text-xl z-20 animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '2s'
          }}
        >
          {particle.type}
        </div>
      ))}

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center p-3 sm:p-5 text-white">
        <div className="flex items-center space-x-3">
          <div className="text-2xl sm:text-3xl animate-pulse">{currentQuiz.emoji}</div>
          <div>
            <h1 className="text-base sm:text-xl font-bold drop-shadow-lg">{currentQuiz.dia}</h1>
            <p className="text-xs sm:text-sm opacity-90 font-medium">{currentQuiz.tema}</p>
          </div>
        </div>
        <button
          onClick={onQuizClose}
          className="text-white/70 hover:text-white transition-all duration-300 text-xl sm:text-2xl hover:scale-110 hover:rotate-90 p-2 rounded-full hover:bg-white/10"
        >
          ✕
        </button>
      </div>

      {/* Enhanced Stats Bar */}
      <div className="relative z-10 flex justify-between items-center text-xs sm:text-sm mx-3 sm:mx-5 mb-3 sm:mb-4 bg-white/15 backdrop-blur-md rounded-2xl p-3 sm:p-4 text-white border border-white/20 shadow-lg">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
          <span className="font-semibold">{score}</span>
          <span className="opacity-75">pts</span>
        </div>
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-pink-400" />
          <span className="font-semibold">{streak}</span>
          <span className="opacity-75">seq</span>
        </div>
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
          <span className="font-semibold">{currentQuestion + 1}</span>
          <span className="opacity-75">/{currentQuiz.perguntas.length}</span>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="relative z-10 mx-3 sm:mx-5 mb-4 sm:mb-6">
        <div className="relative">
          <div className="w-full bg-white/20 rounded-full h-2 sm:h-3 backdrop-blur-sm border border-white/30">
            <div 
              className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 h-2 sm:h-3 rounded-full transition-all duration-1000 ease-out shadow-lg relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <div className="text-center text-xs sm:text-sm mt-2 font-medium text-white/90">
            {Math.round(progress)}% completo • {totalQuestions - answeredQuestions} restantes
          </div>
        </div>
      </div>

      {/* Question Section */}
      {/* <div className="relative z-10 text-center mb-4 sm:mb-6 px-3 sm:px-2">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 shadow-xl">
          <h2 className="text-sm sm:text-lg font-semibold leading-relaxed text-white drop-shadow-lg">
            {currentQ.texto}
          </h2>
        </div>
      </div> */}

      {/* Answer Options */}
      <div className="relative z-10 flex-1 overflow-y-auto px-3 sm:px-5 pb-3 sm:pb-5">
        <div className="space-y-3 sm:space-y-4">
          {currentQ.opcoes.map((opcao, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index, opcao.pontos)}
              disabled={selectedAnswer !== null || isTransitioning}
              className={`w-full group bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 sm:p-4 text-left transition-all duration-500 transform hover:scale-105 hover:bg-white/20 shadow-lg hover:shadow-2xl ${
                selectedAnswer === index ? 'bg-green-500/40 scale-105 shadow-2xl border-green-400/50' : ''
              } ${selectedAnswer !== null && selectedAnswer !== index ? 'opacity-40 scale-95' : ''} ${selectedAnswer !== null || isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer hover:border-white/40'}`}
            >
              <div className="flex items-center space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-white/20 to-white/40 flex items-center justify-center text-lg sm:text-xl border border-white/30 group-hover:scale-110 transition-transform duration-300">
                  {opcao.emoji}
                </div>
                <div className="flex-1">
                  <span className="text-sm sm:text-base text-white font-medium leading-relaxed block">
                    {opcao.texto}
                  </span>
                  <div className="flex items-center mt-1.5 space-x-2">
                    <div className="text-xs bg-white/20 text-white/90 rounded-full px-2 py-0.5 font-medium">
                      +{opcao.pontos} pts
                    </div>
                    {opcao.pontos >= 4 && (
                      <Star className="w-3 h-3 text-yellow-400 animate-pulse" />
                    )}
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InteractiveCinemaQuiz;