
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
      setTimeout(() => {
        setCurrentQuestion(prev => prev + 1);
      }, 300);
    }
  };

  const handleSubmit = () => {
    console.log('Survey answers:', answers);
    // Here you would typically send the answers to your backend
  };

  const progressPercentage = ((currentQuestion) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-survey-primary to-survey-secondary text-white py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="h-2 w-full bg-gray-700 rounded-full">
            <div 
              className="h-full bg-survey-accent rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">
            Question {currentQuestion + 1} of {questions.length}
          </p>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          {!isCompleted ? (
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl"
            >
              <h2 className="text-xl font-medium mb-6">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(option)}
                    className="w-full text-left p-4 rounded-xl bg-white/5 hover:bg-white/10 
                             transition-all duration-200 transform hover:scale-[1.02]
                             border border-white/10 hover:border-white/20"
                  >
                    {option}
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
            >
              <div className="mb-6">
                <div className="w-20 h-20 bg-survey-accent rounded-full mx-auto flex items-center justify-center">
                  <svg 
                    className="w-10 h-10 text-white" 
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
              </div>
              <h2 className="text-2xl font-semibold mb-4">
                Thank you for completing the survey!
              </h2>
              <p className="text-gray-300 mb-8">
                Your responses have been recorded.
              </p>
              <button
                onClick={handleSubmit}
                className="bg-survey-accent text-white px-8 py-3 rounded-xl
                         hover:bg-opacity-90 transition-all duration-200
                         transform hover:scale-[1.02]"
              >
                Submit Answers
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
