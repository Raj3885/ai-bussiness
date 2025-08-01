import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './Sidebar';
import Header from './Header';
import { useAuth } from '../../contexts/AuthContext';

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user } = useAuth();

  // Check if user needs onboarding
  const needsOnboarding = !user?.businessProfile?.onboardingCompleted;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      {/* Sidebar overlay for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
            className="fixed inset-0 bg-neutral-900/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        {/* Page content */}
        <main className="min-h-screen pt-16">
          {needsOnboarding ? (
            // Show onboarding banner
            <div className="bg-gradient-primary text-white p-4">
              <div className="container-custom">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold">Complete your business profile</h3>
                    <p className="text-sm opacity-90">
                      Help us personalize your AI experience by completing your business information.
                    </p>
                  </div>
                  <button className="btn bg-white text-primary-600 hover:bg-neutral-100">
                    Complete Setup
                  </button>
                </div>
              </div>
            </div>
          ) : null}
          
          <div className="container-custom py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
