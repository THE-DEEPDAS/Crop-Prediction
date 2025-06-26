import React from 'react';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 bg-black/20 backdrop-blur-xl border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">🌾 CropPredict</h3>
            <p className="text-green-200 mb-4">
              Empowering farmers with AI-driven crop prediction technology.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-green-300 hover:text-white transition-colors duration-200">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors duration-200">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-green-300 hover:text-white transition-colors duration-200">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Features</h4>
            <ul className="space-y-2 text-green-200">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Crop Prediction</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Soil Analysis</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Weather Integration</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Yield Forecasting</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2 text-green-200">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">API Reference</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Community</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Technology</h4>
            <ul className="space-y-2 text-green-200">
              <li>Machine Learning</li>
              <li>React & TypeScript</li>
              <li>Node.js & Express</li>
              <li>MongoDB Database</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center">
          <p className="text-green-200 flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-2 text-red-400" /> for farmers worldwide
          </p>
        </div>
      </div>
    </footer>
  );
};