
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

interface TrustScoreVisualizerProps {
  score: number;
  isLoading?: boolean;
}

const TrustScoreVisualizer: React.FC<TrustScoreVisualizerProps> = ({ score, isLoading = false }) => {
  const [animatedScore, setAnimatedScore] = useState(0);
  
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setAnimatedScore(score);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setAnimatedScore(0);
    }
  }, [score, isLoading]);
  
  // Determine color based on score
  const getColor = () => {
    if (animatedScore >= 80) return 'from-green-500 to-green-600';
    if (animatedScore >= 60) return 'from-yellow-400 to-yellow-500';
    if (animatedScore >= 40) return 'from-orange-500 to-orange-600';
    return 'from-red-500 to-red-600';
  };
  
  // Determine icon based on score
  const getIcon = () => {
    if (animatedScore >= 80) return <CheckCircle className="w-6 h-6 text-green-500" />;
    if (animatedScore >= 60) return <Info className="w-6 h-6 text-yellow-400" />;
    if (animatedScore >= 40) return <AlertTriangle className="w-6 h-6 text-orange-500" />;
    return <XCircle className="w-6 h-6 text-red-500" />;
  };
  
  // Determine label based on score
  const getLabel = () => {
    if (animatedScore >= 80) return 'Highly Trustworthy';
    if (animatedScore >= 60) return 'Somewhat Trustworthy';
    if (animatedScore >= 40) return 'Questionable';
    return 'Untrustworthy';
  };
  
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-40 h-40 mb-4">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full bg-brand-800"></div>
        
        {/* Progress ring */}
        <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
          {!isLoading && (
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              stroke="url(#gradient)"
              strokeDasharray="283"
              strokeDashoffset={283 - (283 * animatedScore) / 100}
              initial={{ strokeDashoffset: 283 }}
              animate={{ strokeDashoffset: 283 - (283 * animatedScore) / 100 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          )}
          
          {isLoading && (
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              strokeWidth="8"
              stroke="url(#loading-gradient)"
              strokeDasharray="283"
              strokeDashoffset="212"
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              strokeLinecap="round"
            />
          )}
          
          {/* Define gradients */}
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" className={`stop-color-start ${getColor().split(' ')[0].replace('from-', '')}`} />
              <stop offset="100%" className={`stop-color-end ${getColor().split(' ')[1].replace('to-', '')}`} />
            </linearGradient>
            
            <linearGradient id="loading-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#8B5CF6" />
              <stop offset="100%" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
        </svg>
        
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {!isLoading ? (
            <>
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              >
                {getIcon()}
              </motion.div>
              <motion.div 
                className="text-3xl font-bold"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                {Math.round(animatedScore)}%
              </motion.div>
            </>
          ) : (
            <div className="text-sm text-gray-300 animate-pulse">Analyzing...</div>
          )}
        </div>
      </div>
      
      {!isLoading && (
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="text-lg font-semibold mb-1">{getLabel()}</div>
          <div className="text-sm text-gray-400">Trust Score</div>
        </motion.div>
      )}
    </div>
  );
};

export default TrustScoreVisualizer;
