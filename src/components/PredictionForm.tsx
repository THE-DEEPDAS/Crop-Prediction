import React, { useState } from 'react';
import { Thermometer, Droplets, Zap, MapPin, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Particles } from './Particles';

interface PredictionFormProps {
  onPrediction: (data: any) => void;
}

interface FormData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  temperature: number;
  humidity: number;
  ph: number;
  rainfall: number;
}

const RealisticPlantGrowth = () => (
  <div className="w-64 h-64 relative">
    <svg viewBox="0 0 200 200">
      <motion.path
        d="M 0 180 C 50 170, 150 190, 200 180 L 200 200 L 0 200 Z"
        fill="#5C4033"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      />
      <motion.path
        d="M 100 180 Q 105 120, 100 60"
        stroke="#228B22"
        strokeWidth="4"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, delay: 1 }}
      />
      <motion.path
        d="M 100 120 C 80 110, 70 90, 80 70"
        stroke="#32CD32"
        strokeWidth="3"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 2 }}
      />
      <motion.path
        d="M 100 100 C 120 90, 130 70, 120 50"
        stroke="#32CD32"
        strokeWidth="3"
        fill="transparent"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, delay: 2.5 }}
      />
      <motion.g
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 3.5 }}
      >
        <circle cx="100" cy="50" r="15" fill="#FFD700" />
        <circle cx="100" cy="50" r="8" fill="#DAA520" />
      </motion.g>
    </svg>
  </div>
);

export const PredictionForm: React.FC<PredictionFormProps> = ({ onPrediction }) => {
  const [formData, setFormData] = useState<FormData>({
    nitrogen: 50,
    phosphorus: 30,
    potassium: 40,
    temperature: 25,
    humidity: 60,
    ph: 6.5,
    rainfall: 200
  });

  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleInputChange = (field: keyof FormData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const steps = [
    { title: "The Seed's Dream", field: 'nitrogen', story: "A tiny seed, asleep in the dark earth, dreams of the sky." },
    { title: "Earth's Embrace", field: 'phosphorus', story: "The soil stirs, offering its strength, a cradle for new life." },
    { title: "The First Sprout", field: 'potassium', story: "A flicker of green, a brave sprout pushes through the darkness." },
    { title: "Drinking the Light", field: 'temperature', story: "The sun's warm kiss awakens the leaves, painting them in emerald hues." },
    { title: "Morning Dew", field: 'humidity', story: "A gentle mist clings to the leaves, a refreshing drink for a thirsty plant." },
    { title: "The Gift of Rain", field: 'rainfall', story: "The heavens open, and life-giving rain showers the growing plant." },
    { title: "The Final Bloom", field: 'ph', story: "In perfect balance, the plant reveals its ultimate creation - a radiant flower." },
  ];

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1);
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsTransitioning(false);
      }, 2500); // Duration of transition animation
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate ML prediction process
    await new Promise(resolve => setTimeout(resolve, 5000));

    // Mock prediction result
    const mockPredictions = [
      { crop: 'Rice', confidence: 92, suitable: true, yield: 'High' },
      { crop: 'Wheat', confidence: 88, suitable: true, yield: 'Medium' },
      { crop: 'Corn', confidence: 75, suitable: true, yield: 'Medium' },
      { crop: 'Cotton', confidence: 45, suitable: false, yield: 'Low' },
    ];

    const result = {
      predictions: mockPredictions,
      bestCrop: mockPredictions[0],
      soilHealth: 85,
      recommendations: [
        'Consider increasing phosphorus levels for optimal growth',
        'Monitor humidity levels during growing season',
        'Current pH level is ideal for rice cultivation'
      ],
      inputData: formData
    };

    setIsLoading(false);
    onPrediction(result);
  };

  const getFieldConfig = (field: keyof FormData) => {
    const configs = {
      nitrogen: { label: 'Nitrogen (N)', unit: 'kg/ha', min: 0, max: 200, icon: Zap, color: 'from-blue-500 to-cyan-500' },
      phosphorus: { label: 'Phosphorus (P)', unit: 'kg/ha', min: 0, max: 100, icon: Zap, color: 'from-purple-500 to-pink-500' },
      potassium: { label: 'Potassium (K)', unit: 'kg/ha', min: 0, max: 200, icon: Zap, color: 'from-orange-500 to-red-500' },
      temperature: { label: 'Temperature', unit: '°C', min: -10, max: 50, icon: Thermometer, color: 'from-red-500 to-orange-500' },
      humidity: { label: 'Humidity', unit: '%', min: 0, max: 100, icon: Droplets, color: 'from-blue-500 to-teal-500' },
      rainfall: { label: 'Rainfall', unit: 'mm', min: 0, max: 500, icon: Droplets, color: 'from-blue-600 to-blue-400' },
      ph: { label: 'pH Level', unit: '', min: 0, max: 14, icon: MapPin, color: 'from-green-500 to-emerald-500' }
    };
    return configs[field];
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 bg-gray-900 text-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-yellow-300">The Ritual is Complete</h2>
          <p className="text-green-200 text-lg mb-8">Witness the birth of your harvest's destiny.</p>
        </motion.div>
        <RealisticPlantGrowth />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 5.5 }} className="mt-8 text-xl text-yellow-300">
          <p>Your results are ready!</p>
        </motion.div>
      </div>
    );
  }

  const { field, title } = steps[currentStep];
  const config = getFieldConfig(field as keyof FormData);
  const Icon = config.icon;

  return (
    <div className="min-h-screen py-20 px-4 relative bg-gray-800 text-white">
      <Particles />
      <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} transition={{ duration: 0.5 }} className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-green-300 mb-4">
            {title}
          </h1>
          <p className="text-xl text-green-100">
            Chapter {currentStep + 1} of {steps.length}
          </p>
        </div>

        <div className="bg-black/20 backdrop-blur-lg rounded-3xl p-8 border border-white/10 shadow-2xl overflow-hidden relative">
          <AnimatePresence>
            {isTransitioning && (
              <motion.div
                className="absolute inset-0 bg-gray-900/50 backdrop-blur-md flex items-center justify-center text-center p-8 z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <motion.p
                  className="text-2xl md:text-3xl font-serif text-green-200"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                >
                  {steps[currentStep].story}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div initial={false} animate={{ opacity: isTransitioning ? 0.2 : 1 }} transition={{ duration: 0.5 }}>
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="input-group">
                <label className="block text-white font-medium mb-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className={`w-10 h-10 bg-gradient-to-r ${config.color} rounded-lg flex items-center justify-center`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg">{config.label}</span>
                  </div>
                </label>

                <div className="relative">
                  <input
                    type="range"
                    min={config.min}
                    max={config.max}
                    step={field === 'ph' ? 0.1 : 1}
                    value={formData[field as keyof FormData]}
                    onChange={(e) => handleInputChange(field as keyof FormData, parseFloat(e.target.value))}
                    className="slider w-full"
                  />
                  <div className="flex justify-between text-md text-green-200 mt-2">
                    <span>{config.min}</span>
                    <span className="font-semibold text-white text-lg">
                      {formData[field as keyof FormData]}{config.unit}
                    </span>
                    <span>{config.max}</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-8">
                {currentStep > 0 ? (
                  <button type="button" onClick={handlePreviousStep} className="predict-button group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-full shadow-2xl hover:shadow-gray-500/25 transition-all duration-300 hover:scale-105">
                    Previous Chapter
                  </button>
                ) : (
                  <div /> // Placeholder for alignment
                )}

                {currentStep < steps.length - 1 ? (
                  <button type="button" onClick={handleNextStep} className="predict-button group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105">
                    Next Chapter
                  </button>
                ) : (
                  <button type="submit" className="predict-button group inline-flex items-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-500 to-orange-600 rounded-full shadow-2xl hover:shadow-yellow-500/25 transition-all duration-300 hover:scale-105">
                    <Send className="mr-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                    Reveal Destiny
                  </button>
                )}
              </div>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};