import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import Spinner from '@/components/ui/Spinner';
import { toast } from 'sonner';
import Container from '@/components/layout/Container';
import Navbar from '@/components/layout/Navbar';
import { DashboardStats } from '@/components/dashboard/StatCards';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ResultsTabs from '@/components/dashboard/ResultsTabs';
import useTestResults from '@/hooks/useTestResults';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('interviews');
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { testResults, loading: resultsLoading, refreshResults } = useTestResults(user);
  const [loading, setLoading] = useState(true);

  // Effect to check if we just completed a test (coming from interview page)
  useEffect(() => {
    const justCompletedTest = location.state?.testCompleted;
    
    if (justCompletedTest) {
      toast.success("Test results saved successfully!");
      
      // If the results don't appear immediately, refresh them
      setTimeout(() => {
        refreshResults();
      }, 1000);
      
      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location, refreshResults]);

  useEffect(() => {
    if (user) {
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
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      <Navbar />
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
                <DashboardHeader />
                <DashboardStats testResults={testResults} />
              </div>
              
              <ResultsTabs 
                activeTab={activeTab} 
                setActiveTab={setActiveTab} 
                testResults={testResults} 
                resultsLoading={resultsLoading} 
              />
            </div>
          </div>
        </Container>
      </main>
      
      <DashboardFooter />
    </div>
  );
};

const DashboardFooter = () => {
  return (
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
  );
};

export default Dashboard;
