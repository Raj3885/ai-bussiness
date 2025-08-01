import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Plus, Sparkles } from 'lucide-react';

const AnalyticsPage = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Analytics & Insights</h1>
            <p className="text-neutral-600 mt-2">
              AI-powered business intelligence and customer feedback analysis
            </p>
          </div>
          <button className="btn btn-primary">
            <Plus className="w-5 h-5 mr-2" />
            Generate Report
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-12 text-center"
      >
        <div className="w-24 h-24 bg-gradient-to-br from-success-500 to-primary-500 rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <BarChart3 className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
          Smart Business Analytics
        </h2>
        <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
          Get actionable insights from customer feedback, sentiment analysis, 
          and performance metrics to make data-driven business decisions.
        </p>
        <div className="flex items-center justify-center space-x-2 text-success-600">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Coming Soon - Full Implementation</span>
        </div>
      </motion.div>
    </div>
  );
};

export default AnalyticsPage;
