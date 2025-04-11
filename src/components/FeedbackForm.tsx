
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, ThumbsUp, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import { Switch } from '@/components/ui/switch';

interface FeedbackFormProps {
  onClose: () => void;
  analysisId?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onClose, analysisId }) => {
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [email, setEmail] = useState('');
  const [allowContact, setAllowContact] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Save feedback to localStorage for demo
      const feedbackData = {
        id: `feedback_${Date.now()}`,
        analysisId: analysisId || 'unknown',
        rating,
        comment,
        email: allowContact ? email : '',
        timestamp: new Date().toISOString()
      };
      
      const existingFeedback = JSON.parse(localStorage.getItem('factfusion_feedback') || '[]');
      existingFeedback.push(feedbackData);
      localStorage.setItem('factfusion_feedback', JSON.stringify(existingFeedback));
      
      setIsSubmitting(false);
      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps us improve our analysis engine.",
      });
      
      onClose();
    }, 1000);
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
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Analysis Feedback</h2>
            <button
              className="text-gray-400 hover:text-white transition-colors"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-200 mb-2">How accurate was our analysis?</label>
                <div className="flex justify-center space-x-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        rating >= star ? 'bg-purpleAccent text-white' : 'bg-brand-800 text-gray-400'
                      }`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setRating(star)}
                    >
                      {star}
                    </motion.button>
                  ))}
                </div>
              </div>
              
              <div>
                <label htmlFor="feedback-comment" className="block text-gray-200 mb-2">
                  Your feedback
                </label>
                <Textarea
                  id="feedback-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-brand-800 border-brand-700 focus:border-purpleAccent resize-none h-32"
                  placeholder="Tell us what you think about the analysis results..."
                />
              </div>
              
              <div className="bg-brand-800/50 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <MessageSquare className="w-5 h-5 text-purpleAccent mr-2" />
                    <span className="text-gray-200">Allow us to contact you</span>
                  </div>
                  <Switch 
                    checked={allowContact}
                    onCheckedChange={setAllowContact}
                  />
                </div>
                
                <AnimatePresence>
                  {allowContact && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-brand-800 border-brand-700 focus:border-purpleAccent"
                        placeholder="your@email.com"
                        required={allowContact}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            <motion.div
              className="mt-6"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full py-6 bg-gradient-to-r from-purpleAccent to-blueAccent hover:opacity-90 text-white"
                disabled={isSubmitting || rating === 0}
              >
                {isSubmitting ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="w-5 h-5 mr-2" />
                    Submit Feedback
                  </span>
                )}
              </Button>
            </motion.div>
          </form>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default FeedbackForm;
