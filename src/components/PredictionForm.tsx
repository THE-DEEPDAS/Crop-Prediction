import React, { useState } from 'react';
import { Thermometer, Droplets, Zap, MapPin, Calendar, Send } from 'lucide-react';

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
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (field: keyof FormData, value: number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate ML prediction process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
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

  const steps = [
    { title: 'Soil Nutrients', fields: ['nitrogen', 'phosphorus', 'potassium'] },
    { title: 'Climate Conditions', fields: ['temperature', 'humidity', 'rainfall'] },
    { title: 'Soil Properties', fields: ['ph'] }
  ];

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
      <div className="min-h-screen flex items-center justify-center px-4 pt-20">
        <div className="text-center">
          <div className="loading-spinner mb-8"></div>
          <h2 className="text-3xl font-bold text-white mb-4">Analyzing Your Data</h2>
          <p className="text-green-200 text-lg mb-6">Our AI is processing your farm conditions...</p>
          <div className="w-80 h-2 bg-black/30 rounded-full overflow-hidden mx-auto">
            <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 loading-bar"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Farm Data Input
          </h1>
          <p className="text-xl text-green-200">
            Provide your farm's conditions for accurate crop prediction
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/20 shadow-2xl">
          <div className="flex justify-between items-center mb-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center">
                <div className={`step-indicator ${currentStep > index ? 'completed' : currentStep === index + 1 ? 'active' : ''}`}>
                  {index + 1}
                </div>
                {index < steps.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(formData).map(([field, value]) => {
                const config = getFieldConfig(field as keyof FormData);
                const Icon = config.icon;
                
                return (
                  <div key={field} className="input-group">
                    <label className="block text-white font-medium mb-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className={`w-8 h-8 bg-gradient-to-r ${config.color} rounded-lg flex items-center justify-center`}>
                          <Icon className="w-4 h-4 text-white" />
                        </div>
                        <span>{config.label}</span>
                      </div>
                    </label>
                    
                    <div className="relative">
                      <input
                        type="range"
                        min={config.min}
                        max={config.max}
                        step={field === 'ph' ? 0.1 : 1}
                        value={value}
                        onChange={(e) => handleInputChange(field as keyof FormData, parseFloat(e.target.value))}
                        className="slider w-full"
                      />
                      <div className="flex justify-between text-sm text-green-200 mt-2">
                        <span>{config.min}</span>
                        <span className="font-semibold text-white">
                          {value}{config.unit}
                        </span>
                        <span>{config.max}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center pt-8">
              <button
                type="submit"
                className="predict-button group inline-flex items-center px-12 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-500 to-emerald-600 rounded-full shadow-2xl hover:shadow-green-500/25 transition-all duration-300 hover:scale-105"
              >
                <Send className="mr-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                Predict Best Crop
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};