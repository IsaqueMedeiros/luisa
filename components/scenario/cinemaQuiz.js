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
      "dia": "Segunda",
      "emoji": "☕",
      "tema": "Energia Matinal",
      "cor": "from-orange-500 to-red-500",
      "perguntas": [
        {
          "texto": "Como você prefere começar a semana?",
          "opcoes": [
            { texto: "Café forte + playlist motivacional", pontos: 5, emoji: "☕" },
            { texto: "Meditação + chá calmante", pontos: 3, emoji: "🧘" },
            { texto: "Exercício + smoothie energético", pontos: 4, emoji: "💪" },
            { texto: "Mimo na cama + série favorita", pontos: 2, emoji: "🛏️" }
          ]
        },
        {
          "texto": "Qual frase te motiva mais?",
          "opcoes": [
            { texto: "'Seja protagonista da sua história'", pontos: 5, emoji: "🌟" },
            { texto: "'Um dia de cada vez'", pontos: 3, emoji: "🌅" },
            { texto: "'Desafios fazem você crescer'", pontos: 4, emoji: "🚀" },
            { texto: "'Aproveite cada momento'", pontos: 2, emoji: "✨" }
          ]
        },
        {
          "texto": "Seu mood de segunda ideal:",
          "opcoes": [
            { texto: "Determinada e focada", pontos: 5, emoji: "🎯" },
            { texto: "Calma e reflexiva", pontos: 3, emoji: "🌸" },
            { texto: "Animada e sociável", pontos: 4, emoji: "🎉" },
            { texto: "Criativa e inspirada", pontos: 2, emoji: "🎨" }
          ]
        }
      ]
    },
    {
      "dia": "Terça",
      "emoji": "🎨",
      "tema": "Criatividade",
      "cor": "from-purple-500 to-pink-500",
      "perguntas": [
        {
          "texto": "Projeto criativo dos sonhos:",
          "opcoes": [
            { texto: "Renovar completamente um espaço", pontos: 5, emoji: "🏠" },
            { texto: "Criar uma coleção de arte", pontos: 4, emoji: "🖼️" },
            { texto: "Escrever um livro/blog", pontos: 3, emoji: "📚" },
            { texto: "Produzir um curta-metragem", pontos: 2, emoji: "🎬" }
          ]
        },
        {
          "texto": "Inspiração vem de:",
          "opcoes": [
            { texto: "Viagens e culturas diferentes", pontos: 4, emoji: "✈️" },
            { texto: "Natureza e paisagens", pontos: 3, emoji: "🌺" },
            { texto: "Arte e música", pontos: 5, emoji: "🎭" },
            { texto: "Pessoas e histórias", pontos: 2, emoji: "👥" }
          ]
        },
        {
          "texto": "Seu espaço criativo ideal:",
          "opcoes": [
            { texto: "Ateliê cheio de luz natural", pontos: 5, emoji: "☀️" },
            { texto: "Café aconchegante com música", pontos: 3, emoji: "☕" },
            { texto: "Biblioteca silenciosa", pontos: 2, emoji: "📖" },
            { texto: "Estúdio moderno com tecnologia", pontos: 4, emoji: "💻" }
          ]
        }
      ]
    },
    {
      "dia": "Quarta",
      "emoji": "⚡",
      "tema": "Energia Extra",
      "cor": "from-yellow-500 to-orange-500",
      "perguntas": [
        {
          "texto": "Metade da semana pede:",
          "opcoes": [
            { texto: "Uma surpresa romântica", pontos: 5, emoji: "💕" },
            { texto: "Encontro com amigos", pontos: 4, emoji: "👯" },
            { texto: "Hobby novo para aprender", pontos: 3, emoji: "🎯" },
            { texto: "Maratona da série favorita", pontos: 2, emoji: "📺" }
          ]
        },
        {
          "texto": "Seu tipo de diversão:",
          "opcoes": [
            { texto: "Aventura espontânea", pontos: 5, emoji: "🗺️" },
            { texto: "Noite de jogos", pontos: 3, emoji: "🎲" },
            { texto: "Show ou evento cultural", pontos: 4, emoji: "🎵" },
            { texto: "Jantar especial em casa", pontos: 2, emoji: "🕯️" }
          ]
        }
      ]
    },
    {
      "dia": "Quinta",
      "emoji": "🎵",
      "tema": "Nostalgia Musical",
      "cor": "from-blue-500 to-purple-500",
      "perguntas": [
        {
          "texto": "Playlist perfeita para hoje:",
          "opcoes": [
            { texto: "Clássicos dos anos 80-90", pontos: 4, emoji: "🎶" },
            { texto: "Sucessos atuais", pontos: 3, emoji: "📻" },
            { texto: "Jazz e bossa nova", pontos: 2, emoji: "🎷" },
            { texto: "Mix romântico atemporal", pontos: 5, emoji: "💖" }
          ]
        },
        {
          "texto": "Memória musical favorita:",
          "opcoes": [
            { texto: "Primeira dança", pontos: 5, emoji: "💃" },
            { texto: "Show inesquecível", pontos: 4, emoji: "🎤" },
            { texto: "Música do primeiro amor", pontos: 3, emoji: "💘" },
            { texto: "Cantando no carro", pontos: 2, emoji: "🚗" }
          ]
        }
      ]
    },
    {
      "dia": "Sexta",
      "emoji": "💕",
      "tema": "Romance",
      "cor": "from-pink-500 to-red-500",
      "perguntas": [
        {
          "texto": "Encontro perfeito seria:",
          "opcoes": [
            { texto: "Jantar com vista panorâmica", pontos: 5, emoji: "🌃" },
            { texto: "Piquenique ao pôr do sol", pontos: 4, emoji: "🌅" },
            { texto: "Cinema seguido de conversa", pontos: 3, emoji: "🍿" },
            { texto: "Cozinhar juntos em casa", pontos: 2, emoji: "👨‍🍳" }
          ]
        },
        {
          "texto": "Gesto romântico que te emociona:",
          "opcoes": [
            { texto: "Surpresa planejada com carinho", pontos: 5, emoji: "🎁" },
            { texto: "Bilhete doce inesperado", pontos: 4, emoji: "💌" },
            { texto: "Música dedicada", pontos: 3, emoji: "🎼" },
            { texto: "Abraço apertado após um dia difícil", pontos: 2, emoji: "🤗" }
          ]
        }
      ]
    }
  ];

  const createParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 4; i++) {
      newParticles.push({
        id: Math.random(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
        delay: Math.random() * 1
      });
    }
    setParticles(newParticles);
  };

  const handleAnswer = (answerIndex, points) => {
    if (selectedAnswer !== null) return; // Prevent multiple clicks
    
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
    }, 1000);
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
    if (score >= 60) return {
      title: "Alma Romântica",
      description: "Você valoriza momentos especiais e conexões profundas",
      movie: "Encontro de Amor",
      emoji: "💖",
      color: "from-pink-500 to-red-500"
    };
    if (score >= 45) return {
      title: "Espírito Aventureiro", 
      description: "Busca experiências marcantes e novos horizontes",
      movie: "Viagem dos Sonhos",
      emoji: "🌟",
      color: "from-yellow-500 to-orange-500"
    };
    if (score >= 30) return {
      title: "Coração Criativo",
      description: "Encontra beleza e inspiração em tudo ao redor",
      movie: "Arte & Paixão",
      emoji: "🎨",
      color: "from-purple-500 to-pink-500"
    };
    return {
      title: "Essência Tranquila",
      description: "Aprecia simplicidade e momentos de paz",
      movie: "Refúgio Sereno",
      emoji: "🌸",
      color: "from-blue-500 to-green-500"
    };
  };

  const currentQuiz = quizData[currentDay];
  const currentQ = currentQuiz.perguntas[currentQuestion];
  const totalQuestions = quizData.reduce((acc, day) => acc + day.perguntas.length, 0);
  const answeredQuestions = currentDay * 3 + currentQuestion;
  const progress = (answeredQuestions / totalQuestions) * 100;

  if (showResult) {
    const result = getPersonalityResult();
    return (
      <div className="h-full w-full flex flex-col justify-center items-center p-2 sm:p-4">
        {/* Particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-pulse text-yellow-300 text-lg sm:text-xl z-10"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`
            }}
          >
            ✨
          </div>
        ))}
        
        <div className="text-center space-y-2 sm:space-y-4">
          <div className="text-3xl sm:text-5xl mb-2">{result.emoji}</div>
          <h2 className={`text-xl sm:text-4xl font-bold bg-gradient-to-r ${result.color} bg-clip-text text-transparent animate-pulse drop-shadow-lg`}>
            {result.title}
          </h2>
          <p className="text-sm sm:text-xl text-white font-medium">{result.description}</p>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-4 mb-3 sm:mb-6">
            <div className="flex justify-around text-center">
              <div>
                <div className="text-lg sm:text-2xl font-bold text-yellow-400">{score}</div>
                <div className="text-xs sm:text-sm text-gray-300">Pontos</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-yellow-400">{streak}</div>
                <div className="text-xs sm:text-sm text-gray-300">Sequência</div>
              </div>
              <div>
                <div className="text-lg sm:text-2xl font-bold text-yellow-400">{Math.round((score/75)*100)}%</div>
                <div className="text-xs sm:text-sm text-gray-300">Match</div>
              </div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-2 sm:p-3 mb-3">
            <div className="flex items-center justify-center mb-1">
              <Film className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-yellow-400" />
              <span className="font-semibold text-xs sm:text-sm text-white">Filme Recomendado</span>
            </div>
            <div className="text-sm sm:text-lg font-bold text-yellow-300">{result.movie}</div>
          </div>
          
          <div className="flex justify-center space-x-2 pt-2">
            <button
              onClick={restart}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              🔄 Refazer
            </button>
            <button
              onClick={onQuizClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300"
            >
              ✖️ Voltar
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-full w-full bg-gradient-to-br ${currentQuiz.cor} transition-all duration-500 ${isTransitioning ? 'scale-95 opacity-50' : 'scale-100 opacity-100'} relative overflow-hidden flex flex-col`}>
      
      {/* Particles Animation */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute animate-bounce text-yellow-300 z-10"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            animationDelay: `${particle.delay}s`,
            animationDuration: '1.5s'
          }}
        >
          ⭐
        </div>
      ))}

      {/* Header */}
      <div className="flex justify-between items-center p-2 sm:p-4 text-white">
        <div className="flex items-center">
          <span className="text-lg sm:text-2xl mr-2">{currentQuiz.emoji}</span>
          <div>
            <h1 className="text-sm sm:text-lg font-bold">{currentQuiz.dia}</h1>
            <p className="text-xs sm:text-sm opacity-80">{currentQuiz.tema}</p>
          </div>
        </div>
        <button
          onClick={onQuizClose}
          className="text-white/60 hover:text-white transition-colors text-lg sm:text-xl"
        >
          ✕
        </button>
      </div>

      {/* Stats */}
      <div className="flex justify-between text-xs sm:text-sm mx-2 sm:mx-4 mb-2 sm:mb-3 bg-white/20 rounded-lg p-2 text-white">
        <div className="flex items-center">
          <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span>{score}pts</span>
        </div>
        <div className="flex items-center">
          <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span>{streak}x</span>
        </div>
        <div className="flex items-center">
          <Clock className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
          <span>{currentQuestion + 1}/{currentQuiz.perguntas.length}</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mx-2 sm:mx-4 mb-2 sm:mb-3">
        <div className="w-full bg-white/20 rounded-full h-1.5 sm:h-2 mb-1">
          <div 
            className="bg-gradient-to-r from-yellow-400 to-yellow-600 h-1.5 sm:h-2 rounded-full transition-all duration-700 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="text-center text-xs opacity-75 text-white">
          {Math.round(progress)}% completo
        </div>
      </div>

      {/* Question */}
      <div className="text-center mb-2 sm:mb-3 px-2 sm:px-4">
        <h2 className="text-sm sm:text-base font-semibold leading-relaxed text-white">
          {currentQ.texto}
        </h2>
      </div>

      {/* Answer Options */}
      <div className="flex-1 overflow-y-auto px-2 sm:px-4 pb-2 sm:pb-4">
        <div className="space-y-2">
          {currentQ.opcoes.map((opcao, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index, opcao.pontos)}
              disabled={selectedAnswer !== null || isTransitioning}
              className={`w-full group bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 sm:p-3 text-left transition-all duration-300 transform hover:scale-102 hover:bg-white/20 ${
                selectedAnswer === index ? 'bg-green-500/50 scale-102' : ''
              } ${selectedAnswer !== null && selectedAnswer !== index ? 'opacity-50' : ''} ${selectedAnswer !== null || isTransitioning ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center">
                <div className="mr-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-white/20 to-white/40 flex items-center justify-center text-xs sm:text-sm font-bold">
                  {opcao.emoji}
                </div>
                <div className="flex-1">
                  <span className="text-xs sm:text-sm text-white">{opcao.texto}</span>
                  <div className="text-xs opacity-60 mt-0.5 text-white">+{opcao.pontos} pontos</div>
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