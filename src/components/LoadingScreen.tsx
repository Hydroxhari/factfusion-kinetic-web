
import React, { useEffect, useState } from 'react';
import { Circle } from 'lucide-react';

interface LoadingScreenProps {
  onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (progress < 100) {
      timer = setTimeout(() => {
        const nextProgress = progress + 1;
        setProgress(nextProgress);
        
        if (nextProgress === 25) {
          setLoadingText('Analyzing data...');
        } else if (nextProgress === 50) {
          setLoadingText('Processing information...');
        } else if (nextProgress === 75) {
          setLoadingText('Preparing algorithms...');
        } else if (nextProgress === 95) {
          setLoadingText('Almost ready...');
        }
      }, 30);
    } else {
      setTimeout(() => {
        onComplete();
      }, 500);
    }
    
    return () => clearTimeout(timer);
  }, [progress, onComplete]);
  
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-brand-950 z-50">
      <div className="relative mb-12">
        <div className="w-24 h-24 absolute inset-0 m-auto">
          <Circle className="w-full h-full opacity-20 animate-spin-slow text-purpleAccent" />
        </div>
        <div className="w-20 h-20 absolute inset-0 m-auto">
          <Circle className="w-full h-full opacity-40 animate-spin-slow text-blueAccent" style={{ animationDelay: '-2s' }} />
        </div>
        
        <div className="relative w-16 h-16 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-purpleAccent to-blueAccent rounded-full opacity-80"></div>
          <div className="absolute inset-1 bg-brand-950 rounded-full"></div>
          <span className="font-bold text-white text-xl relative">FF</span>
        </div>
      </div>
      
      <div className="w-64 sm:w-80 h-2 bg-gray-800 rounded-full mb-4 overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-purpleAccent to-blueAccent rounded-full transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="text-white/80 text-sm animate-pulse">{loadingText}</div>
      <div className="text-white/60 text-xs mt-2">{progress}%</div>
    </div>
  );
};

export default LoadingScreen;
