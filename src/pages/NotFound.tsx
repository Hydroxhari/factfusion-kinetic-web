
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-brand-950 overflow-hidden flex flex-col items-center justify-center p-4 relative">
      {/* Animated background elements */}
      <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-purpleAccent/10 blur-3xl animate-float"></div>
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-blueAccent/10 blur-3xl" style={{ animationDelay: '-2s' }}></div>
      
      <motion.div 
        className="glass-card rounded-xl p-10 text-center max-w-md z-10"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="relative w-24 h-24 mx-auto mb-6">
            <div className="absolute inset-0 bg-gradient-to-tr from-purpleAccent to-blueAccent rounded-full opacity-80"></div>
            <div className="absolute inset-2 bg-brand-950 rounded-full flex items-center justify-center">
              <span className="font-bold text-white text-4xl">404</span>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold mb-2">Page Not Found</h1>
          <p className="text-xl text-gray-400 mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              className="bg-gradient-to-r from-purpleAccent to-blueAccent hover:opacity-90 ripple-btn"
              onClick={() => navigate('/')}
            >
              <Home className="w-5 h-5 mr-2" /> Return Home
            </Button>
            <Button 
              variant="outline" 
              className="border-brand-700 text-gray-300 hover:bg-brand-800 hover:text-white"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="w-5 h-5 mr-2" /> Go Back
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
