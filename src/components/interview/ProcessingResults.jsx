
import React from 'react';
import Spinner from '../ui/Spinner';
import { Progress } from '../ui/progress';

const ProcessingResults = ({ currentStep, totalSteps, stepDescription }) => {
  // Calculate progress percentage
  const progressPercentage = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-sm max-w-3xl mx-auto animate-fade-in">
      <div className="w-16 h-16 mb-6 flex items-center justify-center">
        <Spinner size={12} className="text-primary" />
      </div>
      
      <h2 className="text-2xl font-semibold mb-3">Processing Your Interview Results</h2>
      <p className="text-muted-foreground mb-6 text-center">
        Please wait while our AI analyzes your responses. This may take a minute.
      </p>
      
      <div className="w-full mb-2">
        <Progress value={progressPercentage} className="h-2" />
      </div>
      
      <div className="flex justify-between w-full text-sm text-muted-foreground mb-6">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>{progressPercentage}%</span>
      </div>
      
      <div className="p-4 bg-primary/10 rounded-lg text-center">
        <p className="text-primary font-medium">{stepDescription}</p>
      </div>
    </div>
  );
};

export default ProcessingResults;
