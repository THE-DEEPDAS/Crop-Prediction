import React from 'react';
import { Sprout, TrendingUp, Award, ChevronRight } from 'lucide-react';

interface HeroProps {
  onStartPrediction: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartPrediction }) => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-6xl mx-auto text-center">
        <div className="floating-animation mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-2xl mb-6">
            <Sprout className="w-12 h-12 text-white" />
          </div>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight">
          Crop
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
            {' '}Predict
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-green-100 mb-12 max-w-3xl mx-auto leading-relaxed">
          Harness the power of AI to predict the perfect crop for your farm. 
          Make data-driven decisions and maximize your harvest potential.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="feature-card group">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <TrendingUp className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">95% Accuracy</h3>
            <p className="text-green-200">Advanced ML algorithms for precise predictions</p>
          </div>
          
          <div className="feature-card group">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Award className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Gamified Experience</h3>
            <p className="text-green-200">Level up as you make more predictions</p>
          </div>
          
          <div className="feature-card group">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <Sprout className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Multiple Crops</h3>
            <p className="text-green-200">Support for 20+ different crop types</p>
          </div>
        </div>
        
        <button
          onClick={onStartPrediction}
          className="hero-button group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
        >
          Start Prediction
          <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
        </button>
      </div>
    </div>
  );
};