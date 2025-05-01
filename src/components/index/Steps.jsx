
import React from 'react';
import { motion } from 'framer-motion';
import ResumeUpload from '../resume/ResumeUpload';
import ATSScore from '../resume/ATSScore';
import InterviewQuestions from '../interview/InterviewQuestions';
import ProcessingResults from '../interview/ProcessingResults';
import FeedbackSection from '../interview/FeedbackSection';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

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
  
  if (loading) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-12"
      >
        <div className="relative h-12 w-12 mb-4">
          <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
        </div>
        <p className="text-muted-foreground">Processing, please wait...</p>
        {processingStep && totalProcessingSteps && (
          <div className="w-full max-w-md mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span>Step {processingStep} of {totalProcessingSteps}</span>
              <span>{Math.round((processingStep / totalProcessingSteps) * 100)}%</span>
            </div>
            <Progress value={(processingStep / totalProcessingSteps) * 100} className="h-1.5" />
          </div>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
    >
      {step === 'upload' && (
        <ResumeUpload 
          onResumeProcessed={handleResumeProcessed} 
          setLoading={() => {}} 
        />
      )}
      
      {step === 'analysis' && atsScore !== null && (
        <ATSScore 
          score={atsScore} 
          onStartInterview={handleStartInterview} 
        />
      )}
      
      {step === 'interview' && (
        <InterviewQuestions 
          questions={interviewQuestions} 
          onComplete={handleInterviewComplete} 
        />
      )}
      
      {step === 'processing' && (
        <ProcessingResults 
          currentStep={processingStep}
          totalSteps={totalProcessingSteps}
          stepDescription={processingStepDescriptions[processingStep - 1]}
        />
      )}
      
      {step === 'feedback' && feedback && (
        <div className="space-y-6">
          <FeedbackSection 
            feedback={feedback} 
            score={feedback.overallScore} 
          />
          <motion.div 
            className="flex justify-center mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleFinishReview}
                className="flex items-center space-x-2"
              >
                <span>View All Results on Dashboard</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default Steps;
