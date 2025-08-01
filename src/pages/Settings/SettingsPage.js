import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Sparkles } from 'lucide-react';

const SettingsPage = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Settings</h1>
            <p className="text-neutral-600 mt-2">
              Configure your AI toolkit preferences and integrations
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-12 text-center"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-neutral-500 to-neutral-600 rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <Settings className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
          Application Settings
        </h2>
        <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
          Customize your experience with theme preferences, notification settings, 
          API configurations, and integration options.
        </p>
        <div className="flex items-center justify-center space-x-2 text-neutral-600">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Coming Soon - Full Implementation</span>
        </div>
      </motion.div>
    </div>
  );
};

export default SettingsPage;
