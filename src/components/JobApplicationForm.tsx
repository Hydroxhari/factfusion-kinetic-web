
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Send, User, Mail, Briefcase, Upload, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface JobApplicationFormProps {
  onClose: () => void;
  jobTitle?: string;
}

const JobApplicationForm: React.FC<JobApplicationFormProps> = ({ onClose, jobTitle = "Open Position" }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState<File | null>(null);
  const [coverLetter, setCoverLetter] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setResume(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !resume || !coverLetter) {
      toast({
        title: "Missing information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      // Save application to localStorage for demo
      const applicationData = {
        id: `application_${Date.now()}`,
        name,
        email,
        resumeName: resume?.name,
        resumeSize: resume?.size,
        coverLetter,
        jobTitle,
        timestamp: new Date().toISOString()
      };
      
      const existingApplications = JSON.parse(localStorage.getItem('factfusion_applications') || '[]');
      existingApplications.push(applicationData);
      localStorage.setItem('factfusion_applications', JSON.stringify(existingApplications));
      
      setIsSubmitting(false);
      toast({
        title: "Application submitted!",
        description: "We'll review your application and contact you soon.",
      });
      
      onClose();
    }, 1500);
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
        className="w-full max-w-lg bg-brand-900 border border-brand-700 rounded-2xl overflow-hidden shadow-2xl"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", bounce: 0.4 }}
      >
        <div className="relative p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold">Apply for Position</h2>
              <p className="text-gray-400">{jobTitle}</p>
            </div>
            <button
              className="text-gray-400 hover:text-white"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="applicant-name" className="block text-gray-200 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="applicant-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="pl-10 bg-brand-800 border-brand-700 focus:border-purpleAccent"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="applicant-email" className="block text-gray-200 mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-gray-400" />
                  </div>
                  <Input
                    id="applicant-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-brand-800 border-brand-700 focus:border-purpleAccent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="resume-upload" className="block text-gray-200 mb-1.5">
                  Resume/CV *
                </label>
                <div className="relative">
                  <input
                    id="resume-upload"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <label 
                    htmlFor="resume-upload"
                    className={`flex items-center justify-between px-3 py-2 border ${resume ? 'border-purpleAccent bg-brand-800/50' : 'border-brand-700 bg-brand-800'} rounded-md cursor-pointer`}
                  >
                    <div className="flex items-center">
                      <Upload className="w-5 h-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-300">
                        {resume ? resume.name : 'Click to upload PDF, DOC, or DOCX'}
                      </span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-brand-700 rounded text-gray-300">
                      Browse
                    </span>
                  </label>
                </div>
                {resume && (
                  <div className="mt-2 flex items-center text-xs text-gray-400">
                    <FileText className="w-3 h-3 mr-1" />
                    {(resume.size / 1024 / 1024).toFixed(2)} MB
                  </div>
                )}
              </div>
              
              <div>
                <label htmlFor="cover-letter" className="block text-gray-200 mb-1.5">
                  Cover Letter *
                </label>
                <div className="relative">
                  <div className="absolute top-3 left-3 pointer-events-none">
                    <Briefcase className="w-5 h-5 text-gray-400" />
                  </div>
                  <Textarea
                    id="cover-letter"
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    className="pl-10 bg-brand-800 border-brand-700 focus:border-purpleAccent resize-none h-32"
                    placeholder="Tell us why you're interested in this position..."
                    required
                  />
                </div>
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
                disabled={isSubmitting}
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
                    Submit Application
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

export default JobApplicationForm;
