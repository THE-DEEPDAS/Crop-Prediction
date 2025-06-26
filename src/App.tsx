import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { PredictionForm } from './components/PredictionForm';
import { Results } from './components/Results';
import { Navigation } from './components/Navigation';
import { Particles } from './components/Particles';
import { Footer } from './components/Footer';
import './styles/animations.css';

function App() {
  const [currentView, setCurrentView] = useState<'home' | 'predict' | 'results'>('home');
  const [predictionData, setPredictionData] = useState(null);
  const [userStats, setUserStats] = useState({
    predictionsCount: 0,
    accuracy: 0,
    level: 1,
    experience: 0
  });

  const handlePrediction = (data: any) => {
    setPredictionData(data);
    setCurrentView('results');
    setUserStats(prev => ({
      ...prev,
      predictionsCount: prev.predictionsCount + 1,
      experience: prev.experience + 100,
      level: Math.floor((prev.experience + 100) / 500) + 1
    }));
  };

  const handleNavigation = (view: 'home' | 'predict' | 'results') => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900 relative overflow-hidden">
      <Particles />
      <Navigation 
        currentView={currentView} 
        onNavigate={handleNavigation}
        userStats={userStats}
      />
      
      <main className="relative z-10">
        {currentView === 'home' && (
          <Hero onStartPrediction={() => setCurrentView('predict')} />
        )}
        
        {currentView === 'predict' && (
          <PredictionForm onPrediction={handlePrediction} />
        )}
        
        {currentView === 'results' && predictionData && (
          <Results 
            data={predictionData} 
            onNewPrediction={() => setCurrentView('predict')}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
}

export default App;