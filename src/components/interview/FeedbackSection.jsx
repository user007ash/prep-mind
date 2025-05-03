
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from '../ui/Card';
import { Button } from '../ui/Button';
import FeedbackHeader from './feedback/FeedbackHeader';
import FeedbackTabs from './feedback/FeedbackTabs';
import FeedbackOverview from './feedback/FeedbackOverview';
import DetailedAnalysis from './feedback/DetailedAnalysis';
import CommunicationAnalysis from './feedback/CommunicationAnalysis';

const FeedbackSection = ({ feedback, score }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <Card className="w-full animate-slide-up">
      <CardHeader>
        <CardTitle>Interview Feedback</CardTitle>
        <CardDescription>
          AI analysis of your interview performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FeedbackHeader score={score} />
        
        {/* Tabs Navigation */}
        <FeedbackTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        
        {/* Tab Content */}
        <div className="pt-4">
          {activeTab === 'overview' && <FeedbackOverview feedback={feedback} />}
          
          {activeTab === 'detailed' && feedback.answerAnalysis && (
            <DetailedAnalysis answerAnalysis={feedback.answerAnalysis} />
          )}
          
          {activeTab === 'communication' && feedback.communicationFeedback && (
            <CommunicationAnalysis feedback={feedback} />
          )}
        </div>
        
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download Complete Report
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FeedbackSection;
