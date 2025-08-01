import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

const OnboardingPage = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">Welcome to AI Business Toolkit</h1>
          <p className="text-neutral-600 mt-2">
            Let's set up your business profile to get started
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-12 text-center"
      >
        <div className="w-24 h-24 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <Sparkles className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
          Business Onboarding
        </h2>
        <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
          Complete your business profile to unlock the full potential of our AI tools. 
          This helps us personalize your experience and generate better content.
        </p>
        <button className="btn btn-primary btn-lg">
          Start Setup
          <ArrowRight className="w-5 h-5 ml-2" />
        </button>
      </motion.div>
    </div>
  );
};

export default OnboardingPage;
