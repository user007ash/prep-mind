
import React from 'react';
import { Button } from '../ui/button';
import Spinner from '../ui/Spinner';
import { useNavigate } from 'react-router-dom';
import { Progress } from '../ui/progress';

const TestResultsList = ({ activeTab, testResults, resultsLoading }) => {
  const navigate = useNavigate();
  
  if (activeTab === 'interviews') {
    return (
      <div>
        <h3 className="text-lg font-medium mb-4">Interview Results</h3>
        {resultsLoading ? (
          <div className="flex justify-center py-8">
            <Spinner size={8} className="text-primary" />
          </div>
        ) : testResults.length > 0 ? (
          <div className="space-y-4">
            {testResults.map(result => (
              <div key={result.id} className="flex flex-col p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                  <div>
                    <h4 className="font-medium">Interview Result</h4>
                    <div className="flex flex-wrap items-center text-sm text-muted-foreground mt-1 gap-2">
                      <span>Date: {new Date(result.created_at).toLocaleDateString()}</span>
                      {result.sentiment_analysis && (
                        <>
                          <span className="inline-block h-1 w-1 rounded-full bg-gray-300"></span>
                          <span className="px-2 py-0.5 rounded bg-primary/10 text-primary text-xs font-medium">
                            {result.sentiment_analysis}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-4 md:mt-0">
                    <div className="text-right">
                      <div className="text-sm text-muted-foreground mb-1">Score</div>
                      <div className="text-lg font-semibold">{result.total_score}%</div>
                    </div>
                    <Button variant="outline" size="sm">
                      View Report
                    </Button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                  <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">ATS Compatibility</span>
                      <span className="text-sm font-medium">{result.ats_score || 'N/A'}%</span>
                    </div>
                    {result.ats_score && (
                      <Progress value={result.ats_score} className="h-1.5" />
                    )}
                  </div>
                  
                  <div className="bg-white dark:bg-gray-800 p-3 rounded border border-gray-100 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium">Interview Score</span>
                      <span className="text-sm font-medium">{result.total_score || 'N/A'}%</span>
                    </div>
                    {result.total_score && (
                      <Progress value={result.total_score} className="h-1.5" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
            <p className="mb-4">No interview results yet. Take your first interview to see your performance!</p>
            <Button onClick={() => navigate('/index')}>
              Start a New Interview
            </Button>
          </div>
        )}
      </div>
    );
  } else {
    return <ResumeResults navigate={navigate} />;
  }
};

const ResumeResults = ({ navigate }) => {
  const mockResumes = [
    { id: 1, name: "Software_Engineer_Resume.pdf", uploadDate: "2023-05-15", atsScore: 82 },
    { id: 2, name: "Frontend_Developer.pdf", uploadDate: "2023-07-22", atsScore: 76 },
    { id: 3, name: "FullStack_2023.pdf", uploadDate: "2023-09-10", atsScore: 89 }
  ];
  
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Your Resumes</h3>
      {mockResumes.length > 0 ? (
        <div className="space-y-4">
          {mockResumes.map(resume => (
            <div key={resume.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <div className="mb-4 md:mb-0">
                <h4 className="font-medium">{resume.name}</h4>
                <div className="text-sm text-muted-foreground mt-1">
                  Uploaded on {resume.uploadDate}
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm text-muted-foreground mb-1">ATS Score</div>
                  <div className="text-lg font-semibold">{resume.atsScore}%</div>
                </div>
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-muted-foreground bg-gray-50 dark:bg-gray-900 rounded-lg p-6">
          <p className="mb-4">You haven't uploaded any resumes yet. Upload your first resume to see its ATS score!</p>
          <Button onClick={() => navigate('/index')}>
            Upload a Resume
          </Button>
        </div>
      )}
    </div>
  );
};

export default TestResultsList;
