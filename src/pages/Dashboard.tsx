
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, BarChart2, Settings, ChevronDown, Filter, Calendar, Download, Clock, Users, Phone } from 'lucide-react';
import Navbar from '@/components/Navbar';
import DashboardTabs from '@/components/DashboardTabs';
import FooterSection from '@/components/FooterSection';
import LoadingScreen from '@/components/LoadingScreen';
import ContactModal from '@/components/ContactModal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContactModal, setShowContactModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [contentTypeFilter, setContentTypeFilter] = useState('All Types');
  const [dateRangeFilter, setDateRangeFilter] = useState('Last 7 Days');
  const [trustScoreFilter, setTrustScoreFilter] = useState('All Scores');
  const [recentAnalyses, setRecentAnalyses] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  
  useEffect(() => {
    // Redirect if not authenticated
    if (!isAuthenticated) {
      navigate('/');
      toast({
        title: "Authentication required",
        description: "Please log in to access the dashboard",
        variant: "destructive"
      });
    }
    
    // Load analysis history from localStorage
    const loadAnalysisHistory = () => {
      try {
        const storedAnalyses = localStorage.getItem('factfusion_analysis_history');
        if (storedAnalyses) {
          const analyses = JSON.parse(storedAnalyses);
          // Filter by current user if user exists
          const userAnalyses = user?.id 
            ? analyses.filter(a => a.userId === user.id) 
            : analyses;
          
          // Apply any filters here
          let filteredAnalyses = applyFilters(userAnalyses);
          
          // Sort by date (most recent first)
          filteredAnalyses.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
          
          // Format for display
          const formattedAnalyses = filteredAnalyses.slice(0, 3).map(analysis => ({
            id: analysis.id,
            title: analysis.fileName || 'Untitled Analysis',
            type: getFileType(analysis.fileType),
            date: formatDate(analysis.date),
            score: analysis.trustScore
          }));
          
          setRecentAnalyses(formattedAnalyses);
        }
      } catch (error) {
        console.error('Error loading analysis history:', error);
        // Use demo data if error loading
        setRecentAnalyses([
          {
            id: 1,
            title: "Climate change article",
            type: "Text",
            date: "2 hours ago",
            score: 35
          },
          {
            id: 2,
            title: "Political speech recording",
            type: "Audio",
            date: "Yesterday",
            score: 82
          },
          {
            id: 3,
            title: "News footage verification",
            type: "Video",
            date: "3 days ago",
            score: 68
          }
        ]);
      }
    };
    
    // Shorter loading time for internal pages
    const timer = setTimeout(() => {
      setIsLoading(false);
      loadAnalysisHistory();
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, navigate, user?.id, contentTypeFilter, dateRangeFilter, trustScoreFilter, searchQuery]);
  
  const getFileType = (mimeType) => {
    if (!mimeType) return 'Unknown';
    if (mimeType.startsWith('image/')) return 'Image';
    if (mimeType.startsWith('video/')) return 'Video';
    if (mimeType.startsWith('audio/')) return 'Audio';
    if (mimeType.startsWith('text/') || mimeType.includes('document')) return 'Text';
    return 'File';
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    
    if (diffDays === 0) {
      if (diffHours < 1) return 'Just now';
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString();
  };
  
  const applyFilters = (analyses) => {
    return analyses.filter(analysis => {
      // Apply content type filter
      if (contentTypeFilter !== 'All Types') {
        const type = getFileType(analysis.fileType);
        if (type !== contentTypeFilter) return false;
      }
      
      // Apply date range filter
      if (dateRangeFilter !== 'All Time') {
        const analysisDate = new Date(analysis.date);
        const now = new Date();
        
        if (dateRangeFilter === 'Last 24 Hours') {
          if (now - analysisDate > 24 * 60 * 60 * 1000) return false;
        } else if (dateRangeFilter === 'Last 7 Days') {
          if (now - analysisDate > 7 * 24 * 60 * 60 * 1000) return false;
        } else if (dateRangeFilter === 'Last 30 Days') {
          if (now - analysisDate > 30 * 24 * 60 * 60 * 1000) return false;
        }
      }
      
      // Apply trust score filter
      if (trustScoreFilter !== 'All Scores') {
        const score = analysis.trustScore;
        
        if (trustScoreFilter === 'High Trust (80%+)' && score < 80) return false;
        if (trustScoreFilter === 'Medium Trust (60-80%)' && (score < 60 || score >= 80)) return false;
        if (trustScoreFilter === 'Low Trust (<60%)' && score >= 60) return false;
      }
      
      // Apply search query
      if (searchQuery && !analysis.fileName?.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      return true;
    });
  };
  
  const getTrustColor = (score: number) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 60) return "bg-yellow-400";
    return "bg-red-500";
  };
  
  const handleDownload = () => {
    // Create a sample file to download
    const content = {
      report: "FactFusion Analysis Report",
      date: new Date().toISOString(),
      results: {
        trustScore: 78,
        sources: 12,
        claims: 8,
        verified: 6,
        unverified: 2
      }
    };
    
    const blob = new Blob([JSON.stringify(content, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'factfusion-analysis-report.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Download started",
      description: "Your analysis report is being downloaded"
    });
  };
  
  const handleViewOpenPosition = () => {
    navigate('/about');
    toast({
      title: "Careers",
      description: "View our open positions on the About page"
    });
  };
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };
  
  return (
    <>
      {isLoading ? (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="min-h-screen bg-brand-950 overflow-x-hidden">
          <Navbar />
          
          <main className="pt-24 pb-20 px-4">
            <div className="container mx-auto max-w-7xl">
              <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <motion.div 
                  className="lg:w-64 flex-shrink-0"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="glass-card rounded-xl p-5 mb-6">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input 
                        placeholder="Search analyses..." 
                        className="pl-10 bg-brand-800/50 border-brand-700"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-xl p-5 mb-6">
                    <h3 className="font-medium mb-4">Recent Analyses</h3>
                    <div className="space-y-3">
                      {recentAnalyses.length > 0 ? (
                        recentAnalyses.map((analysis) => (
                          <motion.div 
                            key={analysis.id}
                            className="p-3 bg-brand-800/50 rounded-lg flex items-center justify-between cursor-pointer hover:bg-brand-800 transition-colors"
                            whileHover={{ y: -2 }}
                            transition={{ duration: 0.2 }}
                          >
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-sm truncate">{analysis.title}</h4>
                              <div className="flex items-center space-x-2 text-xs text-gray-400">
                                <span>{analysis.type}</span>
                                <span>•</span>
                                <span>{analysis.date}</span>
                              </div>
                            </div>
                            <div className={`w-2 h-8 rounded-full ${getTrustColor(analysis.score)}`}></div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-4 text-gray-400 text-sm">
                          No analyses found
                        </div>
                      )}
                    </div>
                    <Button 
                      variant="ghost" 
                      className="w-full mt-3 text-sm text-purpleAccent"
                      onClick={() => {
                        toast({
                          title: "All analyses",
                          description: "Viewing all your past analyses"
                        });
                      }}
                    >
                      View All
                    </Button>
                  </div>
                  
                  <div className="glass-card rounded-xl p-5 mb-6">
                    <h3 className="font-medium mb-4">Actions</h3>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-brand-700 bg-transparent hover:bg-brand-800"
                        onClick={handleDownload}
                      >
                        <Download className="w-4 h-4 mr-2" /> Download Report
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-brand-700 bg-transparent hover:bg-brand-800"
                        onClick={handleViewOpenPosition}
                      >
                        <Users className="w-4 h-4 mr-2" /> View Open Positions
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-brand-700 bg-transparent hover:bg-brand-800"
                        onClick={() => setShowContactModal(true)}
                      >
                        <Phone className="w-4 h-4 mr-2" /> Contact Us
                      </Button>
                    </div>
                  </div>
                  
                  <div className="glass-card rounded-xl p-5">
                    <h3 className="font-medium mb-4">Filters</h3>
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-sm text-gray-400">Content Type</label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="flex items-center justify-between bg-brand-800/50 p-2 rounded-lg cursor-pointer hover:bg-brand-800 transition-colors">
                              <span className="text-sm">{contentTypeFilter}</span>
                              <ChevronDown className="w-4 h-4" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {['All Types', 'Text', 'Image', 'Audio', 'Video'].map(type => (
                              <DropdownMenuItem 
                                key={type}
                                onClick={() => setContentTypeFilter(type)}
                              >
                                {type}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-sm text-gray-400">Date Range</label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="flex items-center justify-between bg-brand-800/50 p-2 rounded-lg cursor-pointer hover:bg-brand-800 transition-colors">
                              <span className="text-sm">{dateRangeFilter}</span>
                              <Calendar className="w-4 h-4" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {['Last 24 Hours', 'Last 7 Days', 'Last 30 Days', 'All Time'].map(range => (
                              <DropdownMenuItem 
                                key={range}
                                onClick={() => setDateRangeFilter(range)}
                              >
                                {range}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      
                      <div className="space-y-1">
                        <label className="text-sm text-gray-400">Trust Score</label>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <div className="flex items-center justify-between bg-brand-800/50 p-2 rounded-lg cursor-pointer hover:bg-brand-800 transition-colors">
                              <span className="text-sm">{trustScoreFilter}</span>
                              <Filter className="w-4 h-4" />
                            </div>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {['All Scores', 'High Trust (80%+)', 'Medium Trust (60-80%)', 'Low Trust (<60%)'].map(score => (
                              <DropdownMenuItem 
                                key={score}
                                onClick={() => setTrustScoreFilter(score)}
                              >
                                {score}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-4">
                      <Button 
                        variant="outline" 
                        className="flex-1 text-xs border-brand-700 bg-transparent"
                        onClick={() => {
                          setContentTypeFilter('All Types');
                          setDateRangeFilter('Last 7 Days');
                          setTrustScoreFilter('All Scores');
                          setSearchQuery('');
                        }}
                      >
                        Reset
                      </Button>
                      <Button 
                        className="flex-1 text-xs bg-gradient-to-r from-purpleAccent to-blueAccent"
                        onClick={() => {
                          toast({
                            title: "Filters applied",
                            description: "Your analysis list has been updated"
                          });
                        }}
                      >
                        Apply
                      </Button>
                    </div>
                  </div>
                </motion.div>
                
                {/* Main content */}
                <motion.div 
                  className="flex-1"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <h1 className="text-2xl font-bold">Analysis Dashboard</h1>
                      <p className="text-gray-400">Verify content across different media formats</p>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button 
                        variant="outline" 
                        className="border-brand-700 bg-transparent"
                        onClick={handleDownload}
                      >
                        <Download className="w-4 h-4 mr-2" /> Export
                      </Button>
                      <Button 
                        className="bg-gradient-to-r from-purpleAccent to-blueAccent"
                        onClick={() => navigate('/analysis')}
                      >
                        New Analysis
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <motion.div 
                        className="glass-card p-4 rounded-xl"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="text-gray-400 text-sm">Analyses Completed</h3>
                          <BarChart2 className="w-5 h-5 text-purpleAccent" />
                        </div>
                        <div className="text-2xl font-bold">{recentAnalyses.length || 0}</div>
                        <div className="text-xs text-green-400 flex items-center mt-1">
                          <span>↑ 12% vs last month</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="glass-card p-4 rounded-xl"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="text-gray-400 text-sm">Average Trust Score</h3>
                          <Settings className="w-5 h-5 text-blueAccent" />
                        </div>
                        <div className="text-2xl font-bold">
                          {recentAnalyses.length 
                            ? (recentAnalyses.reduce((sum, a) => sum + a.score, 0) / recentAnalyses.length).toFixed(1) + '%'
                            : '0%'}
                        </div>
                        <div className="text-xs text-yellow-400 flex items-center mt-1">
                          <span>Mixed reliability levels</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="glass-card p-4 rounded-xl"
                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                      >
                        <div className="flex justify-between mb-2">
                          <h3 className="text-gray-400 text-sm">Last Analysis</h3>
                          <Clock className="w-5 h-5 text-purpleAccent" />
                        </div>
                        <div className="text-lg font-bold truncate">
                          {recentAnalyses.length > 0 ? recentAnalyses[0].title : 'No analyses yet'}
                        </div>
                        <div className="text-xs text-gray-400 flex items-center mt-1">
                          <span>{recentAnalyses.length > 0 ? recentAnalyses[0].date : 'N/A'}</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                  
                  <div className="h-[600px]">
                    <DashboardTabs />
                  </div>
                </motion.div>
              </div>
            </div>
          </main>
          
          <FooterSection />
          
          {showContactModal && (
            <ContactModal onClose={() => setShowContactModal(false)} />
          )}
        </div>
      )}
    </>
  );
};

export default Dashboard;
