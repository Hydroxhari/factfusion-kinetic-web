
import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { FileText, Image, Music, Video, Shield, Database, BarChart, Bot } from 'lucide-react';

const FeaturesSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const features = [
    {
      icon: <FileText className="w-10 h-10 text-purpleAccent group-hover:text-white transition-colors duration-300" />,
      title: 'Text Analysis',
      description: 'Analyze articles, social media posts, and textual claims from any source.',
      delay: 0.1
    },
    {
      icon: <Image className="w-10 h-10 text-purpleAccent group-hover:text-white transition-colors duration-300" />,
      title: 'Image Verification',
      description: 'Detect manipulated images and verify visual content with advanced algorithms.',
      delay: 0.2
    },
    {
      icon: <Music className="w-10 h-10 text-purpleAccent group-hover:text-white transition-colors duration-300" />,
      title: 'Audio Processing',
      description: 'Identify manipulated audio clips and transcribe content for analysis.',
      delay: 0.3
    },
    {
      icon: <Video className="w-10 h-10 text-purpleAccent group-hover:text-white transition-colors duration-300" />,
      title: 'Video Examination',
      description: 'Analyze video content frame by frame to detect deepfakes and manipulation.',
      delay: 0.4
    },
    {
      icon: <Shield className="w-10 h-10 text-blueAccent group-hover:text-white transition-colors duration-300" />,
      title: 'Trust Scoring',
      description: 'Get detailed trust scores with confidence intervals and verification metrics.',
      delay: 0.5
    },
    {
      icon: <Database className="w-10 h-10 text-blueAccent group-hover:text-white transition-colors duration-300" />,
      title: 'Source Comparison',
      description: 'Cross-reference claims against our vast database of verified information.',
      delay: 0.6
    },
    {
      icon: <BarChart className="w-10 h-10 text-blueAccent group-hover:text-white transition-colors duration-300" />,
      title: 'Data Visualization',
      description: 'View interactive visualizations of analysis results and confidence metrics.',
      delay: 0.7
    },
    {
      icon: <Bot className="w-10 h-10 text-blueAccent group-hover:text-white transition-colors duration-300" />,
      title: 'AI Assistant',
      description: 'Get explanations and insights from our AI about verification results.',
      delay: 0.8
    },
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-brand-950 to-brand-900 overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-6 relative inline-block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleAccent to-blueAccent">
              Powerful
            </span> Features
            <motion.div
              className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purpleAccent to-blueAccent"
              initial={{ width: 0 }}
              animate={{ width: isInView ? '100%' : 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            />
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-300 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our platform combines cutting-edge AI technology with comprehensive data analysis to provide 
            the most accurate and reliable fact-checking available.
          </motion.p>
        </div>
        
        <motion.div 
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-xl group hover:bg-gradient-to-br hover:from-brand-800 hover:to-brand-700 transition-all duration-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.2)]"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: feature.delay }}
              whileHover={{ 
                y: -5,
                transition: { duration: 0.2 } 
              }}
            >
              <div className="bg-brand-800 group-hover:bg-purpleAccent/20 p-4 rounded-lg inline-block mb-4 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
