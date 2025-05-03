
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/about/HeroSection';
import StorySection from '@/components/about/StorySection';
import HowItWorksSection from '@/components/about/HowItWorksSection';
import TeamSection from '@/components/about/TeamSection';
import CTASection from '@/components/about/CTASection';
import AboutFooter from '@/components/about/AboutFooter';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-blue-50 dark:from-gray-900 dark:to-blue-950">
      {/* Use the shared Navbar component */}
      <Navbar />
      
      {/* Page sections */}
      <HeroSection />
      <StorySection />
      <HowItWorksSection />
      <TeamSection />
      <CTASection />
      <AboutFooter />
    </div>
  );
};

export default About;
