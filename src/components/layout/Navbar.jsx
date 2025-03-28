
import React from 'react';
import Container from './Container';

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass animate-fade-in">
      <Container>
        <div className="flex items-center justify-between h-16">
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
            <span className="text-lg font-medium">PrepMind</span>
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Navbar;
