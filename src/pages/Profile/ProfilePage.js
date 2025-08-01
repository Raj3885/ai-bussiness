import React from 'react';
import { motion } from 'framer-motion';
import { User, Sparkles } from 'lucide-react';

const ProfilePage = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Profile</h1>
            <p className="text-neutral-600 mt-2">
              Manage your account and business information
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
          <User className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
          User Profile Management
        </h2>
        <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
          Update your personal information, business details, and preferences 
          to get the most out of your AI business toolkit.
        </p>
        <div className="flex items-center justify-center space-x-2 text-neutral-600">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Coming Soon - Full Implementation</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;
