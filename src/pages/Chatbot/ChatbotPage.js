import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Plus, Sparkles } from 'lucide-react';

const ChatbotPage = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">AI Chatbot</h1>
            <p className="text-neutral-600 mt-2">
              24/7 customer support with intelligent responses
            </p>
          </div>
          <button className="btn btn-accent">
            <Plus className="w-5 h-5 mr-2" />
            Configure Bot
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="card p-12 text-center"
      >
        <div className="w-24 h-24 bg-gradient-accent rounded-2xl mx-auto mb-6 flex items-center justify-center">
          <MessageCircle className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-neutral-900 mb-4">
          Intelligent Customer Support
        </h2>
        <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
          Train your AI chatbot with business-specific knowledge to provide 
          instant, accurate responses to customer inquiries around the clock.
        </p>
        <div className="flex items-center justify-center space-x-2 text-accent-600">
          <Sparkles className="w-5 h-5" />
          <span className="font-medium">Coming Soon - Full Implementation</span>
        </div>
      </motion.div>
    </div>
  );
};

export default ChatbotPage;
