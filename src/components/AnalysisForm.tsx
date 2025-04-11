
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Image, Music, Video, ArrowRight, X, Loader } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import TrustScoreVisualizer from './TrustScoreVisualizer';

const AnalysisForm = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [textInput, setTextInput] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trustScore, setTrustScore] = useState(0);
  const { toast } = useToast();
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setTextInput('');
    setFileUrl('');
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileUrl(url);
    }
  };
  
  const clearFile = () => {
    setFileUrl('');
  };
  
  const handleAnalyze = () => {
    if ((activeTab === 'text' && !textInput) || (activeTab !== 'text' && !fileUrl)) {
      toast({
        title: "Input required",
        description: "Please provide content to analyze.",
        variant: "destructive"
      });
      return;
    }
    
    setIsAnalyzing(true);
    setShowResults(false);
    
    // Simulate analysis process
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
      
      // Generate random score between 30 and 95 for demo
      const randomScore = Math.floor(Math.random() * 65) + 30;
      setTrustScore(randomScore);
    }, 3000);
  };
  
  const tabIcons = {
    text: <FileText className="w-5 h-5" />,
    image: <Image className="w-5 h-5" />,
    audio: <Music className="w-5 h-5" />,
    video: <Video className="w-5 h-5" />
  };
  
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };
  
  return (
    <motion.div 
      className="glass-card rounded-xl p-6 sm:p-8 w-full max-w-3xl mx-auto"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2 
        className="text-2xl font-bold mb-6 text-center"
        variants={itemVariants}
      >
        Fact Check Any Content
      </motion.h2>
      
      <motion.div variants={itemVariants}>
        <Tabs defaultValue="text" value={activeTab} onValueChange={handleTabChange} className="w-full">
          <TabsList className="grid grid-cols-4 mb-6">
            {(['text', 'image', 'audio', 'video'] as const).map((tab) => (
              <TabsTrigger 
                key={tab} 
                value={tab}
                className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purpleAccent data-[state=active]:to-blueAccent data-[state=active]:text-white flex items-center gap-2"
              >
                {tabIcons[tab]}
                <span className="hidden sm:inline capitalize">{tab}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value="text" className="mt-0 space-y-4">
            <Textarea
              placeholder="Paste the text content you want to analyze..."
              className="h-40 resize-none bg-brand-800/50 border-brand-700"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </TabsContent>
          
          {['image', 'audio', 'video'].map((type) => (
            <TabsContent key={type} value={type} className="mt-0 space-y-4">
              {!fileUrl ? (
                <div className="border-2 border-dashed border-brand-700 rounded-lg p-10 text-center">
                  <Input
                    type="file"
                    accept={type === 'image' ? 'image/*' : type === 'audio' ? 'audio/*' : 'video/*'}
                    className="hidden"
                    id={`${type}-upload`}
                    onChange={handleFileChange}
                  />
                  <label 
                    htmlFor={`${type}-upload`}
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <div className="w-16 h-16 rounded-full bg-brand-800 flex items-center justify-center mb-4">
                      {tabIcons[type as keyof typeof tabIcons]}
                    </div>
                    <p className="text-gray-300 mb-2">
                      Drag and drop your {type} file here, or click to browse
                    </p>
                    <p className="text-sm text-gray-500">
                      Supported formats: {type === 'image' ? 'JPG, PNG, GIF' : type === 'audio' ? 'MP3, WAV, OGG' : 'MP4, MOV, AVI'}
                    </p>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <button 
                    className="absolute top-2 right-2 p-1 bg-black/50 rounded-full z-10"
                    onClick={clearFile}
                  >
                    <X className="w-5 h-5" />
                  </button>
                  
                  {type === 'image' && (
                    <div className="w-full h-48 relative">
                      <img 
                        src={fileUrl} 
                        alt="Preview" 
                        className="w-full h-full object-contain rounded-lg"
                      />
                    </div>
                  )}
                  
                  {type === 'audio' && (
                    <audio controls className="w-full">
                      <source src={fileUrl} />
                      Your browser does not support the audio element.
                    </audio>
                  )}
                  
                  {type === 'video' && (
                    <video controls className="w-full h-48 object-contain rounded-lg">
                      <source src={fileUrl} />
                      Your browser does not support the video element.
                    </video>
                  )}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
      
      <motion.div
        className="mt-8 flex justify-center"
        variants={itemVariants}
      >
        <Button 
          className={`px-8 py-6 text-lg ripple-btn ${isAnalyzing ? 'bg-brand-800' : 'bg-gradient-to-r from-purpleAccent to-blueAccent'}`}
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          {isAnalyzing ? (
            <>
              <Loader className="w-5 h-5 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              Analyze <ArrowRight className="ml-2 w-5 h-5" />
            </>
          )}
        </Button>
      </motion.div>
      
      {showResults && (
        <motion.div 
          className="mt-10 border-t border-brand-700 pt-6"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold mb-2">Analysis Results</h3>
            <p className="text-gray-400">Here's what our fact-checking AI found about your content.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-full md:w-1/3 flex justify-center">
              <TrustScoreVisualizer score={trustScore} />
            </div>
            
            <div className="w-full md:w-2/3 space-y-4">
              <div className="bg-brand-800/50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Key Findings</h4>
                <ul className="space-y-2 text-sm text-gray-300">
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-yellow-400">•</div>
                    <div>Some claims in this content could not be verified against our database.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-green-500">•</div>
                    <div>Sources referenced appear to be legitimate.</div>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="mt-1 text-red-500">•</div>
                    <div>Statistical data presented shows some discrepancies with official records.</div>
                  </li>
                </ul>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">Detailed Report</h4>
                <div className="bg-brand-800/50 p-3 rounded-lg text-sm text-gray-300">
                  <p>Our analysis indicates that this content contains a mix of accurate and questionable information. While some facts align with verified data, others are presented in a potentially misleading context.</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-2">
                <Button variant="outline" className="bg-transparent border-brand-700 text-gray-300">
                  Export PDF
                </Button>
                <Button className="bg-gradient-to-r from-purpleAccent to-blueAccent">
                  View Full Analysis
                </Button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AnalysisForm;
