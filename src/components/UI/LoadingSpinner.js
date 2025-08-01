import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const LoadingSpinner = ({ size = 'large', message = 'Loading...', fullScreen = true }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16'
  };

  const containerClasses = fullScreen 
    ? 'fixed inset-0 bg-neutral-50 flex items-center justify-center z-50'
    : 'flex items-center justify-center p-8';

  return (
    <div className={containerClasses}>
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="mx-auto mb-4"
        >
          <div className={`${sizeClasses[size]} bg-gradient-primary rounded-xl flex items-center justify-center`}>
            <Sparkles className={`${size === 'small' ? 'w-2 h-2' : size === 'medium' ? 'w-4 h-4' : size === 'large' ? 'w-6 h-6' : 'w-8 h-8'} text-white`} />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-neutral-600 font-medium">{message}</p>
          <div className="flex justify-center mt-2">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                  className="w-2 h-2 bg-primary-400 rounded-full"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
