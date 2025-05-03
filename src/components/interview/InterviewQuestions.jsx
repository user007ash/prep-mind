
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import VoiceRecorder from './VoiceRecorder';
import QuestionProgress from './QuestionProgress';
import { toast } from 'sonner';

const InterviewQuestions = ({ questions, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerRecorded = (transcription, sentimentData) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: {
        answer: transcription,
        sentiment: sentimentData
      }
    }));
    setIsRecording(false);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsCompleted(true);
    }
  };

  const handleSkipQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      toast.info("Question skipped");
    } else {
      setIsCompleted(true);
    }
  };

  const handleSubmit = () => {
    // Modified to allow submission even with skipped questions
    const answeredQuestions = Object.keys(answers).length;
    
    if (answeredQuestions === 0) {
      toast.warning("Please answer at least one question before submitting");
      return;
    }
    
    if (answeredQuestions < questions.length) {
      // Inform the user about skipped questions but allow submission
      toast.info(`You've skipped ${questions.length - answeredQuestions} questions`);
    }
    
    onComplete(answers);
  };

  const handleReRecord = () => {
    setAnswers(prev => {
      const newAnswers = {...prev};
      delete newAnswers[currentQuestion];
      return newAnswers;
    });
  };

  return (
    <Card className="w-full animate-slide-up">
      <CardHeader>
        <CardTitle>Interview Simulation</CardTitle>
        <CardDescription>
          Answer the questions as you would in a real interview
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <QuestionProgress 
          currentQuestionIndex={currentQuestionIndex} 
          totalQuestions={questions.length} 
        />
        
        <div className="p-5 rounded-lg bg-secondary/50">
          <h3 className="text-xl font-semibold mb-2">{currentQuestion}</h3>
          
          {answers[currentQuestion] && (
            <div className="mt-4 p-3 bg-white/50 rounded-md">
              <p className="text-sm">{answers[currentQuestion].answer}</p>
            </div>
          )}
        </div>

        {!isRecording && !answers[currentQuestion] ? (
          <div className="flex justify-center space-x-3">
            <Button
              variant="default"
              size="lg"
              className="pulse-animation"
              onClick={() => setIsRecording(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path>
                <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
                <line x1="12" x2="12" y1="19" y2="22"></line>
              </svg>
              Begin Speaking
            </Button>
            <Button
              variant="outline"
              onClick={handleSkipQuestion}
            >
              Skip Question
            </Button>
          </div>
        ) : isRecording ? (
          <VoiceRecorder onRecordingComplete={handleAnswerRecorded} />
        ) : (
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline"
              onClick={handleReRecord}
            >
              Re-record
            </Button>
            <Button onClick={handleNext}>
              {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Complete Interview"}
            </Button>
          </div>
        )}
        
        {isCompleted && (
          <div className="mt-6 text-center">
            <h3 className="font-medium text-xl mb-3">Interview Completed!</h3>
            <p className="text-muted-foreground mb-4">
              You've answered {Object.keys(answers).length} out of {questions.length} questions. Submit your responses to get feedback.
            </p>
            <Button onClick={handleSubmit} size="lg">
              Get Feedback
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="justify-between border-t pt-6">
        <div className="text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          AI Interviewer
        </div>
      </CardFooter>
    </Card>
  );
};

export default InterviewQuestions;
