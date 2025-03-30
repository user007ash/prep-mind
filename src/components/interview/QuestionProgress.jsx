
import React from 'react';

const QuestionProgress = ({ currentQuestionIndex, totalQuestions }) => {
  const percentage = Math.round((currentQuestionIndex / totalQuestions) * 100);
  
  return (
    <div className="flex justify-between text-sm mb-4">
      <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span>
      <span className="text-primary font-medium">
        {percentage}% Complete
      </span>
    </div>
  );
};

export default QuestionProgress;
