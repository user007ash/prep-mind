
import React from 'react';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../ui/Card';
import Progress from '../ui/Progress';

const ATSScore = ({ score, onStartInterview }) => {
  return (
    <Card className="w-full animate-slide-up">
      <CardHeader>
        <CardTitle>ATS Score Analysis</CardTitle>
        <CardDescription>
          Your resume has been analyzed by our AI
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-medium">ATS Compatibility Score</span>
            <span className="text-sm font-medium">{score}%</span>
          </div>
          <Progress value={score} />
        </div>
        
        <div className="space-y-4">
          <h4 className="text-sm font-semibold">Score Breakdown</h4>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <ScoreCard 
              title="Keywords" 
              score={calculateSubScore(score, 0.9)} 
              description="Relevant industry keywords"
            />
            <ScoreCard 
              title="Format" 
              score={calculateSubScore(score, 1.1)} 
              description="Resume structure and readability"
            />
            <ScoreCard 
              title="Content" 
              score={calculateSubScore(score, 1)} 
              description="Quality and relevance of content"
            />
          </div>
        </div>

        <div className="bg-secondary/50 rounded-lg p-4">
          <h4 className="font-medium mb-2">AI Recommendations</h4>
          <ul className="space-y-2 text-sm">
            {getRecommendations(score).map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 text-primary shrink-0 mt-0.5">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.75.75 0 00.736-.596L10.95 7.377a.75.75 0 00-1.474-.29L9.027 9H9z" clipRule="evenodd" />
                </svg>
                {rec}
              </li>
            ))}
          </ul>
        </div>
        
        <button
          onClick={onStartInterview}
          className="w-full bg-primary hover:bg-primary/90 text-white py-2.5 px-4 rounded-md transition-colors font-medium"
        >
          Begin Interview Preparation
        </button>
      </CardContent>
    </Card>
  );
};

const ScoreCard = ({ title, score, description }) => (
  <div className="p-4 rounded-lg bg-secondary/30">
    <div className="flex justify-between items-center mb-2">
      <span className="font-medium">{title}</span>
      <span className={`text-sm font-medium ${getScoreColor(score)}`}>
        {score}%
      </span>
    </div>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

// Helper function to calculate sub-scores with some variation
const calculateSubScore = (baseScore, factor) => {
  const variation = baseScore * factor;
  return Math.min(Math.max(Math.round(variation), 20), 100);
};

// Helper function to get color based on score
const getScoreColor = (score) => {
  if (score >= 80) return 'text-green-600';
  if (score >= 60) return 'text-amber-600';
  return 'text-red-600';
};

// Helper function to generate recommendations based on score
const getRecommendations = (score) => {
  if (score >= 80) {
    return [
      "Your resume is well-optimized for ATS systems.",
      "Consider adding more measurable achievements.",
      "Customize your resume for specific job descriptions."
    ];
  } else if (score >= 60) {
    return [
      "Add more industry-specific keywords to improve visibility.",
      "Structure your experience with bullet points for better readability.",
      "Include numbers and metrics to quantify your achievements."
    ];
  } else {
    return [
      "Reformatting is recommended to improve ATS compatibility.",
      "Add relevant skills and keywords from the job description.",
      "Use a simpler format with standard headings.",
      "Remove graphics, tables and complex formatting."
    ];
  }
};

export default ATSScore;
