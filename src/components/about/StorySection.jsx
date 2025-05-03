
import React from 'react';
import Container from '@/components/layout/Container';

const StorySection = () => {
  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <Container>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-lg">
              <p>
                PrepMind began with a simple observation: traditional interview preparation methods weren't keeping pace with modern hiring practices.
              </p>
              <p>
                Founded in 2023 by a team of AI experts and career coaches, we set out to create a solution that combines cutting-edge AI technology with proven interview techniques.
              </p>
              <p>
                Our platform is designed to adapt to each user's unique background and career goals, providing personalized preparation that traditional methods simply can't match.
              </p>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-primary/40">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 bg-primary/10 rounded-lg -z-10"></div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default StorySection;
