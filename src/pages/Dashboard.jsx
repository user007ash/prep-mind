
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import UserProfileCard from '@/components/dashboard/UserProfileCard';
import Spinner from '@/components/ui/Spinner';
import { toast } from 'sonner';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/StatCards';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import ResultsTabs from '@/components/dashboard/ResultsTabs';
import useTestResults from '@/hooks/useTestResults';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('interviews');
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { testResults, loading: resultsLoading } = useTestResults(user);
  const [loading, setLoading] = useState(true);
  
  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Effect to check if we just completed a test (coming from interview page)
  useEffect(() => {
    const justCompletedTest = location.state?.testCompleted;
    
    if (justCompletedTest) {
      toast.success("Test results saved successfully!");
      // Clear the location state
      window.history.replaceState({}, document.title);
    }
  }, [location]);

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
    <DashboardLayout user={user} onLogout={handleLogout}>
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
    </DashboardLayout>
  );
};

export default Dashboard;
