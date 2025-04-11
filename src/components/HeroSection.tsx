
import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Search, Check, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const animatedTextRef = useRef<HTMLSpanElement>(null);
  const phrases = [
    'detect fake news',
    'verify claims',
    'analyze content',
    'check sources',
    'fight misinformation'
  ];
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  
  useEffect(() => {
    setIsVisible(true);
    
    const intervalId = setInterval(() => {
      setCurrentPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
    }, 3000);
    
    return () => clearInterval(intervalId);
  }, []);

  const features = [
    {
      icon: <Search className="w-5 h-5 text-purpleAccent" />,
      text: 'Analyze claims from any source instantly'
    },
    {
      icon: <Shield className="w-5 h-5 text-blueAccent" />,
      text: 'AI-powered fact-checking technology'
    },
    {
      icon: <BarChart className="w-5 h-5 text-purpleAccent" />,
      text: 'Detailed trust score analysis'
    },
    {
      icon: <Check className="w-5 h-5 text-blueAccent" />,
      text: 'Supports text, image, audio & video'
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };
  
  return (
    <section className="min-h-[90vh] flex flex-col items-center justify-center pt-20 pb-16 px-4 overflow-hidden">
      <motion.div 
        className="container mx-auto max-w-6xl"
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 leading-tight tracking-tight">
            The Science of Truth in a <br/>
            <span className="relative">
              World of <span className="text-gradient">Misinformation</span>
              <motion.div
                className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purpleAccent to-blueAccent"
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ delay: 1, duration: 1 }}
              />
            </span>
          </h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8"
            variants={itemVariants}
          >
            Advanced AI technology to <span ref={animatedTextRef} className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purpleAccent to-blueAccent">
              {phrases[currentPhraseIndex]}
            </span>
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
            variants={itemVariants}
          >
            <Button 
              className="bg-gradient-to-r from-purpleAccent to-blueAccent text-white px-8 py-6 text-lg ripple-btn"
              onClick={(e) => {
                const btn = e.currentTarget;
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                ripple.style.left = `${x}px`;
                ripple.style.top = `${y}px`;
                
                btn.appendChild(ripple);
                
                setTimeout(() => {
                  ripple.remove();
                  navigate('/analysis');
                }, 600);
              }}
            >
              Start Analysis <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              variant="outline" 
              className="px-8 py-6 text-lg border-purpleAccent text-gray-200 hover:text-white hover:bg-brand-900/50"
              onClick={() => navigate('/dashboard')}
            >
              View Dashboard
            </Button>
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12">
          <motion.div 
            className="flex flex-col justify-center"
            variants={itemVariants}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-5 rounded-xl flex items-start space-x-4 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    y: -5,
                    transition: { duration: 0.2 } 
                  }}
                >
                  <div className="mt-1 bg-brand-800 p-2 rounded-lg">
                    {feature.icon}
                  </div>
                  <p className="text-sm text-gray-300">{feature.text}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="relative h-[300px] sm:h-[400px]"
            variants={itemVariants}
          >
            <div className="absolute inset-0 bg-brand-800 rounded-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purpleAccent/20 to-blueAccent/20"></div>
              <div className="absolute w-32 h-32 rounded-full bg-purpleAccent/30 blur-3xl -top-10 -left-10"></div>
              <div className="absolute w-48 h-48 rounded-full bg-blueAccent/20 blur-3xl bottom-10 right-10"></div>
              
              <motion.div 
                className="glass-card absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] py-6 px-6 rounded-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <div className="flex-1 h-6 ml-2 bg-brand-800/60 rounded"></div>
                </div>
                
                <div className="h-2 w-full bg-brand-800/60 rounded mb-3"></div>
                <div className="h-2 w-[85%] bg-brand-800/60 rounded mb-3"></div>
                <div className="h-2 w-[70%] bg-brand-800/60 rounded mb-5"></div>
                
                <div className="h-20 w-full bg-brand-800/60 rounded mb-5 relative overflow-hidden">
                  <div className="absolute left-0 top-0 h-full w-[60%] bg-gradient-to-r from-purpleAccent/40 to-blueAccent/40 progress-bar"></div>
                </div>
                
                <div className="flex space-x-3">
                  <div className="h-8 flex-1 bg-purpleAccent/40 rounded"></div>
                  <div className="h-8 flex-1 bg-brand-800/60 rounded"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
