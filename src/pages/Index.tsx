
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui';
import { useAuth } from '@/context/AuthContext';
import Navbar from '../components/layout/Navbar';
import Container from '../components/layout/Container';
import IntroHeader from '../components/index/IntroHeader';
import Steps from '../components/index/Steps';
import PageFooter from '../components/index/PageFooter';
import useInterviewProcess from '../hooks/useInterviewProcess';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const {
    step,
    loading,
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
  } = useInterviewProcess(user);

  React.useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please sign in to continue",
      });
      navigate('/login', { state: { from: '/index' } });
    }
  }, [user, navigate]);

  if (!user) {
    return null; // Don't render anything while redirecting
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <Navbar />
      
      <main className="pt-24 pb-16 min-h-screen">
        <Container>
          <div className="max-w-3xl mx-auto">
            <IntroHeader />

            <Steps
              step={step}
              loading={loading}
              handleResumeProcessed={handleResumeProcessed}
              handleStartInterview={handleStartInterview}
              handleInterviewComplete={handleInterviewComplete}
              handleFinishReview={handleFinishReview}
              atsScore={atsScore}
              interviewQuestions={interviewQuestions}
              processingStep={processingStep}
              totalProcessingSteps={totalProcessingSteps}
              processingStepDescriptions={processingStepDescriptions}
              feedback={feedback}
            />
          </div>
        </Container>
      </main>
      
      <PageFooter />
    </div>
  );
};

export default Index;
