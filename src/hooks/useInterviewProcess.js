
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  analyzeResume,
  generateInterviewQuestions,
  analyzeInterviewAnswers
} from '../utils/ai';

/**
 * Custom hook to manage the interview process state and logic
 * @param {Object} user - The current user object
 * @returns {Object} - Interview process state and handlers
 */
const useInterviewProcess = (user) => {
  const [step, setStep] = useState('upload');
  const [loading, setLoading] = useState(false);
  const [resumeData, setResumeData] = useState(null);
  const [atsScore, setAtsScore] = useState(null);
  const [interviewQuestions, setInterviewQuestions] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [processingStep, setProcessingStep] = useState(1);
  
  const navigate = useNavigate();

  const totalProcessingSteps = 3;
  const processingStepDescriptions = [
    "Transcribing your answers...",
    "Analyzing response quality and content...",
    "Generating personalized feedback..."
  ];

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
      
      console.log("Generated interview questions:", questions);
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
    if (interviewQuestions.length === 0) {
      // Generate fallback questions if none were generated
      const fallbackQuestions = [
        "Tell me about yourself and your background.",
        "What are your greatest professional strengths?",
        "What do you consider to be your weaknesses?",
        "Why are you interested in this position?",
        "Where do you see yourself in 5 years?",
        "What is your greatest professional achievement?",
        "Describe a difficult work situation and how you overcame it.",
        "How do you handle work pressure and tight deadlines?",
        "What's your approach to working in a team?",
        "Do you have any questions for me?"
      ];
      setInterviewQuestions(fallbackQuestions);
      toast.info("Using general interview questions.");
    }
    
    setStep('interview');
  };

  const handleInterviewComplete = async (answers) => {
    if (!answers || Object.keys(answers).length === 0) {
      toast.error("No answers provided. Please answer at least one question before submitting.");
      return;
    }
    
    try {
      setStep('processing');
      setProcessingStep(1);
      
      // Simulate processing steps with timeouts
      const processStepWithDelay = async () => {
        // Step 1: Transcribe (already done in real-time)
        await new Promise(resolve => setTimeout(resolve, 2000));
        setProcessingStep(2);
        
        // Step 2: Analyze responses
        await new Promise(resolve => setTimeout(resolve, 3000));
        setProcessingStep(3);
        
        // Step 3: Generate feedback
        const result = await analyzeInterviewAnswers(interviewQuestions, answers);
        
        if (!result || typeof result.overallScore !== 'number') {
          throw new Error("Failed to analyze interview responses.");
        }
        
        // Save results to Supabase
        if (user) {
          try {
            // Calculate completion percentage
            const completionPercentage = Math.round((Object.keys(answers).length / interviewQuestions.length) * 100);
            
            // Insert the test result into the database
            const { error } = await supabase
              .from('test_results')
              .insert({
                user_id: user.id,
                ats_score: atsScore,
                total_score: result.overallScore,
                sentiment_analysis: result.communicationFeedback?.tone || "Professional",
                feedback: JSON.stringify({
                  ...result,
                  completionRate: completionPercentage,
                  skippedQuestions: interviewQuestions.length - Object.keys(answers).length
                })
              });
            
            if (error) throw error;
            
            if (completionPercentage < 100) {
              toast.success(`Results saved! You completed ${completionPercentage}% of questions.`);
            } else {
              toast.success("Your results have been saved!");
            }
          } catch (saveError) {
            console.error("Error saving test results:", saveError);
            toast.error("Failed to save your results, but you can still view your feedback.");
          }
        }
        
        setFeedback(result);
        setStep('feedback');
      };
      
      processStepWithDelay();
    } catch (error) {
      console.error("Error analyzing interview:", error);
      toast.error(error.message || "An error occurred while analyzing your interview. Please try again.");
      setStep('interview');
    }
  };

  const handleFinishReview = () => {
    // Navigate to dashboard with state to trigger refresh
    navigate('/dashboard', { 
      state: { 
        testCompleted: true,
        testScore: feedback?.overallScore,
        atsScore: atsScore
      } 
    });
  };

  return {
    step,
    loading,
    setLoading,
    resumeData,
    atsScore,
    interviewQuestions,
    feedback,
    processingStep,
    totalProcessingSteps,
    processingStepDescriptions,
    handleResumeProcessed,
    handleStartInterview,
    handleInterviewComplete,
    handleFinishReview
  };
};

export default useInterviewProcess;
