
import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Upload, Search, Database, BarChart, Award } from 'lucide-react';

const HowItWorksSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const steps = [
    {
      icon: <Upload className="w-8 h-8 text-white" />,
      title: 'Submit Content',
      description: 'Upload or paste the text, image, audio, or video content you want to analyze.'
    },
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: 'AI Analysis',
      description: 'Our AI algorithms scan the content to identify claims and extract key information.'
    },
    {
      icon: <Database className="w-8 h-8 text-white" />,
      title: 'Database Comparison',
      description: 'Claims are cross-referenced against our verified sources and fact-checking databases.'
    },
    {
      icon: <BarChart className="w-8 h-8 text-white" />,
      title: 'Trust Scoring',
      description: 'A detailed trust score is generated based on multiple verification factors.'
    },
    {
      icon: <Award className="w-8 h-8 text-white" />,
      title: 'Results & Insights',
      description: 'Receive comprehensive results with visualization and AI-powered explanations.'
    }
  ];
  
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-brand-900 to-brand-950 overflow-hidden" ref={ref}>
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            How <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleAccent to-blueAccent">It Works</span>
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purpleAccent to-blueAccent"
              initial={{ width: 0 }}
              animate={isInView ? { width: '100%' } : { width: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our advanced fact-checking process combines AI technology with extensive data analysis to deliver accurate results.
          </motion.p>
        </div>
        
        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-purpleAccent to-blueAccent hidden md:block transform -translate-x-1/2 z-0">
            <motion.div 
              className="absolute top-0 w-full bg-white h-full"
              initial={{ height: '100%' }}
              animate={isInView ? { height: '0%' } : { height: '100%' }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>
          
          <div className="space-y-14 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.2 }}
              >
                <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleAccent to-blueAccent">
                      Step {index + 1}:
                    </span> {step.title}
                  </h3>
                  <p className="text-gray-300">{step.description}</p>
                </div>
                
                <div className="relative flex-shrink-0 z-10">
                  <motion.div 
                    className="w-16 h-16 rounded-full bg-gradient-to-br from-purpleAccent to-blueAccent flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {step.icon}
                  </motion.div>
                </div>
                
                <div className="flex-1 hidden md:block"></div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
