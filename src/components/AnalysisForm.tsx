
import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Image, Music, Video, ArrowRight, X, Loader, Download, FileDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import TrustScoreVisualizer from './TrustScoreVisualizer';
import { useAuthContext } from '@/contexts/AuthContext';

const fileSupportMap = {
  text: ['txt', 'doc', 'docx', 'pdf', 'rtf'],
  image: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
  audio: ['mp3', 'wav', 'ogg', 'm4a'],
  video: ['mp4', 'mov', 'avi', 'webm']
};

const AnalysisForm = () => {
  const { user } = useAuthContext();
  const [activeTab, setActiveTab] = useState('text');
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trustScore, setTrustScore] = useState(0);
  const [typingText, setTypingText] = useState('');
  const [isDownloading, setIsDownloading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const fullText = "Analysis complete! Our AI has finished analyzing your content and generated a detailed report.";
  
  const handleTabChange = (value: string) => {
    if (isAnalyzing) return;
    
    setActiveTab(value);
    setFile(null);
    setFileUrl('');
    setFileType('');
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    
    if (selectedFile) {
      // Check file type matches the active tab
      const fileExt = selectedFile.name.split('.').pop()?.toLowerCase() || '';
      const isValidType = fileSupportMap[activeTab as keyof typeof fileSupportMap].includes(fileExt);
      
      if (!isValidType) {
        toast({
          title: "Invalid file format",
          description: `Please select a ${activeTab} file. Supported formats: ${fileSupportMap[activeTab as keyof typeof fileSupportMap].join(', ')}`,
          variant: "destructive"
        });
        return;
      }
      
      setFile(selectedFile);
      setFileType(fileExt);
      const url = URL.createObjectURL(selectedFile);
      setFileUrl(url);
    }
  };
  
  const clearFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    setFile(null);
    setFileUrl('');
    setFileType('');
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
        id: `analysis_${Date.now()}`,
        userId: user?.id,
        fileName: file?.name,
        fileType: activeTab,
        trustScore: randomScore,
        date: new Date().toISOString(),
      });
      localStorage.setItem('factfusion_analysis_history', JSON.stringify(analysisHistory));
      
    }, analysisTime);
  };
  
  const handleDownload = (format: string) => {
    setIsDownloading(true);
    
    // Simulate download preparation
    setTimeout(() => {
      const fileName = file?.name.split('.')[0] || 'analysis';
      const timestamp = new Date().toISOString().split('T')[0];
      
      // Create a blob with mock content
      const content = `FactFusion Analysis Report
      
Date: ${new Date().toLocaleDateString()}
Analyzed Content: ${file?.name}
Trust Score: ${trustScore}%

SUMMARY:
This content has been analyzed by FactFusion's AI algorithm and received a trust score of ${trustScore}%.

KEY FINDINGS:
${trustScore > 80 ? '• Content appears to be highly factual and well-sourced.' : ''}
${trustScore > 60 && trustScore <= 80 ? '• Content contains mostly accurate information with some unverified claims.' : ''}
${trustScore > 40 && trustScore <= 60 ? '• Content contains a mix of factual and potentially misleading information.' : ''}
${trustScore <= 40 ? '• Content contains significant misinformation or unverified claims.' : ''}

For more details, please check the full analysis in your dashboard.
      
© ${new Date().getFullYear()} FactFusion - AI-Powered Fact Analysis
`;
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      
      // Create a download link and trigger it
      const a = document.createElement('a');
      a.href = url;
      a.download = `${fileName}_analysis_${timestamp}.${format === 'pdf' ? 'txt' : format}`; // Using txt for "pdf" in this demo
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsDownloading(false);
      }, 100);
      
      toast({
        title: "Download started",
        description: `Your analysis is being downloaded as ${format.toUpperCase()}`,
      });
    }, 1500);
  };
  
  const tabIcons = {
    text: <FileText className="w-5 h-5" />,
    image: <Image className="w-5 h-5" />,
    audio: <Music className="w-5 h-5" />,
    video: <Video className="w-5 h-5" />
  };
  
  return (
    <motion.div 
      className="glass-card rounded-xl p-6 sm:p-8 w-full max-w-3xl mx-auto transform-gpu"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="flex justify-center mb-8 gap-2 sm:gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {(['text', 'image', 'audio', 'video'] as const).map((tab) => (
          <motion.button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg flex items-center gap-2 transition-all duration-300 ${
              activeTab === tab
                ? 'bg-gradient-to-r from-purpleAccent to-blueAccent text-white shadow-lg'
                : 'bg-brand-800/60 text-gray-300 hover:bg-brand-800'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isAnalyzing}
          >
            {tabIcons[tab]}
            <span className="hidden sm:inline capitalize">{tab}</span>
          </motion.button>
        ))}
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
          className="mb-8"
        >
          {!fileUrl ? (
            <motion.div 
              className="border-2 border-dashed border-brand-700 rounded-lg p-8 text-center"
              whileHover={{ boxShadow: "0 0 15px rgba(139, 92, 246, 0.3)" }}
            >
              <Input
                type="file"
                accept={activeTab === 'text' 
                  ? '.txt,.doc,.docx,.pdf,.rtf' 
                  : activeTab === 'image' 
                    ? '.jpg,.jpeg,.png,.gif,.webp' 
                    : activeTab === 'audio' 
                      ? '.mp3,.wav,.ogg,.m4a' 
                      : '.mp4,.mov,.avi,.webm'
                }
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <motion.div 
                  className="w-16 h-16 rounded-full bg-brand-800 flex items-center justify-center mb-4"
                  animate={{ 
                    boxShadow: ['0 0 0 rgba(139, 92, 246, 0)', '0 0 15px rgba(139, 92, 246, 0.5)', '0 0 0 rgba(139, 92, 246, 0)']
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2
                  }}
                >
                  {tabIcons[activeTab]}
                </motion.div>
                <p className="text-gray-300 mb-2">
                  Click to upload a {activeTab} file
                </p>
                <p className="text-sm text-gray-500">
                  Supported formats: {fileSupportMap[activeTab as keyof typeof fileSupportMap].map(ext => `.${ext}`).join(', ')}
                </p>
              </label>
            </motion.div>
          ) : (
            <motion.div 
              className="relative bg-brand-800/50 rounded-lg overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <motion.button 
                className="absolute top-2 right-2 p-1.5 bg-black/50 backdrop-blur-sm rounded-full z-10"
                onClick={clearFile}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(239, 68, 68, 0.5)" }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="w-4 h-4" />
              </motion.button>
              
              <div className="p-4">
                <div className="flex items-center mb-3">
                  {activeTab === 'text' && <FileText className="w-5 h-5 mr-2 text-purpleAccent" />}
                  {activeTab === 'image' && <Image className="w-5 h-5 mr-2 text-purpleAccent" />}
                  {activeTab === 'audio' && <Music className="w-5 h-5 mr-2 text-purpleAccent" />}
                  {activeTab === 'video' && <Video className="w-5 h-5 mr-2 text-purpleAccent" />}
                  <span className="font-medium">{file?.name}</span>
                </div>
                
                {activeTab === 'image' && (
                  <div className="w-full h-48 relative rounded-md overflow-hidden">
                    <img 
                      src={fileUrl} 
                      alt="Preview" 
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                
                {activeTab === 'audio' && (
                  <audio controls className="w-full">
                    <source src={fileUrl} />
                    Your browser does not support the audio element.
                  </audio>
                )}
                
                {activeTab === 'video' && (
                  <video controls className="w-full h-48 object-contain rounded-lg">
                    <source src={fileUrl} />
                    Your browser does not support the video element.
                  </video>
                )}
                
                {activeTab === 'text' && fileType && (
                  <div className="bg-brand-700/30 p-3 rounded-md">
                    <div className="flex items-center text-sm text-gray-400">
                      <FileText className="w-4 h-4 mr-2" />
                      {fileType.toUpperCase()} document ready for analysis
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
      
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
                      onClick={() => handleDownload('pdf')}
                      disabled={isDownloading}
                    >
                      {isDownloading ? (
                        <Loader className="w-4 h-4 mr-2 animate-spin" />
                      ) : (
                        <FileDown className="w-4 h-4 mr-2" />
                      )}
                      Export PDF
                    </Button>
                  </motion.div>
                  
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      className="bg-gradient-to-r from-purpleAccent to-blueAccent flex items-center"
                      onClick={() => handleDownload('json')}
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
    </motion.div>
  );
};

export default AnalysisForm;
