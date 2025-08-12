"use client";
import React, { useState } from 'react';
import { Film, Heart, Sparkles } from 'lucide-react';

const PlaylistContainer = () => {
  const [currentStep, setCurrentStep] = useState('questions');
  const [answers, setAnswers] = useState({});
  const [recommendedMovie, setRecommendedMovie] = useState('');

  // Sample questions for movie recommendation
  const questions = [
    {
      id: 1,
      text: "Qual gênero você prefere?",
      options: ["Romance", "Comédia", "Drama", "Ação"]
    },
    {
      id: 2,
      text: "Que tipo de final você gosta?",
      options: ["Final feliz", "Final aberto", "Plot twist", "Tanto faz"]
    },
    {
      id: 3,
      text: "Prefere filmes mais antigos ou novos?",
      options: ["Clássicos", "Modernos", "Não importa"]
    }
  ];

  const movies = [
    "Cidade dos Anjos", "Diário de uma Paixão", "Eternal Sunshine", 
    "500 Dias com Ela", "Her", "About Time", "La La Land"
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers({...answers, [questionId]: answer});
  };

  const generateRecommendation = () => {
    const randomMovie = movies[Math.floor(Math.random() * movies.length)];
    setRecommendedMovie(randomMovie);
    setCurrentStep('result');
  };

  const Confetti = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <div
          key={i}
          className={`absolute w-2 h-2 bg-pink-400 rounded animate-pulse`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 3}s`
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-4">
      {/* Header */}
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-center space-x-4">
            <Film className="w-12 h-12 text-purple-600" />
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Sistema de Recomendação de Filmes
              </h1>
              <div className="bg-purple-100 border-2 border-purple-300 rounded-lg px-4 py-2">
                <p className="text-purple-700 font-medium">
                  Perguntas interativas para recomendar a melhor opção de filme
                </p>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="p-2 hover:bg-gray-100 rounded">📎</button>
              <button className="p-2 hover:bg-gray-100 rounded">🔒</button>
              <button className="p-2 hover:bg-gray-100 rounded">⋯</button>
            </div>
          </div>
        </div>

        {currentStep === 'questions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Ted Mosby Character */}
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-lg p-4 mb-4 shadow-md max-w-xs">
                <p className="text-gray-700 text-sm">
                  Olá! Sou o Ted Mosby e vou te ajudar a encontrar o filme perfeito! Vamos começar?
                </p>
              </div>
              <div className="bg-yellow-100 rounded-full p-6 mb-2">
                <div className="w-16 h-16 bg-yellow-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👨</span>
                </div>
              </div>
              <p className="text-center text-sm font-medium text-gray-600">
                Personagem Ted Mosby interativo<br />
                para fazer perguntas de filme
              </p>
            </div>

            {/* Questions Section */}
            <div className="space-y-6">
              {questions.map((question, index) => (
                <div key={question.id} className="bg-white rounded-lg p-6 shadow-md">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    {question.text}
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {question.options.map((option, optionIndex) => (
                      <button
                        key={optionIndex}
                        onClick={() => handleAnswer(question.id, option)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                          answers[question.id] === option
                            ? 'bg-purple-100 border-purple-300 text-purple-700'
                            : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
              
              {Object.keys(answers).length === questions.length && (
                <button
                  onClick={generateRecommendation}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                >
                  Gerar Recomendação ✨
                </button>
              )}
            </div>

            {/* Carrie Bradshaw Character */}
            <div className="flex flex-col items-center">
              <div className="bg-white rounded-lg p-4 mb-4 shadow-md max-w-xs">
                <p className="text-gray-700 text-sm">
                  Hey honey! Carrie aqui! Mal posso esperar para descobrir qual filme vai conquistar seu coração!
                </p>
              </div>
              <div className="bg-pink-100 rounded-full p-6 mb-2">
                <div className="w-16 h-16 bg-pink-300 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👩</span>
                </div>
              </div>
              <p className="text-center text-sm font-medium text-gray-600">
                Personagem Carrie Bradshaw<br />
                interativo para fazer questionar as<br />
                perguntas do red mosb
              </p>
            </div>
          </div>
        )}

        {currentStep === 'result' && (
          <div className="flex flex-col items-center justify-center min-h-96 relative">
            <Confetti />
            <div className="relative">
              {/* Heart Shape Result */}
              <div className="relative">
                <Heart className="w-48 h-48 text-red-400 fill-current" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center p-6">
                    <p className="text-red-700 font-bold text-lg mb-2">
                      Resultado do filme
                    </p>
                    <p className="text-red-700 font-bold text-lg mb-2">
                      escolhido com
                    </p>
                    <p className="text-red-700 font-bold text-lg">
                      confetes
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Arrow pointing to result */}
              <div className="absolute -top-4 -right-12 transform rotate-45">
                <div className="w-16 h-2 bg-red-400 rounded"></div>
                <div className="absolute -right-2 -top-2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-red-400"></div>
              </div>
            </div>

            {/* Movie Result */}
            <div className="mt-8 bg-white rounded-lg p-8 shadow-xl max-w-md text-center">
              <Sparkles className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Sua Recomendação Especial
              </h2>
              <p className="text-xl text-purple-600 font-semibold mb-4">
                "{recommendedMovie}"
              </p>
              <p className="text-gray-600 mb-6">
                Baseado nas suas preferências, este filme foi escolhido especialmente para você!
              </p>
              <button
                onClick={() => {
                  setCurrentStep('questions');
                  setAnswers({});
                  setRecommendedMovie('');
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200"
              >
                Fazer Nova Recomendação
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaylistContainer;