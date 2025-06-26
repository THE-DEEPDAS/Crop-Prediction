import React from 'react';
import { Home, Brain, BarChart3, User, Star } from 'lucide-react';

interface NavigationProps {
  currentView: 'home' | 'predict' | 'results';
  onNavigate: (view: 'home' | 'predict' | 'results') => void;
  userStats: {
    predictionsCount: number;
    accuracy: number;
    level: number;
    experience: number;
  };
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onNavigate, userStats }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-white">🌾 CropPredict</div>
          </div>
          
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('home')}
              className={`nav-item ${currentView === 'home' ? 'active' : ''}`}
            >
              <Home className="w-5 h-5" />
              <span>Home</span>
            </button>
            
            <button
              onClick={() => onNavigate('predict')}
              className={`nav-item ${currentView === 'predict' ? 'active' : ''}`}
            >
              <Brain className="w-5 h-5" />
              <span>Predict</span>
            </button>
            
            <div className="flex items-center space-x-4 bg-white/10 rounded-full px-4 py-2">
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span className="text-white text-sm font-medium">Level {userStats.level}</span>
              </div>
              
              <div className="w-20 h-2 bg-black/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-500"
                  style={{ width: `${(userStats.experience % 500) / 5}%` }}
                />
              </div>
              
              <div className="text-white text-sm">
                {userStats.predictionsCount} predictions
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};