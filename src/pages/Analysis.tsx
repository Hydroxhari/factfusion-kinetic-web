
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import AnalysisForm from '@/components/AnalysisForm';
import FooterSection from '@/components/FooterSection';
import LoadingScreen from '@/components/LoadingScreen';

const Analysis = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Shorter loading time for internal pages
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen bg-brand-950 overflow-x-hidden">
          <Navbar />
          
          <main className="pt-28 pb-20 px-4">
            <div className="container mx-auto max-w-6xl">
              <motion.div 
                className="text-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleAccent to-blueAccent">Fact Analysis</span>
                </h1>
                <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                  Submit any text, image, audio, or video content and get a detailed factual analysis powered by advanced AI algorithms.
                </p>
              </motion.div>
              
              <AnalysisForm />
            </div>
          </main>
          
          <FooterSection />
        </div>
      )}
    </>
  );
};

export default Analysis;
