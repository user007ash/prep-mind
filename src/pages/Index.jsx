
import React, { useState } from 'react';
import Container from '../components/layout/Container';
import Navbar from '../components/layout/Navbar';
import ResumeUpload from '../components/resume/ResumeUpload';
import ATSScore from '../components/resume/ATSScore';
import InterviewQuestions from '../components/interview/InterviewQuestions';
import FeedbackSection from '../components/interview/FeedbackSection';
import { toast } from 'sonner';

// Import AI utilities
import { analyzeResume, generateInterviewQuestions, analyzeInterviewAnswers } from '../utils/aiService';

const Index = () => {
  const [step, setStep] = useState('upload'); // upload, analysis, interview, feedback
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [feedback, setFeedback] = useState(null);

  const handleResumeProcessed = async (data) => {
    if (!data) {
      toast.error("Invalid resume data received. Please try again.");
      return;
    }
    
    setResumeData(data);
    
    try {
      setLoading(true);
      
      // Analyze the resume to get ATS score
      const analysis = await analyzeResume(data);
      
      if (!analysis || typeof analysis.atsScore !== 'number') {
        throw new Error("Failed to analyze resume. The ATS score calculation failed.");
      }
      
      setAtsScore(analysis.atsScore);
      
      // Generate interview questions based on resume
      const questions = await generateInterviewQuestions(data);
      
      if (!questions || !Array.isArray(questions) || questions.length === 0) {
        throw new Error("Failed to generate interview questions.");
      }
      
      setInterviewQuestions(questions);
      setStep('analysis');
    } catch (error) {
      console.error("Error processing resume:", error);
      toast.error(error.message || "An error occurred while analyzing your resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartInterview = () => {
    setStep('interview');
  };

  const handleInterviewComplete = async (answers) => {
    if (!answers || Object.keys(answers).length === 0) {
      toast.error("No answers provided. Please complete the interview.");
      return;
    }
    
    try {
      setLoading(true);
      
      // Analyze interview answers
      const result = await analyzeInterviewAnswers(interviewQuestions, answers);
      
      if (!result || typeof result.overallScore !== 'number') {
        throw new Error("Failed to analyze interview responses.");
      }
      
      setFeedback(result);
      setStep('feedback');
    } catch (error) {
      console.error("Error analyzing interview:", error);
      toast.error(error.message || "An error occurred while analyzing your interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const renderCurrentStep = () => {
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
            setLoading={setLoading} 
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
      case 'feedback':
        return feedback ? (
          <FeedbackSection 
            feedback={feedback} 
            score={feedback.overallScore} 
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <Navbar />
      
      <main className="pt-24 pb-16 min-h-screen">
        <Container>
          <div className="max-w-3xl mx-auto">
            <header className="text-center mb-10 animate-fade-in">
              <div className="inline-block px-3 py-1 mb-3 text-xs font-medium text-primary bg-primary/10 rounded-full">
                AI-Powered Interview Preparation
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
                PrepMind
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Elevate your interview skills with AI-powered resume analysis and personalized interview simulations.
              </p>
            </header>

            {renderCurrentStep()}
          </div>
        </Container>
      </main>
      
      <footer className="py-6 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <Container>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-3 h-3 text-primary"
                >
                  <path d="M12 2a5 5 0 0 1 5 5v14a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z"/>
                  <path d="M2 12h4"/>
                  <path d="M18 12h4"/>
                </svg>
              </div>
              <span className="text-sm font-medium">PrepMind</span>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} PrepMind. All rights reserved.
            </p>
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Index;
