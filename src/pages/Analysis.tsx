
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import AnalysisForm from '@/components/AnalysisForm';
import FooterSection from '@/components/FooterSection';
import LoadingScreen from '@/components/LoadingScreen';
import LoginModal from '@/components/LoginModal';
import { useAuthContext } from '@/contexts/AuthContext';

const Analysis = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, isAuthenticated } = useAuthContext();
  
  useEffect(() => {
    // Shorter loading time for internal pages
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleGetStarted = () => {
    if (!isAuthenticated) {
      setShowLoginModal(true);
    }
  };
  
  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div 
          className="min-h-screen bg-brand-950 overflow-x-hidden relative"
          style={{
            backgroundImage: 'url(/analysis-bg.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed'
          }}
        >
          {/* Overlay for better text readability */}
          <div className="absolute inset-0 bg-brand-950/75 backdrop-blur-sm z-0"></div>
          
          <div className="relative z-10">
            <Navbar />
            
            <main className="pt-28 pb-20 px-4">
              <div className="container mx-auto max-w-6xl">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <motion.h1 
                    className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                  >
                    AI-Powered <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleAccent to-blueAccent">Fact Analysis</span>
                  </motion.h1>
                  
                  <motion.p 
                    className="text-lg text-gray-300 max-w-2xl mx-auto mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                  >
                    Submit any text, image, audio, or video content and get a detailed factual analysis powered by advanced AI algorithms.
                  </motion.p>
                  
                  {!isAuthenticated ? (
                    <motion.button
                      className="button-3d px-8 py-3 text-lg font-medium rounded-lg bg-gradient-to-r from-purpleAccent to-blueAccent text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleGetStarted}
                    >
                      Get Started
                    </motion.button>
                  ) : (
                    <motion.div 
                      className="inline-flex items-center px-6 py-3 bg-brand-800/60 backdrop-blur-md rounded-xl shadow-lg"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purpleAccent to-blueAccent flex items-center justify-center mr-3">
                        <span className="text-white font-bold">{user?.name.substring(0, 1)}</span>
                      </div>
                      <div className="text-left">
                        <div className="text-white font-medium">Welcome, {user?.name}</div>
                        <div className="text-xs text-gray-400">Start analyzing content below</div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
                
                {isAuthenticated && <AnalysisForm />}
              </div>
            </main>
            
            <FooterSection />
          </div>
          
          <AnimatePresence>
            {showLoginModal && (
              <LoginModal onClose={() => setShowLoginModal(false)} />
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};

export default Analysis;
