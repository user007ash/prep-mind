
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../layout/Container';
import { LogOut } from 'lucide-react';
import { Button } from '../ui/button';

const DashboardLayout = ({ user, onLogout, children }) => {
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
              
              <Button variant="outline" size="sm" onClick={onLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span className="hidden md:inline">Sign out</span>
              </Button>
            </div>
          </div>
        </Container>
      </div>
      
      <main className="py-12 pt-24">
        <Container>
          {children}
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

export default DashboardLayout;
