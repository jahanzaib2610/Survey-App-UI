
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const questions = [
  {
    id: 1,
    question: "How often do you participate in online surveys?",
    options: [
      "This is my first time",
      "Occasionally",
      "Regularly",
      "Very frequently"
    ]
  },
  {
    id: 2,
    question: "What motivates you to take surveys?",
    options: [
      "Monetary rewards",
      "Sharing my opinion",
      "Contributing to research",
      "Personal interest"
    ]
  },
  {
    id: 3,
    question: "How would you rate the design of this survey?",
    options: [
      "Excellent",
      "Good",
      "Average",
      "Needs improvement"
    ]
  },
  {
    id: 4,
    question: "What device are you using to take this survey?",
    options: [
      "Smartphone",
      "Tablet",
      "Laptop",
      "Desktop computer"
    ]
  },
  {
    id: 5,
    question: "Would you recommend this survey to others?",
    options: [
      "Definitely",
      "Probably",
      "Not sure",
      "Probably not"
    ]
  }
];

const Index = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));

    if (currentQuestion === questions.length - 1) {
      setIsCompleted(true);
    } else {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    console.log('Survey answers:', answers);
  };

  const progressPercentage = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-survey-primary to-blue-900 text-white py-8 px-4 overflow-hidden">
      <div className="max-w-md mx-auto relative">
        {/* Progress bar */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div 
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
          <p className="text-sm text-gray-300 mt-2 font-medium">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </motion.div>

        {/* Stacked Question Cards */}
        <div className="relative h-[450px]">
          <AnimatePresence mode="popLayout">
            {!isCompleted ? (
              questions.map((question, index) => {
                const isActive = index === currentQuestion;
                const isPast = index < currentQuestion;
                const isFuture = index > currentQuestion;

                return (
                  <motion.div
                    key={question.id}
                    initial={isPast ? { scale: 1, y: 0, zIndex: questions.length - index } : 
                            isFuture ? { scale: 0.95, y: 20, zIndex: questions.length - index } :
                            { scale: 0.95, y: 20, zIndex: questions.length }}
                    animate={isActive ? { scale: 1, y: 0, zIndex: questions.length } :
                            isPast ? { scale: 0.9, y: 400, zIndex: -1, opacity: 0 } :
                            { scale: 0.95, y: 20 * (index - currentQuestion), zIndex: questions.length - index }}
                    exit={isPast ? { scale: 0.9, y: 400, opacity: 0 } : { scale: 0.95, y: 20 }}
                    transition={{
                      duration: 0.5,
                      ease: "easeInOut",
                      scale: { duration: 0.4 },
                      y: { duration: 0.4 }
                    }}
                    className={`absolute top-0 left-0 w-full ${isActive ? 'pointer-events-auto' : 'pointer-events-none'}`}
                  >
                    <div className={`w-full bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl
                                  border border-white/20 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
                      <motion.h2 
                        className="text-2xl font-semibold mb-8 leading-tight"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: isActive ? 1 : 0.7, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        {question.question}
                      </motion.h2>
                      <div className="space-y-4">
                        {question.options.map((option, optionIndex) => (
                          <motion.button
                            key={optionIndex}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: isActive ? 1 : 0.7, x: 0 }}
                            transition={{ duration: 0.3, delay: 0.1 * optionIndex }}
                            onClick={() => isActive && handleAnswer(option)}
                            className="w-full text-left p-4 rounded-xl 
                                     bg-gradient-to-r from-white/5 to-white/10
                                     hover:from-white/10 hover:to-white/20
                                     transition-all duration-300 transform hover:scale-[1.02]
                                     border border-white/10 hover:border-white/30
                                     shadow-lg hover:shadow-xl"
                          >
                            {option}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute top-0 left-0 w-full text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-2xl border border-white/20"
              >
                <motion.div 
                  className="mb-8"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                >
                  <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto flex items-center justify-center">
                    <svg 
                      className="w-12 h-12 text-white" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                  </div>
                </motion.div>
                <motion.h2 
                  className="text-3xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  Thank you for completing the survey!
                </motion.h2>
                <motion.p 
                  className="text-gray-300 mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  Your responses have been recorded.
                </motion.p>
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  onClick={handleSubmit}
                  className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl
                           hover:opacity-90 transition-all duration-300
                           transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                >
                  Submit Answers
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Index;
