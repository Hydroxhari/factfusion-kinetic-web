
import React from 'react';
import { motion } from 'framer-motion';
import { X, Mail, Phone, MapPin, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        className="w-full max-w-lg bg-brand-900 border border-brand-700 rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <div className="relative p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Contact Us</h2>
            <button
              className="text-gray-400 hover:text-white transition-colors"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <motion.div
              className="bg-brand-800/50 p-4 rounded-xl flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-purpleAccent/20 p-3 rounded-full">
                <Mail className="w-6 h-6 text-purpleAccent" />
              </div>
              <div>
                <h3 className="font-medium text-white">Email</h3>
                <p className="text-gray-400 mt-1">Got questions? Send us a message!</p>
                <a 
                  href="mailto:contact@factfusion.com" 
                  className="text-purpleAccent hover:underline flex items-center mt-2"
                >
                  contact@factfusion.com
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-brand-800/50 p-4 rounded-xl flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-blueAccent/20 p-3 rounded-full">
                <Phone className="w-6 h-6 text-blueAccent" />
              </div>
              <div>
                <h3 className="font-medium text-white">Phone</h3>
                <p className="text-gray-400 mt-1">Call us for immediate assistance</p>
                <a 
                  href="tel:+18001234567" 
                  className="text-blueAccent hover:underline flex items-center mt-2"
                >
                  +1 (800) 123-4567
                  <ExternalLink className="w-3 h-3 ml-1" />
                </a>
              </div>
            </motion.div>
            
            <motion.div
              className="bg-brand-800/50 p-4 rounded-xl flex items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="bg-purpleAccent/20 p-3 rounded-full">
                <MapPin className="w-6 h-6 text-purpleAccent" />
              </div>
              <div>
                <h3 className="font-medium text-white">Office</h3>
                <p className="text-gray-400 mt-1">Visit our headquarters</p>
                <p className="text-white mt-2">
                  123 Tech Avenue<br />
                  San Francisco, CA 94107<br />
                  United States
                </p>
              </div>
            </motion.div>
          </div>
          
          <motion.div
            className="mt-6 pt-6 border-t border-brand-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button 
              className="w-full bg-gradient-to-r from-purpleAccent to-blueAccent hover:opacity-90"
              onClick={() => {
                window.open('https://factfusion.com/support', '_blank');
              }}
            >
              Visit Support Center
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ContactModal;
