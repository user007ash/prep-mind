
import React from 'react';
import { Link } from 'react-router-dom';
import Container from '@/components/layout/Container';

const Footer = ({ scrollToSection }) => {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
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
          <div className="flex items-center gap-6 mb-4 md:mb-0">
            <a href="#" onClick={() => scrollToSection('hero')} className="text-sm text-muted-foreground hover:text-primary transition-colors">Home</a>
            <a href="#" onClick={() => scrollToSection('features')} className="text-sm text-muted-foreground hover:text-primary transition-colors">Features</a>
            <Link to="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">About Us</Link>
          </div>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PrepMind. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
