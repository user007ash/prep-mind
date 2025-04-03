
import React from 'react';
import ScoreCard from './ScoreCard';

const CommunicationAnalysis = ({ feedback }) => {
  const communicationFeedback = feedback.communicationFeedback || {};
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <ScoreCard 
          title="Confidence" 
          score={feedback.confidenceScore || 0}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m9 14 6-6"></path>
              <circle cx="14" cy="9" r="1"></circle>
              <circle cx="10" cy="14" r="1"></circle>
              <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-3-2-2 2-2-2-2 2-2-2-3 2Z"></path>
            </svg>
          }
        />
        <ScoreCard 
          title="Relevance" 
          score={feedback.relevanceScore || 0}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m22 2-7 20-4-9-9-4Z"></path>
              <path d="M22 2 11 13"></path>
            </svg>
          }
        />
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-medium">Communication Style Analysis</h3>
        
        <div className="space-y-3">
          <div className="bg-white/30 dark:bg-black/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Tone</h4>
            <p className="text-sm">{communicationFeedback.tone}</p>
          </div>
          
          <div className="bg-white/30 dark:bg-black/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Pacing</h4>
            <p className="text-sm">{communicationFeedback.pacing}</p>
          </div>
          
          <div className="bg-white/30 dark:bg-black/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Clarity</h4>
            <p className="text-sm">{communicationFeedback.clarity}</p>
          </div>
          
          <div className="bg-white/30 dark:bg-black/30 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Confidence</h4>
            <p className="text-sm">{communicationFeedback.confidence}</p>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <h3 className="text-xl font-medium">Communication Improvements</h3>
        <p className="text-sm">{communicationFeedback.improvements}</p>
      </div>
      
      <div className="mt-8 bg-primary/10 p-4 rounded-lg">
        <h3 className="font-medium mb-2">Speaking Tips</h3>
        <ul className="space-y-2 text-sm">
          <li className="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <span>Practice speaking at a moderate pace, not too fast or too slow.</span>
          </li>
          <li className="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <span>Reduce filler words like "um," "uh," and "like."</span>
          </li>
          <li className="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <span>Use the STAR method (Situation, Task, Action, Result) for behavioral questions.</span>
          </li>
          <li className="flex items-start gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
              <path d="M5 12h14"></path>
              <path d="M12 5v14"></path>
            </svg>
            <span>Vary your vocal tone to maintain engagement and avoid monotony.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CommunicationAnalysis;
