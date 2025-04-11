
import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  delay: number;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, bio, imageUrl, delay }) => {
  return (
    <motion.div 
      className="flip-card w-full h-[400px]"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true, amount: 0.3 }}
    >
      <div className="flip-card-inner w-full h-full relative">
        {/* Front side */}
        <div className="flip-card-front absolute w-full h-full">
          <div className="glass-card rounded-xl h-full w-full p-6 flex flex-col items-center justify-center overflow-hidden group">
            <div className="relative w-40 h-40 mb-6 rounded-full overflow-hidden border-2 border-purpleAccent/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]">
              <img 
                src={imageUrl} 
                alt={name}
                className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
            <div className="text-purpleAccent text-sm mb-4">{role}</div>
            
            <div className="flex space-x-3 mt-2">
              <motion.a 
                href="#" 
                className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-purpleAccent transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <Linkedin size={16} />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-blueAccent transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <Twitter size={16} />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-brand-700 transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <Mail size={16} />
              </motion.a>
            </div>
          </div>
        </div>
        
        {/* Back side */}
        <div className="flip-card-back absolute w-full h-full">
          <div className="glass-card rounded-xl h-full w-full p-6 flex flex-col justify-between overflow-hidden">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{name}</h3>
              <div className="text-purpleAccent text-sm mb-4">{role}</div>
              <p className="text-gray-300 text-sm">{bio}</p>
            </div>
            
            <div className="flex space-x-3 mt-4 justify-center">
              <motion.a 
                href="#" 
                className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-purpleAccent transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <Linkedin size={16} />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-blueAccent transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <Twitter size={16} />
              </motion.a>
              <motion.a 
                href="#" 
                className="w-8 h-8 rounded-full bg-brand-800 flex items-center justify-center text-gray-300 hover:text-white hover:bg-brand-700 transition-colors duration-300"
                whileHover={{ y: -3 }}
              >
                <Mail size={16} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TeamMember;
