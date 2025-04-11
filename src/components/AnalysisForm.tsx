
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Loader, Download, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import TrustScoreVisualizer from './TrustScoreVisualizer';
import { useAuthContext } from '@/contexts/AuthContext';
import FileUpload from './FileUpload';
import FeedbackForm from './FeedbackForm';
import { exportToPdf, exportToJson } from '@/utils/exportUtils';

const AnalysisForm = () => {
  const { user } = useAuthContext();
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trustScore, setTrustScore] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [analysisId, setAnalysisId] = useState('');
  const resultRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  const fullText = "Analysis complete! Our AI has finished analyzing your content and generated a detailed report.";
  
  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
  };
  
  const handleAnalyze = () => {
    if (!file) {
      toast({
        title: "File required",
        description: "Please upload a file to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    setShowResults(false);
    setTypingText('');
    
    // Simulate analysis process
    const analysisTime = Math.floor(Math.random() * 3000) + 3000; // 3-6 seconds
    
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      
      // Generate random score between 30 and 95 for demo
      const randomScore = Math.floor(Math.random() * 65) + 30;
      setTrustScore(randomScore);
      
      // Create analysis ID
      const newAnalysisId = `analysis_${Date.now()}`;
      setAnalysisId(newAnalysisId);
      
      // Start typing animation
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < fullText.length) {
          setTypingText(fullText.substring(0, i + 1));
          i++;
        } else {
          clearInterval(typingInterval);
        }
      }, 30);
      
      // Save analysis to mock database (localStorage)
      const analysisHistory = JSON.parse(localStorage.getItem('factfusion_analysis_history') || '[]');
      analysisHistory.push({
        id: newAnalysisId,
        userId: user?.id,
        fileName: file?.name,
        fileType: file?.type,
        trustScore: randomScore,
        date: new Date().toISOString(),
      });
      localStorage.setItem('factfusion_analysis_history', JSON.stringify(analysisHistory));
      
    }, analysisTime);
  };
  
  const handleDownloadPdf = async () => {
    if (!resultRef.current) return;
    
    setIsDownloading(true);
    
    try {
      const fileName = file?.name.split('.')[0] || 'analysis';
      const timestamp = new Date().toISOString().split('T')[0];
      
      await exportToPdf(resultRef.current, `${fileName}_analysis_${timestamp}`);
      
      toast({
        title: "PDF downloaded",
        description: "Your analysis report has been downloaded as PDF",
      });
    } catch (error) {
      console.error("PDF export error:", error);
      toast({
        title: "Download failed",
        description: "There was an error exporting to PDF",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleDownloadJson = () => {
    setIsDownloading(true);
    
    try {
      const fileName = file?.name.split('.')[0] || 'analysis';
      const timestamp = new Date().toISOString().split('T')[0];
      
      // Create analysis data object
      const analysisData = {
        id: analysisId,
        fileName: file?.name,
        fileType: file?.type,
        trustScore,
        analysisDate: new Date().toISOString(),
        user: {
          id: user?.id,
          name: user?.name,
          email: user?.email
        },
        results: {
          summary: "This content contains a mix of factual and potentially misleading information.",
          keyFindings: [
            "Some claims could not be verified against our database.",
            "Sources referenced appear to be legitimate.",
            "Statistical data presented shows some discrepancies with official records."
          ],
          detailedAnalysis: "Our analysis indicates that this content contains a mix of accurate and questionable information. While some facts align with verified data, others are presented in a potentially misleading context."
        }
      };
      
      exportToJson(analysisData, `${fileName}_analysis_${timestamp}`);
      
      toast({
        title: "JSON downloaded",
        description: "Your analysis data has been downloaded as JSON",
      });
    } catch (error) {
      console.error("JSON export error:", error);
      toast({
        title: "Download failed",
        description: "There was an error exporting to JSON",
        variant: "destructive"
      });
    } finally {
      setIsDownloading(false);
    }
  };
  
  // Show feedback form after analysis is complete and results have been shown for 10 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showResults) {
      timer = setTimeout(() => {
        if (!showFeedback) {
          setShowFeedback(true);
        }
      }, 10000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [showResults, showFeedback]);
  
  return (
    <motion.div 
      className="glass-card rounded-xl p-6 sm:p-8 w-full max-w-3xl mx-auto transform-gpu"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mb-8"
      >
        <FileUpload onFileSelect={handleFileSelect} />
      </motion.div>
      
      <motion.div
        className="flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Button 
          className="px-8 py-6 text-lg ripple-btn relative overflow-hidden"
          onClick={handleAnalyze}
          disabled={isAnalyzing || !file}
          style={{
            background: isAnalyzing 
              ? 'linear-gradient(90deg, #312e81, #312e81)' 
              : 'linear-gradient(90deg, #8B5CF6, #0EA5E9)'
          }}
        >
          {isAnalyzing ? (
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Analyzing...
            </motion.div>
          ) : (
            <motion.div
              className="flex items-center"
              whileHover={{ x: 5 }}
            >
              Analyze <ArrowRight className="ml-2 w-5 h-5" />
            </motion.div>
          )}
          
          {!isAnalyzing && (
            <motion.div
              className="absolute inset-0 bg-white"
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 0.1, 0],
                scale: [0.85, 1.05]
              }}
              transition={{ 
                repeat: Infinity,
                duration: 2,
                ease: "easeInOut"
              }}
              style={{ mixBlendMode: 'overlay' }}
            />
          )}
        </Button>
      </motion.div>
      
      <AnimatePresence>
        {showResults && (
          <motion.div 
            className="mt-10 border-t border-brand-700 pt-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            transition={{ duration: 0.5 }}
            ref={resultRef}
          >
            <motion.div 
              className="text-center mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-semibold mb-2">Analysis Results</h3>
              <p className="text-gray-400 h-6">{typingText}<span className="animate-pulse">|</span></p>
            </motion.div>
            
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <motion.div 
                className="w-full md:w-1/3 flex justify-center"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, type: "spring" }}
              >
                <TrustScoreVisualizer score={trustScore} />
              </motion.div>
              
              <motion.div 
                className="w-full md:w-2/3 space-y-4"
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div 
                  className="bg-brand-800/50 p-4 rounded-lg"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <h4 className="font-medium mb-2">Key Findings</h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    <motion.li 
                      className="flex items-start gap-2"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <div className="mt-1 text-yellow-400">•</div>
                      <div>Some claims in this content could not be verified against our database.</div>
                    </motion.li>
                    <motion.li 
                      className="flex items-start gap-2"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.9 }}
                    >
                      <div className="mt-1 text-green-500">•</div>
                      <div>Sources referenced appear to be legitimate.</div>
                    </motion.li>
                    <motion.li 
                      className="flex items-start gap-2"
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 1.0 }}
                    >
                      <div className="mt-1 text-red-500">•</div>
                      <div>Statistical data presented shows some discrepancies with official records.</div>
                    </motion.li>
                  </ul>
                </motion.div>
                
                <motion.div 
                  className="space-y-2"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.1 }}
                >
                  <h4 className="font-medium">Detailed Report</h4>
                  <div className="bg-brand-800/50 p-3 rounded-lg text-sm text-gray-300">
                    <p>Our analysis indicates that this content contains a mix of accurate and questionable information. While some facts align with verified data, others are presented in a potentially misleading context.</p>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="flex justify-end space-x-3 pt-2"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="outline" 
                      className="bg-transparent border-brand-700 text-gray-300 flex items-center"
                      onClick={handleDownloadPdf}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <FileDown className="w-4 h-4 mr-2" />
                      )}
                      Export as PDF
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className="bg-gradient-to-r from-purpleAccent to-blueAccent flex items-center"
                      onClick={handleDownloadJson}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4 mr-2" />
                      )}
                      Download Report
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {showFeedback && (
          <FeedbackForm 
            onClose={() => setShowFeedback(false)} 
            analysisId={analysisId}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AnalysisForm;
