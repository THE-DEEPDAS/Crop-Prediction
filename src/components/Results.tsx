import React, { useState, useEffect } from 'react';
import { Trophy, TrendingUp, AlertTriangle, Lightbulb, RefreshCw, Award } from 'lucide-react';

interface ResultsProps {
  data: {
    predictions: Array<{
      crop: string;
      confidence: number;
      suitable: boolean;
      yield: string;
    }>;
    bestCrop: {
      crop: string;
      confidence: number;
      suitable: boolean;
      yield: string;
    };
    soilHealth: number;
    recommendations: string[];
    inputData: any;
  };
  onNewPrediction: () => void;
}

export const Results: React.FC<ResultsProps> = ({ data, onNewPrediction }) => {
  const [showAnimation, setShowAnimation] = useState(false);
  const [achievementShown, setAchievementShown] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
    setTimeout(() => setAchievementShown(true), 2000);
  }, []);

  const getYieldColor = (cropYield: string) => {
    switch (cropYield.toLowerCase()) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'from-green-500 to-emerald-500';
    if (confidence >= 60) return 'from-yellow-500 to-orange-500';
    return 'from-red-500 to-pink-500';
  };

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Achievement Popup */}
        {achievementShown && (
          <div className="achievement-popup fixed top-20 right-4 z-50">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 p-4 rounded-lg shadow-2xl text-white">
              <div className="flex items-center space-x-3">
                <Award className="w-6 h-6" />
                <div>
                  <div className="font-bold">Achievement Unlocked!</div>
                  <div className="text-sm opacity-90">Prediction Master</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="text-center mb-12">
          <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full shadow-2xl mb-6 ${showAnimation ? 'celebration-bounce' : ''}`}>
            <Trophy className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Prediction Results
          </h1>
          <p className="text-xl text-green-200">
            Based on your farm's conditions, here are our recommendations
          </p>
        </div>

        {/* Best Crop Recommendation */}
        <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-xl rounded-3xl p-8 border border-green-500/30 shadow-2xl mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">🏆 Recommended Crop</h2>
            <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text mb-4">
              {data.bestCrop.crop}
            </div>
            <div className="flex justify-center items-center space-x-6 mb-6">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{data.bestCrop.confidence}%</div>
                <div className="text-green-200">Confidence</div>
              </div>
              <div className="text-center">
                <div className={`text-2xl font-bold ${getYieldColor(data.bestCrop.yield)}`}>
                  {data.bestCrop.yield}
                </div>
                <div className="text-green-200">Expected Yield</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white">{data.soilHealth}%</div>
                <div className="text-green-200">Soil Health</div>
              </div>
            </div>
          </div>
        </div>

        {/* All Predictions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {data.predictions.map((prediction, index) => (
            <div
              key={prediction.crop}
              className={`prediction-card ${showAnimation ? 'slide-up' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">{prediction.crop}</h3>
                {prediction.suitable ? (
                  <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                ) : (
                  <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                )}
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-200">Confidence</span>
                  <span className="text-white font-semibold">{prediction.confidence}%</span>
                </div>
                <div className="w-full h-2 bg-black/30 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${getConfidenceColor(prediction.confidence)} transition-all duration-1000 ease-out`}
                    style={{ width: `${prediction.confidence}%` }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-green-200">Expected Yield:</span>
                <span className={`font-semibold ${getYieldColor(prediction.yield)}`}>
                  {prediction.yield}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl mb-8">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">Smart Recommendations</h2>
          </div>
          
          <div className="space-y-4">
            {data.recommendations.map((recommendation, index) => (
              <div
                key={index}
                className={`flex items-start space-x-3 p-4 bg-white/5 rounded-xl border border-white/10 ${showAnimation ? 'fade-in' : ''}`}
                style={{ animationDelay: `${(index + 1) * 0.2}s` }}
              >
                <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-white text-sm font-bold">{index + 1}</span>
                </div>
                <p className="text-green-100">{recommendation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={onNewPrediction}
            className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
          >
            <RefreshCw className="mr-3 w-5 h-5" />
            New Prediction
          </button>
        </div>
      </div>
    </div>
  );
};