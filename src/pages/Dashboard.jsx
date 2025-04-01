
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/layout/Container';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { useAuth } from '@/context/AuthContext';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import Spinner from '@/components/ui/Spinner';
import { LogOut, Home, User, Calendar, Search, Settings } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('interviews');
  const [testResults, setTestResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [resultsLoading, setResultsLoading] = useState(true);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  useEffect(() => {
    const fetchTestResults = async () => {
      if (!user) return;
      
      try {
        setResultsLoading(true);
        const { data, error } = await supabase
          .from('test_results')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
        
        if (error) throw error;
        
        setTestResults(data || []);
      } catch (error) {
        console.error("Error fetching test results:", error);
        toast.error("Failed to load your test results");
      } finally {
        setResultsLoading(false);
      }
    };

    if (user) {
      fetchTestResults();
      setLoading(false);
    }
  }, [user]);
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center">
          <Spinner size={12} className="text-primary" />
          <p className="mt-4 text-muted-foreground">Loading user data...</p>
        </div>
      </div>
    );
  }
  
  const mockResumes = [
    { id: 1, name: "Software_Engineer_Resume.pdf", uploadDate: "2023-05-15", atsScore: 82 },
    { id: 2, name: "Frontend_Developer.pdf", uploadDate: "2023-07-22", atsScore: 76 },
    { id: 3, name: "FullStack_2023.pdf", uploadDate: "2023-09-10", atsScore: 89 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <Container>
          <div className="flex items-center justify-between py-4">
            <Link to="/" className="flex items-center space-x-2">
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
            </Link>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center gap-2">
                <span className="hidden md:inline text-sm">Welcome, {user.name}!</span>
                <div className="h-8 w-8 rounded-full bg-primary/20 text-primary font-semibold flex items-center justify-center">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </div>
              </div>
              
              <Button variant="outline" size="sm" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Sign out</span>
              </Button>
            </div>
          </div>
        </Container>
      </div>
      
      <main className="py-12 pt-24">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="md:col-span-1">
              <UserProfileCard />
            </div>
            
            {/* Main Content */}
            <div className="md:col-span-3 space-y-8">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Dashboard</h2>
                  <Button className="pulse-animation" onClick={() => navigate('/index')}>
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
                    value={testResults.length > 0 
                      ? Math.round(testResults.reduce((acc, curr) => acc + (curr.ats_score || 0), 0) / testResults.length) + '%'
                      : "N/A"}
                    icon={<User className="h-6 w-6" />}
                  />
                  <StatCard 
                    title="Average Interview Score" 
                    value={testResults.length > 0 
                      ? Math.round(testResults.reduce((acc, curr) => acc + (curr.total_score || 0), 0) / testResults.length) + '%'
                      : "N/A"}
                    icon={<Calendar className="h-6 w-6" />}
                  />
                  <StatCard 
                    title="Tests Completed" 
                    value={testResults.length.toString()}
                    icon={<Search className="h-6 w-6" />}
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
                      <h3 className="text-lg font-medium mb-4">Interview Results</h3>
                      {resultsLoading ? (
                        <div className="flex justify-center py-8">
                          <Spinner size={8} className="text-primary" />
                        </div>
                      ) : testResults.length > 0 ? (
                        <div className="space-y-4">
                          {testResults.map(result => (
                            <div key={result.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                              <div className="mb-4 md:mb-0">
                                <h4 className="font-medium">Interview Result</h4>
                                <div className="flex items-center text-sm text-muted-foreground mt-1">
                                  <span>Date: {new Date(result.created_at).toLocaleDateString()}</span>
                                  {result.sentiment_analysis && (
                                    <>
                                      <span className="mx-2">•</span>
                                      <span>Sentiment: {result.sentiment_analysis}</span>
                                    </>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center space-x-4">
                                <div className="text-right">
                                  <div className="text-sm text-muted-foreground mb-1">Score</div>
                                  <div className="text-lg font-semibold">{result.total_score}%</div>
                                </div>
                                <Button variant="outline" size="sm">
                                  View Report
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <p>No test results yet. Take a test to see your performance!</p>
                          <Button className="mt-4" onClick={() => navigate('/index')}>
                            Start a New Interview
                          </Button>
                        </div>
                      )}
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
