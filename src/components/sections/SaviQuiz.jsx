import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Check, X, Sparkles, Award, RotateCcw, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { fairyAudio } from '../../utils/soundEffects';

const quizQuestions = [
  {
    id: 1,
    question: "What makes baby Savi laugh the loudest in the whole house?",
    options: [
      { text: "Belly raspberry kisses from Daddy", correct: true, feedback: "Spot on! One raspberry blow on her tummy and she dissolves into endless giggles!" },
      { text: "Loud television cartoons", correct: false, feedback: "Actually, Savi prefers real-life silly giggles and raspberry tummy kisses!" },
      { text: "Dog barking outside the window", correct: false, feedback: "She just stares with big curious eyes at pets!" },
      { text: "Eating boiled peas", correct: false, feedback: "Peas are for playing, not laughing!" },
    ],
  },
  {
    id: 2,
    question: "Which cuddly companion is Savi's official bedtime buddy?",
    options: [
      { text: "Bun-Bun the Soft Pink Rabbit", correct: true, feedback: "Yes! Bun-Bun must be tucked under her arm for sweet dreams." },
      { text: "A giant fluffy teddy bear", correct: false, feedback: "Teddy is cute, but Bun-Bun the pink rabbit is her absolute number one!" },
      { text: "A squeaky toy duck", correct: false, feedback: "Duck is for bath time splashing only!" },
      { text: "A soft fleece blanket only", correct: false, feedback: "She needs her Bun-Bun rabbit right beside her!" },
    ],
  },
  {
    id: 3,
    question: "What was Savi's very first recognizable babble word?",
    options: [
      { text: "'Ba-ba' and 'Ma-ma'", correct: true, feedback: "Correct! She babbled 'Ba-ba' while pointing at her feeding bottle and Mumma!" },
      { text: "'No-no'", correct: false, feedback: "She hasn't learned to say 'no' yet—she's all smiles!" },
      { text: "'Bye-bye'", correct: false, feedback: "She waves bye-bye, but her first spoken babbles were 'Ba-ba'!" },
      { text: "'Cookie'", correct: false, feedback: "A delicious thought, but not quite yet!" },
    ],
  },
  {
    id: 4,
    question: "What is Savi's all-time favorite treat at mealtime?",
    options: [
      { text: "Sweet Mashed Fresh Banana", correct: true, feedback: "Bingo! She claps her hands excitedly the moment the banana bowl appears!" },
      { text: "Spicy lentil soup", correct: false, feedback: "Way too spicy for our little fairy princess!" },
      { text: "Green spinach smoothie", correct: false, feedback: "Mum tries hard, but sweet banana always wins!" },
      { text: "Plain warm water", correct: false, feedback: "Water is okay, but sweet banana is true happiness!" },
    ],
  },
];

export default function SaviQuiz() {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = quizQuestions[currentQIndex];

  const handleSelectOption = (option) => {
    if (selectedAnswer !== null) return; // Prevent double select
    setSelectedAnswer(option);

    if (option.correct) {
      setScore((prev) => prev + 1);
      fairyAudio.playSparkle(1150, 0.3);
    } else {
      fairyAudio.playSparkle(650, 0.2);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    if (currentQIndex < quizQuestions.length - 1) {
      setCurrentQIndex((prev) => prev + 1);
    } else {
      setQuizFinished(true);
      fairyAudio.playWandBurst();
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#ffd0e0', '#cfb7f0', '#99d2f6', '#f8dc81'],
      });
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizFinished(false);
  };

  return (
    <section className="relative py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-fairy border border-fairy-lavender-200 shadow-sm mb-3">
            <HelpCircle className="w-4 h-4 text-fairy-lavender-500" />
            <span className="text-xs font-semibold tracking-wider uppercase text-fairy-lavender-500 font-sans">
              Playful Baby Trivia
            </span>
          </div>

          <h2 className="font-serif text-3xl sm:text-5xl font-bold text-stone-800 tracking-tight">
            How Well Do You Know <span className="font-script text-4xl sm:text-6xl text-fairy-lavender-500">Little Savi?</span>
          </h2>
          <p className="font-serif italic text-base sm:text-lg text-stone-600 mt-2">
            "Test your knowledge about our 1-year-old fairy princess's favorite habits & quirks!"
          </p>
        </div>

        {/* Quiz Box */}
        <div className="glass-fairy-card rounded-3xl p-6 sm:p-10 border border-white shadow-fairy">
          {!quizFinished ? (
            <div>
              {/* Question Progress Tracker */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-fairy-pink-100 text-xs text-stone-500 font-sans">
                <span className="font-semibold text-fairy-pink-500 uppercase tracking-wider">
                  Question {currentQIndex + 1} of {quizQuestions.length}
                </span>
                <span className="font-serif italic">
                  Score: {score} Correct
                </span>
              </div>

              {/* Question Title */}
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-800 mb-6 leading-snug">
                {currentQ.question}
              </h3>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt, idx) => {
                  let buttonStyle = 'bg-white/80 hover:bg-white text-stone-700 border-fairy-pink-100';

                  if (selectedAnswer !== null) {
                    if (opt.correct) {
                      buttonStyle = 'bg-emerald-50 border-emerald-300 text-emerald-800 ring-2 ring-emerald-300';
                    } else if (selectedAnswer.text === opt.text) {
                      buttonStyle = 'bg-rose-50 border-rose-300 text-rose-800';
                    } else {
                      buttonStyle = 'bg-white/40 text-stone-400 border-stone-100 opacity-60';
                    }
                  }

                  return (
                    <button
                      key={opt.text}
                      onClick={() => handleSelectOption(opt)}
                      disabled={selectedAnswer !== null}
                      type="button"
                      className={`w-full p-4 rounded-2xl text-left text-sm font-semibold border transition-all flex items-center justify-between ${buttonStyle}`}
                    >
                      <span>{opt.text}</span>
                      {selectedAnswer !== null && opt.correct && (
                        <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                      )}
                      {selectedAnswer !== null && !opt.correct && selectedAnswer.text === opt.text && (
                        <X className="w-5 h-5 text-rose-500 shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Feedback & Next Button */}
              {selectedAnswer !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-5 border-t border-fairy-pink-100 flex flex-col sm:flex-row items-center justify-between gap-4"
                >
                  <p className="text-xs sm:text-sm text-stone-600 font-sans italic text-left">
                    {selectedAnswer.feedback}
                  </p>
                  <button
                    onClick={handleNextQuestion}
                    type="button"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-gradient-to-r from-fairy-pink-400 to-fairy-lavender-400 text-white font-semibold text-xs shadow-xs hover:scale-105 transition-transform"
                  >
                    {currentQIndex < quizQuestions.length - 1 ? 'Next Question →' : 'See My Fairy Score ✨'}
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            /* Quiz Completed Screen */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-fairy-pink-200 via-fairy-gold-200 to-fairy-lavender-200 flex items-center justify-center mx-auto shadow-md text-3xl">
                👑
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-800">
                {score >= 3 ? "Certified Fairy Godparent! ✨" : "Sweet Fairy Admirer! 🌸"}
              </h3>

              <p className="font-serif text-lg text-fairy-pink-500 font-semibold">
                You got {score} out of {quizQuestions.length} questions right!
              </p>

              <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto leading-relaxed">
                Thank you for knowing and cherishing little Savi so dearly. You are one of the bright stars lighting up her world!
              </p>

              <div className="pt-4">
                <button
                  onClick={handleRestartQuiz}
                  type="button"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-stone-50 border border-fairy-pink-200 text-stone-700 text-xs font-semibold shadow-xs transition-all hover:scale-105"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-fairy-pink-400" />
                  <span>Play Again</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

