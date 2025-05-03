
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/Button';
import Container from '@/components/layout/Container';

const CTASection = () => {
  return (
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
  );
};

export default CTASection;
