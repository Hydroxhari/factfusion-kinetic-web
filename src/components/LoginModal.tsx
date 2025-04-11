
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, User, Mail, Lock, Loader } from 'lucide-react';
import { useAuthContext } from '@/contexts/AuthContext';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

interface LoginModalProps {
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  
  const { login, register } = useAuthContext();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      let success;
      
      if (isRegistering) {
        if (!name) {
          toast({
            title: "Missing information",
            description: "Please enter your name",
            variant: "destructive"
          });
          setIsProcessing(false);
          return;
        }
        success = await register(name, email, password);
      } else {
        success = await login(email, password);
      }
      
      if (success) {
        setTimeout(() => {
          onClose();
        }, 500);
      }
    } catch (error) {
      console.error("Auth error:", error);
    }
    
    setIsProcessing(false);
  };
  
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
        className="w-full max-w-md bg-brand-900 border border-brand-700 rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <div className="relative p-6">
          <button
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
          
          <motion.div 
            className="mb-6 text-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-purpleAccent to-blueAccent flex items-center justify-center">
              <User className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-bold">{isRegistering ? "Create Account" : "Welcome Back"}</h2>
            <p className="text-gray-400 mt-1">
              {isRegistering
                ? "Sign up to analyze content with FactFusion"
                : "Log in to continue to FactFusion"}
            </p>
          </motion.div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              {isRegistering && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label htmlFor="name" className="mb-1.5 block text-gray-200">Full Name</Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <Input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 bg-brand-800 border-brand-700 focus:border-purpleAccent"
                      placeholder="John Doe"
                    />
                  </div>
                </motion.div>
              )}
              
              <div>
                <Label htmlFor="email" className="mb-1.5 block text-gray-200">Email Address</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-brand-800 border-brand-700 focus:border-purpleAccent"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="password" className="mb-1.5 block text-gray-200">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-brand-800 border-brand-700 focus:border-purpleAccent"
                    placeholder="********"
                  />
                </div>
              </div>
              
              <motion.div
                className="pt-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full py-6 bg-gradient-to-r from-purpleAccent to-blueAccent hover:opacity-90 text-white font-medium text-lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                  ) : null}
                  {isRegistering ? "Create Account" : "Sign In"}
                </Button>
              </motion.div>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isRegistering ? "Already have an account?" : "Don't have an account?"}{" "}
              <button
                type="button"
                className="text-purpleAccent hover:underline font-medium"
                onClick={() => setIsRegistering(!isRegistering)}
              >
                {isRegistering ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default LoginModal;
