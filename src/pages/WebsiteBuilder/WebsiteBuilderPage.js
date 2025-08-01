import React from 'react';
import { motion } from 'framer-motion';
import { Globe, Plus, Sparkles } from 'lucide-react';

const WebsiteBuilderPage = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">AI Website Builder</h1>
            <p className="text-neutral-600 mt-2">
              Create professional websites with AI in minutes
            </p>
          </div>
          <button className="btn btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Create Website
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-12 text-center"
      >
        <div className="w-24 h-24 bg-gradient-primary rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <Globe className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
          AI-Powered Website Generation
        </h2>
        <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
          Our advanced AI analyzes your business information and creates a professional, 
          responsive website tailored to your industry and target audience.
        </p>
        <div className="flex items-center justify-center space-x-2 text-primary-600">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Coming Soon - Full Implementation</span>
        </div>
      </motion.div>
    </div>
  );
};

export default WebsiteBuilderPage;
