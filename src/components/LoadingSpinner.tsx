
import React from 'react';

interface LoadingSpinnerProps {
  message?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = "Processing..." 
}) => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="text-center">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-teal-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-teal-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
        
        {/* Message */}
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">{message}</h3>
          <p className="text-gray-600">Please wait while we process your information...</p>
        </div>
        
        {/* Progress dots */}
        <div className="flex justify-center space-x-1 mt-4">
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
          <div className="w-2 h-2 bg-teal-600 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
