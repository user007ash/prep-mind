
import React from 'react';

const ScoreCard = ({ title, score, icon }) => {
  return (
    <div className="p-4 rounded-lg bg-white/40 dark:bg-black/40 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-start gap-3">
        <div className="text-primary/70">{icon}</div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{title}</h4>
            <span className={`text-sm font-semibold ${getScoreColorClass(score)}`}>
              {score}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getScoreBackgroundClass(score)}`} 
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for styling based on score
export const getScoreColorClass = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

export const getScoreBackgroundClass = (score) => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
};

export default ScoreCard;
