
import React from 'react';
import Container from '@/components/layout/Container';
import FeatureCard from './FeatureCard';

const FeaturesSection = () => {
  return (
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
  );
};

export default FeaturesSection;
