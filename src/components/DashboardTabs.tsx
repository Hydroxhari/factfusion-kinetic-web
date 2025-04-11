
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, Image, Music, Video, ArrowRight, AlertCircle, CheckCircle, HelpCircle, DownloadCloud, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import TrustScoreVisualizer from './TrustScoreVisualizer';

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setShowResults(false);
  };
  
  const handleAnalyze = () => {
    setIsLoading(true);
    setShowResults(false);
    
    setTimeout(() => {
      setIsLoading(false);
      setShowResults(true);
    }, 2000);
  };
  
  const tabContent = {
    text: {
      title: "Text Analysis Dashboard",
      description: "Analyze articles, social media posts, and news content",
      claim: "Global temperatures have risen by 5°C in the last decade.",
      sources: ["Climate Science Journal", "Global Weather Data", "International Panel Reports"],
      score: 35,
      explanation: "This claim significantly exaggerates the actual temperature increase. Scientific consensus shows global temperatures have risen approximately 0.2°C in the last decade, not 5°C as claimed."
    },
    image: {
      title: "Image Verification Dashboard",
      description: "Detect manipulated images and verify visual content",
      claim: "Photo shows political leader at controversial event.",
      sources: ["Image metadata", "Visual comparison algorithms", "Event records"],
      score: 20,
      explanation: "Our analysis detected significant manipulation. This image has been digitally altered to place the subject at an event they never attended. The lighting inconsistencies and digital artifacts confirm tampering."
    },
    audio: {
      title: "Audio Authentication Dashboard",
      description: "Analyze voice recordings and audio content",
      claim: "Recording of CEO announcing company bankruptcy.",
      sources: ["Voice pattern analysis", "Audio forensics", "Company statements"],
      score: 65,
      explanation: "This audio clip contains authentic voice patterns matching the claimed speaker, but context analysis suggests selective editing to change the meaning of the statements. Some segments appear to be from different recordings."
    },
    video: {
      title: "Video Verification Dashboard",
      description: "Detect deepfakes and analyze video content",
      claim: "Video shows natural disaster occurring in real-time.",
      sources: ["Visual analysis", "Metadata examination", "Location verification"],
      score: 85,
      explanation: "Our analysis confirms this is authentic footage of the claimed event. Metadata, lighting conditions, and environmental details all match verified reports of this natural disaster. No evidence of manipulation was detected."
    }
  };
  
  const tabIcons = {
    text: <FileText className="w-5 h-5" />,
    image: <Image className="w-5 h-5" />,
    audio: <Music className="w-5 h-5" />,
    video: <Video className="w-5 h-5" />
  };
  
  const getStatusIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-5 h-5 text-green-500" />;
    if (score >= 60) return <HelpCircle className="w-5 h-5 text-yellow-400" />;
    return <AlertCircle className="w-5 h-5 text-red-500" />;
  };
  
  const getStatusText = (score: number) => {
    if (score >= 80) return "Verified";
    if (score >= 60) return "Partially Verified";
    return "Misleading";
  };
  
  const getStatusColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-400";
    return "bg-red-500";
  };
  
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
    <div className="glass-card rounded-xl p-6 overflow-hidden h-full">
      <Tabs defaultValue="text" value={activeTab} onValueChange={handleTabChange}>
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
        
        {(['text', 'image', 'audio', 'video'] as const).map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0 space-y-6">
            <div className="flex flex-col space-y-4">
              <h2 className="text-xl font-bold">{tabContent[tab].title}</h2>
              <p className="text-gray-400">{tabContent[tab].description}</p>
              
              <div className="flex justify-end">
                {!isLoading && !showResults && (
                  <Button 
                    className="bg-gradient-to-r from-purpleAccent to-blueAccent ripple-btn"
                    onClick={handleAnalyze}
                  >
                    Run Analysis <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                )}
                
                {isLoading && (
                  <Button disabled className="bg-brand-800">
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Analyzing...
                  </Button>
                )}
              </div>
              
              {isLoading && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="py-8"
                >
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Loading content...</span>
                        <span>25%</span>
                      </div>
                      <Progress value={25} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Analyzing claims...</span>
                        <span>65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Verifying sources...</span>
                        <span>40%</span>
                      </div>
                      <Progress value={40} className="h-2" />
                    </div>
                    
                    <div className="flex justify-center mt-6">
                      <div className="text-sm text-gray-400 animate-pulse">
                        Analyzing content for factual accuracy...
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              <AnimatePresence>
                {showResults && (
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    className="py-4"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
                        <div className="bg-brand-800/50 p-4 rounded-lg space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">Claim Analysis</h3>
                            <div className="flex items-center space-x-2 bg-brand-900 px-3 py-1 rounded-full text-sm">
                              {getStatusIcon(tabContent[activeTab].score)}
                              <span>{getStatusText(tabContent[activeTab].score)}</span>
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Identified Claim:</div>
                            <div className="bg-brand-900/50 p-3 rounded-lg text-white">
                              "{tabContent[activeTab].claim}"
                            </div>
                          </div>
                          
                          <div>
                            <div className="text-sm text-gray-400 mb-1">Sources Consulted:</div>
                            <div className="space-y-2">
                              {tabContent[activeTab].sources.map((source, idx) => (
                                <div key={idx} className="bg-brand-900/50 p-2 rounded-lg text-sm flex justify-between items-center">
                                  <span>{source}</span>
                                  <Button variant="ghost" size="sm" className="h-6 text-xs">View</Button>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <h3 className="font-semibold">Analysis Explanation</h3>
                          <div className="bg-brand-800/50 p-4 rounded-lg">
                            <p className="text-gray-300">{tabContent[activeTab].explanation}</p>
                          </div>
                        </div>
                        
                        <div className="flex space-x-3 justify-end pt-2">
                          <Button 
                            variant="outline" 
                            className="border-brand-700 bg-transparent flex items-center space-x-2"
                          >
                            <DownloadCloud className="w-4 h-4 mr-1" />
                            Export Report
                          </Button>
                          <Button className="bg-gradient-to-r from-purpleAccent to-blueAccent">
                            View Details
                          </Button>
                        </div>
                      </motion.div>
                      
                      <motion.div variants={itemVariants} className="flex justify-center">
                        <div className="w-full">
                          <TrustScoreVisualizer score={tabContent[activeTab].score} />
                          
                          <div className="mt-6 space-y-2">
                            <h4 className="text-sm font-medium text-center">Verification Metrics</h4>
                            <div className="space-y-3">
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Source Reliability</span>
                                  <span>75%</span>
                                </div>
                                <div className="h-1.5 bg-brand-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-purpleAccent" style={{ width: '75%' }}></div>
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Content Consistency</span>
                                  <span>62%</span>
                                </div>
                                <div className="h-1.5 bg-brand-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-purpleAccent" style={{ width: '62%' }}></div>
                                </div>
                              </div>
                              
                              <div className="space-y-1">
                                <div className="flex justify-between text-xs">
                                  <span>Factual Accuracy</span>
                                  <span>38%</span>
                                </div>
                                <div className="h-1.5 bg-brand-800 rounded-full overflow-hidden">
                                  <div className="h-full bg-blueAccent" style={{ width: '38%' }}></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default DashboardTabs;
