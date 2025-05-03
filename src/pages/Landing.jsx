
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/layout/Container';
import { Button } from '../components/ui/Button';
import Navbar from '@/components/layout/Navbar';

const Landing = () => {
  const [scrolled, setScrolled] = useState(false);

  // Add scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth scroll to section
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      {/* Enhanced Navbar with scroll effect */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 dark:bg-gray-900/90 shadow-md backdrop-blur-sm' : 'bg-transparent'}`}>
        <Navbar />
      </div>
      
      {/* Hero Section with improved layout and visual hierarchy */}
      <section id="hero" className="pt-36 pb-20">
        <Container>
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center px-3 py-1 mb-2 text-xs font-medium text-primary bg-primary/10 rounded-full">
                <span className="mr-1.5 size-2 bg-primary rounded-full"></span>
                AI-Powered Interview Preparation
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-500 dark:from-blue-400 dark:to-violet-400">
                Your AI-powered <br className="hidden md:block" />interview coach
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl">
                Elevate your career with PrepMind - the all-in-one platform that analyzes your resume, simulates interviews, and provides personalized feedback to help you land your dream job.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/index">
                  <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                    Start Your Prep
                  </Button>
                </Link>
                <Link to="/about">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all">
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="w-full h-[400px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg shadow-xl flex items-center justify-center overflow-hidden">
                <div className="relative w-3/4 aspect-square">
                  <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-primary/40 dark:text-primary/20">
                    <path fill="currentColor" d="M40,-51.2C51.8,-41.9,61.5,-29.4,65.6,-15C69.7,-0.6,68.3,15.7,61.3,29.3C54.4,42.9,42,53.8,27.4,60.8C12.9,67.8,-3.9,70.8,-20.3,67.3C-36.7,63.8,-52.8,53.7,-62.2,39.1C-71.6,24.5,-74.4,5.4,-70.5,-11.7C-66.6,-28.8,-56,-43.9,-42.5,-52.8C-29,-61.8,-12.8,-64.5,1.1,-65.8C14.9,-67.1,28.1,-60.5,40,-51.2Z" transform="translate(100 100)" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-4xl md:text-5xl font-bold text-primary">
                      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2a5 5 0 0 1 5 5v14a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5Z"/>
                        <path d="M2 12h4"/>
                        <path d="M18 12h4"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Features Section with improved cards and layout */}
      <section id="features" className="py-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="block text-sm font-medium text-primary uppercase tracking-wider mb-2">Why Choose PrepMind</span>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Powerful Features to Boost Your Interview Prep</h2>
            <p className="text-lg text-muted-foreground">
              Our comprehensive suite of tools is designed to help you ace your next interview
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14 2 14 8 20 8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10 9 9 9 8 9"></polyline>
                </svg>
              }
              title="Resume Parsing & ATS Scoring"
              description="Upload your resume to get an ATS score and understand how recruiters will view your application"
            />
            
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
              }
              title="AI-Generated Interview Questions"
              description="Get personalized interview questions based on your resume and job position"
            />
            
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
                  <line x1="9" y1="9" x2="9.01" y2="9"></line>
                  <line x1="15" y1="9" x2="15.01" y2="9"></line>
                </svg>
              }
              title="Sentiment Analysis & Feedback"
              description="Receive insights on your tone, confidence, and overall communication style"
            />
            
            <FeatureCard 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              }
              title="Comprehensive Reports"
              description="Get detailed feedback on your answers with suggestions for improvement"
            />
          </div>
        </Container>
      </section>
      
      {/* CTA Section with improved layout and visual appeal */}
      <section id="cta" className="py-20">
        <Container>
          <div className="bg-gradient-to-r from-blue-600/10 to-violet-500/10 dark:from-blue-600/20 dark:to-violet-500/20 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow-lg border border-primary/10">
            <div className="max-w-2xl">
              <span className="block text-sm font-medium text-primary uppercase tracking-wider mb-2">Ready to get started?</span>
              <h2 className="text-3xl font-bold mb-4">Ace your next interview</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Start practicing with our AI-powered interview coach today and build your confidence for the real thing.
              </p>
              <Link to="/index">
                <Button size="lg" className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all">
                  Get Started Now
                </Button>
              </Link>
            </div>
            <div className="relative w-full md:w-1/3 aspect-square rounded-lg bg-gradient-to-br from-primary/10 to-transparent flex items-center justify-center">
              <div className="absolute inset-4 rounded-lg border-2 border-dashed border-primary/30 flex items-center justify-center animate-pulse">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary/70">
                  <path d="M12 20h9"></path>
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                </svg>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      {/* Footer with improved layout */}
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
    </div>
  );
};

// Enhanced Feature Card component with improved styling
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="p-6 rounded-lg bg-white dark:bg-gray-800 shadow-md border border-gray-100 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:translate-y-[-4px] group">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary group-hover:bg-primary/20 transition-all">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;
