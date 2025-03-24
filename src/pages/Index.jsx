
import React, { useState } from 'react';
import Container from '../components/layout/Container';
import ResumeUpload from '../components/resume/ResumeUpload';
import ATSScore from '../components/resume/ATSScore';
import InterviewQuestions from '../components/interview/InterviewQuestions';
import FeedbackSection from '../components/interview/FeedbackSection';

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
    setResumeData(data);
    
    try {
      setLoading(true);
      // Analyze the resume to get ATS score
      const analysis = await analyzeResume(data);
      setAtsScore(analysis.atsScore);
      
      // Generate interview questions based on resume
      const questions = await generateInterviewQuestions(data);
      setInterviewQuestions(questions);
      
      setStep('analysis');
    } catch (error) {
      console.error("Error processing resume:", error);
      alert("An error occurred while analyzing your resume. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleStartInterview = () => {
    setStep('interview');
  };

  const handleInterviewComplete = async (answers) => {
    try {
      setLoading(true);
      // Analyze interview answers
      const result = await analyzeInterviewAnswers(interviewQuestions, answers);
      setFeedback(result);
      setStep('feedback');
    } catch (error) {
      console.error("Error analyzing interview:", error);
      alert("An error occurred while analyzing your interview. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
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

          {loading && (
            <div className="flex flex-col items-center justify-center py-12 animate-pulse-soft">
              <div className="relative h-12 w-12 mb-4">
                <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
              </div>
              <p className="text-muted-foreground">Processing, please wait...</p>
            </div>
          )}

          {!loading && step === 'upload' && (
            <ResumeUpload 
              onResumeProcessed={handleResumeProcessed} 
              setLoading={setLoading} 
            />
          )}

          {!loading && step === 'analysis' && atsScore !== null && (
            <ATSScore 
              score={atsScore} 
              onStartInterview={handleStartInterview} 
            />
          )}

          {!loading && step === 'interview' && (
            <InterviewQuestions 
              questions={interviewQuestions} 
              onComplete={handleInterviewComplete} 
            />
          )}

          {!loading && step === 'feedback' && feedback && (
            <FeedbackSection 
              feedback={feedback} 
              score={feedback.overallScore} 
            />
          )}
        </div>
      </Container>
    </main>
  );
};

export default Index;
