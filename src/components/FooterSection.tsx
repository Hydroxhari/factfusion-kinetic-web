
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FooterSection = () => {
  return (
    <footer className="bg-brand-950 pt-16 pb-8 border-t border-brand-800 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purpleAccent to-blueAccent"></div>
      
      {/* Glowing orbs */}
      <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-purpleAccent/10 blur-3xl"></div>
      <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-blueAccent/10 blur-3xl"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center space-x-2 group mb-6">
              <div className="relative w-8 h-8 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-purpleAccent to-blueAccent rounded-full 
                              group-hover:scale-110 transition-transform duration-300"></div>
                <div className="absolute inset-1 bg-brand-950 rounded-full flex items-center justify-center
                              group-hover:scale-90 transition-transform duration-300">
                  <span className="font-bold text-white text-sm">FF</span>
                </div>
              </div>
              <span className="font-bold text-xl tracking-tight group-hover:text-white transition-colors duration-300">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purpleAccent to-blueAccent">
                  Fact
                </span>
                Fusion
              </span>
            </Link>
            
            <p className="text-gray-400 mb-6 max-w-md">
              FactFusion combines cutting-edge AI technology with comprehensive data analysis to provide 
              the most accurate and reliable fact-checking available.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-400 hover:text-gray-300 transition-colors">
                <Mail className="w-5 h-5 text-purpleAccent" />
                <a href="mailto:info@factfusion.com">info@factfusion.com</a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-gray-300 transition-colors">
                <Phone className="w-5 h-5 text-purpleAccent" />
                <a href="tel:+11234567890">+1 (123) 456-7890</a>
              </div>
              <div className="flex items-center space-x-3 text-gray-400 hover:text-gray-300 transition-colors">
                <MapPin className="w-5 h-5 text-purpleAccent" />
                <span>123 Truth Street, Knowledge City</span>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center">
                  <ArrowRight className="w-3 h-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Press</Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-2">
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/analysis" className="text-gray-400 hover:text-white transition-colors">Analysis</Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-400 hover:text-white transition-colors">Dashboard</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">API Access</Link>
              </li>
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">Integrations</Link>
              </li>
            </ul>
          </div>
          
          <div className="md:col-span-3">
            <h3 className="text-white font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-400 mb-4">Subscribe to our newsletter for the latest updates on fact-checking tech.</p>
            
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="bg-brand-800 border border-brand-700 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-purpleAccent flex-grow"
              />
              <Button className="rounded-l-none bg-gradient-to-r from-purpleAccent to-blueAccent hover:opacity-90 ripple-btn">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-brand-800 pt-6 mt-6 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-500 text-sm mb-4 md:mb-0">
            © 2025 FactFusion. All rights reserved.
          </div>
          
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Terms</Link>
            <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Privacy</Link>
            <Link to="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
