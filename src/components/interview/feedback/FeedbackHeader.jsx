
import React from 'react';
import { getScoreColorClass, getScoreBackgroundClass } from './ScoreCard';

const FeedbackHeader = ({ score }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-medium">Overall Score</h3>
        <div className="flex items-center">
          <div className={`text-2xl font-bold ${getScoreColorClass(score)}`}>
            {score}%
          </div>
        </div>
      </div>
      
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getScoreBackgroundClass(score)}`}
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default FeedbackHeader;
