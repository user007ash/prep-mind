
import React, { useState } from 'react';
import Container from '../components/layout/Container';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Progress from '../components/ui/Progress';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('interviews');
  
  const mockUser = {
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "Software Engineer",
    joinDate: "March 2023",
    resumeCount: 3,
    interviewCount: 5
  };
  
  const mockResumes = [
    { id: 1, name: "Software_Engineer_Resume.pdf", uploadDate: "2023-05-15", atsScore: 82 },
    { id: 2, name: "Jane_Smith_Frontend.pdf", uploadDate: "2023-07-22", atsScore: 76 },
    { id: 3, name: "JS_FullStack_2023.pdf", uploadDate: "2023-09-10", atsScore: 89 }
  ];
  
  const mockInterviews = [
    { 
      id: 1, 
      date: "2023-05-20", 
      position: "Frontend Developer", 
      company: "Tech Solutions Inc.", 
      score: 84,
      questionCount: 8
    },
    { 
      id: 2, 
      date: "2023-08-05", 
      position: "Full Stack Engineer", 
      company: "Innovation Labs", 
      score: 78,
      questionCount: 10
    },
    { 
      id: 3, 
      date: "2023-09-12", 
      position: "React Developer", 
      company: "Creative Digital", 
      score: 91,
      questionCount: 7
    },
    { 
      id: 4, 
      date: "2023-10-18", 
      position: "Software Engineer", 
      company: "Global Tech Co.", 
      score: 86,
      questionCount: 9
    },
    { 
      id: 5, 
      date: "2023-12-03", 
      position: "UI/UX Developer", 
      company: "Design Solutions", 
      score: 82,
      questionCount: 6
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <Container>
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  className="w-4 h-4 text-primary"
                >
                  <path d="M12 2a5 5 0 0 1 5 5v14a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z"/>
                  <path d="M2 12h4"/>
                  <path d="M18 12h4"/>
                </svg>
              </div>
              <span className="text-xl font-bold">PrepMind</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path>
                </svg>
                Notifications
              </Button>
              
              <div className="h-8 w-8 rounded-full bg-primary/20 text-primary font-semibold flex items-center justify-center">
                JS
              </div>
            </div>
          </div>
        </Container>
      </div>
      
      <main className="py-12">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 sticky top-24">
                <div className="flex flex-col items-center text-center mb-6">
                  <div className="h-24 w-24 rounded-full bg-primary/10 text-primary text-2xl font-bold flex items-center justify-center mb-4">
                    {mockUser.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <h2 className="text-xl font-semibold">{mockUser.name}</h2>
                  <p className="text-sm text-muted-foreground">{mockUser.email}</p>
                  <p className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full mt-2">{mockUser.role}</p>
                </div>
                
                <div className="space-y-4 border-t border-gray-100 dark:border-gray-700 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Joined</span>
                    <span className="text-sm font-medium">{mockUser.joinDate}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Resumes</span>
                    <span className="text-sm font-medium">{mockUser.resumeCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Interviews</span>
                    <span className="text-sm font-medium">{mockUser.interviewCount}</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <Button variant="outline" className="w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3 space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Dashboard</h2>
                  <Button className="pulse-animation">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M12 5v14"></path>
                      <path d="M5 12h14"></path>
                    </svg>
                    New Interview
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <StatCard 
                    title="Average ATS Score" 
                    value="82%"
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
                  <StatCard 
                    title="Average Interview Score" 
                    value="84%"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                      </svg>
                    }
                  />
                  <StatCard 
                    title="Questions Answered" 
                    value="40"
                    icon={
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                      </svg>
                    }
                  />
                </div>
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                <div className="border-b border-gray-100 dark:border-gray-700">
                  <div className="flex">
                    <button
                      className={`px-6 py-4 text-sm font-medium ${
                        activeTab === 'interviews' 
                          ? 'border-b-2 border-primary text-primary' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setActiveTab('interviews')}
                    >
                      Interviews
                    </button>
                    <button
                      className={`px-6 py-4 text-sm font-medium ${
                        activeTab === 'resumes' 
                          ? 'border-b-2 border-primary text-primary' 
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                      onClick={() => setActiveTab('resumes')}
                    >
                      Resumes
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  {activeTab === 'interviews' ? (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Recent Interviews</h3>
                      <div className="space-y-4">
                        {mockInterviews.map(interview => (
                          <div key={interview.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                            <div className="mb-4 md:mb-0">
                              <h4 className="font-medium">{interview.position}</h4>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <span>{interview.company}</span>
                                <span className="mx-2">•</span>
                                <span>{interview.date}</span>
                                <span className="mx-2">•</span>
                                <span>{interview.questionCount} questions</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <div className="text-right">
                                <div className="text-sm text-muted-foreground mb-1">Score</div>
                                <div className="text-lg font-semibold">{interview.score}%</div>
                              </div>
                              <Button variant="outline" size="sm">
                                View Report
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-lg font-medium mb-4">Your Resumes</h3>
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
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </main>
      
      <footer className="py-6 mt-12 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
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

const StatCard = ({ title, value, icon }) => {
  return (
    <div className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-700">
      <div className="flex items-start gap-4">
        <div className="p-2 rounded-md bg-primary/10 text-primary">
          {icon}
        </div>
        <div>
          <h3 className="text-sm text-muted-foreground">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
