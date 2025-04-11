
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import TeamMember from '@/components/TeamMember';
import FooterSection from '@/components/FooterSection';
import LoadingScreen from '@/components/LoadingScreen';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Shorter loading time for internal pages
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const teamMembers = [
    {
      name: 'Dr. Emma Chen',
      role: 'Chief AI Scientist',
      bio: 'Leading expert in machine learning with 15+ years experience in AI and NLP. Previously worked at Google AI and has published over 30 research papers on deep learning.',
      imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Data Engineering Lead',
      bio: 'Big data specialist with expertise in database architecture and distributed systems. Former engineer at IBM and AWS, with a passion for building scalable data solutions.',
      imageUrl: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    },
    {
      name: 'Sarah Johnson',
      role: 'UX/UI Director',
      bio: 'Award-winning designer focused on creating intuitive user experiences that bridge complex technology and human needs. Previously at Apple and Stripe.',
      imageUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    },
    {
      name: 'Dr. James Wilson',
      role: 'Chief Research Officer',
      bio: 'Former professor of computational linguistics with a focus on misinformation patterns. Published author and frequent speaker on media integrity and trust.',
      imageUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    },
    {
      name: 'Aisha Patel',
      role: 'Media Analytics Expert',
      bio: 'Specialist in multimedia content analysis with expertise in deepfake detection and image forensics. Previously worked for a major news organization.',
      imageUrl: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    },
    {
      name: 'David Kim',
      role: 'CTO',
      bio: 'Technology innovator with 20+ years experience building cutting-edge platforms. Serial entrepreneur with multiple successful exits in the tech space.',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
    }
  ];
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen bg-brand-950 overflow-x-hidden">
          <Navbar />
          
          <main className="pt-28 pb-20">
            <section className="px-4 mb-20">
              <div className="container mx-auto max-w-6xl">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <h1 className="text-3xl md:text-5xl font-bold mb-6">
                    About <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleAccent to-blueAccent">FactFusion</span>
                  </h1>
                  <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                    We're on a mission to combat misinformation with advanced technology and innovative solutions.
                  </p>
                </motion.div>
                
                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <motion.div 
                    className="md:w-1/2"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    <h2 className="text-2xl md:text-3xl font-bold mb-6">Our Story</h2>
                    <div className="space-y-4 text-gray-300">
                      <p>
                        Founded in 2022, FactFusion began with a simple but ambitious goal: to create technology that could help people distinguish fact from fiction in an increasingly complex media landscape.
                      </p>
                      <p>
                        Our team of AI researchers, data scientists, and media experts came together with a shared concern about the rise of misinformation and its impact on society. We recognized that traditional fact-checking methods couldn't scale to meet the challenge.
                      </p>
                      <p>
                        Today, FactFusion combines cutting-edge artificial intelligence with human expertise to analyze and verify content across text, images, audio, and video - delivering trustworthy information analysis at scale.
                      </p>
                    </div>
                    
                    <Button 
                      className="mt-8 bg-gradient-to-r from-purpleAccent to-blueAccent ripple-btn"
                    >
                      Learn More <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </motion.div>
                  
                  <motion.div 
                    className="md:w-1/2 relative h-[400px]"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <div className="absolute inset-0 bg-brand-800 rounded-2xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-purpleAccent/20 to-blueAccent/20"></div>
                      <div className="absolute w-40 h-40 rounded-full bg-purpleAccent/30 blur-3xl -top-10 -right-10"></div>
                      <div className="absolute w-40 h-40 rounded-full bg-blueAccent/20 blur-3xl bottom-10 left-10"></div>
                      
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="relative w-48 h-48">
                          <div className="absolute inset-0 bg-gradient-to-tr from-purpleAccent to-blueAccent rounded-full opacity-80 animate-pulse"></div>
                          <div className="absolute inset-4 bg-brand-950 rounded-full flex items-center justify-center">
                            <span className="font-bold text-white text-6xl">FF</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </section>
            
            <section className="px-4 py-16 bg-brand-900">
              <div className="container mx-auto max-w-6xl">
                <motion.div 
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 relative inline-block">
                    Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleAccent to-blueAccent">Team</span>
                    <motion.div
                      className="absolute -bottom-2 left-0 h-1 bg-gradient-to-r from-purpleAccent to-blueAccent"
                      initial={{ width: 0 }}
                      whileInView={{ width: '100%' }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5, duration: 0.8 }}
                    />
                  </h2>
                  <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                    Meet the experts and innovators building the future of fact-checking technology.
                  </p>
                </motion.div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.map((member, index) => (
                    <TeamMember 
                      key={index}
                      name={member.name}
                      role={member.role}
                      bio={member.bio}
                      imageUrl={member.imageUrl}
                      delay={0.1 * index}
                    />
                  ))}
                </div>
              </div>
            </section>
            
            <section className="px-4 py-16">
              <div className="container mx-auto max-w-6xl">
                <motion.div 
                  className="glass-card rounded-xl p-8 sm:p-12"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-4">
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleAccent to-blueAccent">
                        Join Our Mission
                      </span>
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                      We're always looking for talented individuals who are passionate about 
                      fighting misinformation and building technology for a better-informed world.
                    </p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
                    <Button 
                      className="bg-gradient-to-r from-purpleAccent to-blueAccent hover:opacity-90 px-8 py-6 text-lg ripple-btn"
                    >
                      View Open Positions
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-purpleAccent text-gray-200 hover:text-white hover:bg-brand-800 px-8 py-6 text-lg"
                    >
                      Contact Us
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>
          </main>
          
          <FooterSection />
        </div>
      )}
    </>
  );
};

export default About;
