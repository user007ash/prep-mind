
import React, { useState } from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/Card';
import Progress from '../ui/Progress';
import Button from '../ui/Button';

const FeedbackSection = ({ feedback, score }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedAnswer, setExpandedAnswer] = useState(null);

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
        
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 dark:border-gray-700">
          <div className="flex overflow-x-auto">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'overview' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'detailed' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('detailed')}
            >
              Detailed Analysis
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'communication' 
                  ? 'border-b-2 border-primary text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
              onClick={() => setActiveTab('communication')}
            >
              Communication
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="pt-4">
          {activeTab === 'overview' && (
            <div className="space-y-6">
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
            </div>
          )}
          
          {activeTab === 'detailed' && feedback.answerAnalysis && (
            <div className="space-y-6">
              <h3 className="text-xl font-medium mb-4">Question-by-Question Analysis</h3>
              
              <div className="space-y-4">
                {feedback.answerAnalysis.map((item, index) => (
                  <div 
                    key={index} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
                  >
                    <div 
                      className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-900 cursor-pointer"
                      onClick={() => setExpandedAnswer(expandedAnswer === index ? null : index)}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{item.question}</h4>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className={`font-semibold ${getScoreColorClass(item.score)}`}>
                          {item.score}%
                        </div>
                        <button className="p-1">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="none" 
                            stroke="currentColor" 
                            strokeWidth="2" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                            className={`transition-transform ${expandedAnswer === index ? 'rotate-180' : ''}`}
                          >
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    {expandedAnswer === index && (
                      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-muted-foreground mb-2">Your Answer:</h5>
                          <p className="text-sm bg-white/70 dark:bg-black/30 p-3 rounded">
                            {item.answer}
                          </p>
                        </div>
                        
                        <div className="mb-4">
                          <h5 className="text-sm font-medium text-muted-foreground mb-2">Feedback:</h5>
                          <p className="text-sm">{item.feedback}</p>
                        </div>
                        
                        {item.sentiment && (
                          <div>
                            <h5 className="text-sm font-medium text-muted-foreground mb-2">Speech Analysis:</h5>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div className="flex justify-between">
                                <span>Confidence:</span>
                                <span className="font-medium">{(item.sentiment.confidence * 100).toFixed(0)}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Clarity:</span>
                                <span className="font-medium">{(item.sentiment.clarity * 100).toFixed(0)}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Engagement:</span>
                                <span className="font-medium">{(item.sentiment.engagement * 100).toFixed(0)}%</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Filler Words:</span>
                                <span className="font-medium">{item.sentiment.fillerWordCount || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between col-span-2">
                                <span>Tone:</span>
                                <span className="font-medium">{item.sentiment.toneAnalysis || 'Not analyzed'}</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {activeTab === 'communication' && feedback.communicationFeedback && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <ScoreCard 
                  title="Confidence" 
                  score={feedback.confidenceScore || 0}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m9 14 6-6"></path>
                      <circle cx="14" cy="9" r="1"></circle>
                      <circle cx="10" cy="14" r="1"></circle>
                      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16l-3-2-2 2-2-2-2 2-2-2-3 2Z"></path>
                    </svg>
                  }
                />
                <ScoreCard 
                  title="Relevance" 
                  score={feedback.relevanceScore || 0}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m22 2-7 20-4-9-9-4Z"></path>
                      <path d="M22 2 11 13"></path>
                    </svg>
                  }
                />
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Communication Style Analysis</h3>
                
                <div className="space-y-3">
                  <div className="bg-white/30 dark:bg-black/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Tone</h4>
                    <p className="text-sm">{feedback.communicationFeedback.tone}</p>
                  </div>
                  
                  <div className="bg-white/30 dark:bg-black/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Pacing</h4>
                    <p className="text-sm">{feedback.communicationFeedback.pacing}</p>
                  </div>
                  
                  <div className="bg-white/30 dark:bg-black/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Clarity</h4>
                    <p className="text-sm">{feedback.communicationFeedback.clarity}</p>
                  </div>
                  
                  <div className="bg-white/30 dark:bg-black/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-2">Confidence</h4>
                    <p className="text-sm">{feedback.communicationFeedback.confidence}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-medium">Communication Improvements</h3>
                <p className="text-sm">{feedback.communicationFeedback.improvements}</p>
              </div>
              
              <div className="mt-8 bg-primary/10 p-4 rounded-lg">
                <h3 className="font-medium mb-2">Speaking Tips</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                    <span>Practice speaking at a moderate pace, not too fast or too slow.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                    <span>Reduce filler words like "um," "uh," and "like."</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                    <span>Use the STAR method (Situation, Task, Action, Result) for behavioral questions.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary mt-0.5">
                      <path d="M5 12h14"></path>
                      <path d="M12 5v14"></path>
                    </svg>
                    <span>Vary your vocal tone to maintain engagement and avoid monotony.</span>
                  </li>
                </ul>
              </div>
            </div>
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
