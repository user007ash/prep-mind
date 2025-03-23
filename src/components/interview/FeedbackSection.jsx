
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/Card';

const FeedbackSection = ({ feedback, score }) => {
  return (
    <Card className="w-full animate-slide-up">
      <CardHeader>
        <CardTitle>Interview Feedback</CardTitle>
        <CardDescription>
          AI analysis of your interview performance
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-medium">Overall Score</h3>
          <div className="flex items-center">
            <div className={`text-2xl font-bold ${getScoreColorClass(score)}`}>
              {score}%
            </div>
          </div>
        </div>
        
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <div 
            className={`h-full ${getScoreBackgroundClass(score)}`}
            style={{ width: `${score}%` }}
          ></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
          <ScoreCard 
            title="Content" 
            score={feedback.contentScore || 0}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            }
          />
          <ScoreCard 
            title="Sentiment" 
            score={feedback.sentimentScore || 0}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                <line x1="9" y1="9" x2="9.01" y2="9"></line>
                <line x1="15" y1="9" x2="15.01" y2="9"></line>
              </svg>
            }
          />
          <ScoreCard 
            title="Clarity" 
            score={feedback.clarityScore || 0}
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9"></path>
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
              </svg>
            }
          />
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Strengths</h3>
          <ul className="space-y-2">
            {feedback.strengths && feedback.strengths.map((strength, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-green-500 shrink-0 mt-0.5">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                </svg>
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-medium">Areas for Improvement</h3>
          <ul className="space-y-2">
            {feedback.improvements && feedback.improvements.map((improvement, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-amber-500 shrink-0 mt-0.5">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                </svg>
                <span>{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <div className="bg-secondary/50 rounded-lg p-4 mt-4">
          <h3 className="font-medium mb-2">Overall Feedback</h3>
          <p className="text-sm">{feedback.overall}</p>
        </div>
      </CardContent>
    </Card>
  );
};

const ScoreCard = ({ title, score, icon }) => {
  return (
    <div className="p-4 rounded-lg bg-white/40 dark:bg-black/40 shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-start gap-3">
        <div className="text-primary/70">{icon}</div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium">{title}</h4>
            <span className={`text-sm font-semibold ${getScoreColorClass(score)}`}>
              {score}%
            </span>
          </div>
          <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
            <div 
              className={`h-full ${getScoreBackgroundClass(score)}`} 
              style={{ width: `${score}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper functions for styling based on score
const getScoreColorClass = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

const getScoreBackgroundClass = (score) => {
  if (score >= 80) return 'bg-green-500';
  if (score >= 60) return 'bg-amber-500';
  return 'bg-red-500';
};

export default FeedbackSection;
