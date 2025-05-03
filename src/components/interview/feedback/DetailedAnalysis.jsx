
import React, { useState } from 'react';

const DetailedAnalysis = ({ answerAnalysis }) => {
  const [expandedAnswer, setExpandedAnswer] = useState(null);
  
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-medium mb-4">Question-by-Question Analysis</h3>
      
      <div className="space-y-4">
        {answerAnalysis && answerAnalysis.map((item, index) => (
          <div 
            key={index} 
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <div 
              className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 cursor-pointer"
              onClick={() => setExpandedAnswer(expandedAnswer === index ? null : index)}
            >
              <div className="flex-1">
                <h4 className="font-medium">{item.question}</h4>
              </div>
              <div className="flex items-center space-x-4">
                <div className={`font-semibold ${getScoreColorClass(item.score)}`}>
                  {item.score}%
                </div>
                <button className="p-1">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    className={`transition-transform ${expandedAnswer === index ? 'rotate-180' : ''}`}
                  >
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>
              </div>
            </div>
            
            {expandedAnswer === index && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">Your Answer:</h5>
                  <p className="text-sm bg-white/70 dark:bg-black/30 p-3 rounded">
                    {item.answer}
                  </p>
                </div>
                
                <div className="mb-4">
                  <h5 className="text-sm font-medium text-muted-foreground mb-2">Feedback:</h5>
                  <p className="text-sm">{item.feedback}</p>
                </div>
                
                {item.sentiment && (
                  <div>
                    <h5 className="text-sm font-medium text-muted-foreground mb-2">Speech Analysis:</h5>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex justify-between">
                        <span>Confidence:</span>
                        <span className="font-medium">{(item.sentiment.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Clarity:</span>
                        <span className="font-medium">{(item.sentiment.clarity * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Engagement:</span>
                        <span className="font-medium">{(item.sentiment.engagement * 100).toFixed(0)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Filler Words:</span>
                        <span className="font-medium">{item.sentiment.fillerWordCount || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between col-span-2">
                        <span>Tone:</span>
                        <span className="font-medium">{item.sentiment.toneAnalysis || 'Not analyzed'}</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper function for styling based on score
const getScoreColorClass = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

export default DetailedAnalysis;
