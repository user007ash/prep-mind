
import React from 'react';

const ProcessingStatus = ({ processingStatus, transcript }) => {
  return (
    <div className="flex flex-col items-center p-6 rounded-lg bg-white/30 dark:bg-black/30 shadow-sm">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
          <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
          <line x1="12" x2="12" y1="19" y2="22"></line>
        </svg>
      </div>
      
      <div className="text-lg font-medium mb-2">
        Processing Your Answer
      </div>
      
      <div className="text-center max-w-md mb-6">
        <p className="text-sm text-muted-foreground">
          {processingStatus || "Analyzing your response..."}
        </p>
      </div>
      
      {!transcript && (
        <div className="flex items-center space-x-3">
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100"></div>
          <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200"></div>
        </div>
      )}
      
      {transcript && (
        <div className="w-full p-4 bg-white/50 dark:bg-black/20 rounded-lg mt-2">
          <p className="text-sm italic">{transcript}</p>
        </div>
      )}
    </div>
  );
};

export default ProcessingStatus;
