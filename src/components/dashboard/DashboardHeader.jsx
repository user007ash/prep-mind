
import React from 'react';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';

const DashboardHeader = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <Button className="pulse-animation" onClick={() => navigate('/')}>
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
          <path d="M12 5v14"></path>
          <path d="M5 12h14"></path>
        </svg>
        New Interview
      </Button>
    </div>
  );
};

export default DashboardHeader;
