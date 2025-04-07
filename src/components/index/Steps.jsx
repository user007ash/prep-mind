
import React from 'react';
import ResumeUpload from '../resume/ResumeUpload';
import ATSScore from '../resume/ATSScore';
import InterviewQuestions from '../interview/InterviewQuestions';
import ProcessingResults from '../interview/ProcessingResults';
import FeedbackSection from '../interview/FeedbackSection';
import { useNavigate } from 'react-router-dom';

const Steps = ({ 
  step, 
  loading, 
  handleResumeProcessed, 
  handleStartInterview,
  handleInterviewComplete,
  handleFinishReview,
  atsScore, 
  interviewQuestions,
  processingStep,
  totalProcessingSteps,
  processingStepDescriptions,
  feedback
}) => {
  const navigate = useNavigate();
  
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12 animate-pulse-soft">
        <div className="relative h-12 w-12 mb-4">
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        </div>
        <p className="text-muted-foreground">Processing, please wait...</p>
      </div>
    );
  }

  switch (step) {
    case 'upload':
      return (
        <ResumeUpload 
          onResumeProcessed={handleResumeProcessed} 
          setLoading={() => {}} 
        />
      );
    case 'analysis':
      return atsScore !== null ? (
        <ATSScore 
          score={atsScore} 
          onStartInterview={handleStartInterview} 
        />
      ) : null;
    case 'interview':
      return (
        <InterviewQuestions 
          questions={interviewQuestions} 
          onComplete={handleInterviewComplete} 
        />
      );
    case 'processing':
      return (
        <ProcessingResults 
          currentStep={processingStep}
          totalSteps={totalProcessingSteps}
          stepDescription={processingStepDescriptions[processingStep - 1]}
        />
      );
    case 'feedback':
      return feedback ? (
        <div className="space-y-6">
          <FeedbackSection 
            feedback={feedback} 
            score={feedback.overallScore} 
          />
          <div className="flex justify-center mt-8">
            <button
              onClick={handleFinishReview}
              className="bg-primary hover:bg-primary/90 text-white py-2.5 px-6 rounded-md transition-colors font-medium flex items-center space-x-2"
            >
              <span>View All Results on Dashboard</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
            </button>
          </div>
        </div>
      ) : null;
    default:
      return null;
  }
};

export default Steps;
