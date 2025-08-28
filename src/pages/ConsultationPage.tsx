import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  VideoCameraIcon,
  CameraIcon,
  MicrophoneIcon,
  PhoneXMarkIcon,
  SparklesIcon,
  EyeIcon,
  DocumentTextIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ConsultationPage = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'doctor',
      text: 'Hello! I can see your uploaded image. Let me enhance it for better analysis.',
      timestamp: '10:30 AM',
    },
  ]);
  const [newMessage, setNewMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);
        toast.success('Image uploaded successfully!');
      };
      reader.readAsDataURL(file);
    }
  };

  const enhanceImage = async () => {
    if (!selectedImage) return;
    
    setIsAnalyzing(true);
    
    // Simulate AI enhancement
    setTimeout(() => {
      setEnhancedImage(selectedImage); // In real app, this would be the enhanced version
      setAnalysisResults({
        confidence: 0.87,
        detectedConditions: [
          {
            name: 'Acne Vulgaris',
            confidence: 0.82,
            description: 'Mild inflammatory acne lesions detected',
            requiresAttention: true,
          },
          {
            name: 'Hyperpigmentation',
            confidence: 0.65,
            description: 'Post-inflammatory hyperpigmentation spots',
            requiresAttention: false,
          },
        ],
        recommendations: [
          'Consider topical retinoid treatment',
          'Use gentle, non-comedogenic cleanser',
          'Apply broad-spectrum sunscreen daily',
        ],
        severity: 'low' as const,
      });
      setIsAnalyzing(false);
      toast.success('Image enhanced and analyzed!');
    }, 2000);
  };

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    
    const message = {
      id: messages.length + 1,
      sender: 'patient' as const,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    
    setMessages([...messages, message]);
    setNewMessage('');
    
    // Simulate doctor response
    setTimeout(() => {
      const doctorResponse = {
        id: messages.length + 2,
        sender: 'doctor' as const,
        text: 'Thank you for the additional information. Based on the image analysis and your symptoms, I recommend...',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, doctorResponse]);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Video Consultation</h1>
        <p className="text-gray-600 mt-2">Dr. Maria Santos - Dermatology</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Video Call Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="lg:col-span-2"
        >
          <div className="card p-0 overflow-hidden">
            <div className="aspect-video bg-gray-900 relative">
              {!isCallActive ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <VideoCameraIcon className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg">Call will start when the doctor joins</p>
                    <p className="text-sm text-gray-400 mt-2">Scheduled: Today at 10:00 AM</p>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0">
                  {/* Video feed would go here */}
                  <div className="w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="w-24 h-24 rounded-full bg-white bg-opacity-20 flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl font-bold">Dr</span>
                      </div>
                      <p className="text-lg font-medium">Dr. Maria Santos</p>
                    </div>
                  </div>
                  
                  {/* Small video of patient */}
                  <div className="absolute bottom-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white">
                    <div className="w-full h-full flex items-center justify-center text-white text-sm">
                      You
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Call Controls */}
            <div className="p-6 bg-gray-50 border-t">
              <div className="flex justify-center space-x-4">
                <button className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors">
                  <MicrophoneIcon className="h-6 w-6" />
                </button>
                <button className="p-3 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition-colors">
                  <VideoCameraIcon className="h-6 w-6" />
                </button>
                <button 
                  onClick={() => setIsCallActive(!isCallActive)}
                  className={`p-3 rounded-full transition-colors ${
                    isCallActive 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {isCallActive ? (
                    <PhoneXMarkIcon className="h-6 w-6" />
                  ) : (
                    <VideoCameraIcon className="h-6 w-6" />
                  )}
                </button>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="p-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
                >
                  <CameraIcon className="h-6 w-6" />
                </button>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>

          {/* AI Image Enhancement Section */}
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="card mt-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Image Enhancement & Analysis</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original Image */}
                <div>
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Original Image</h4>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    <img 
                      src={selectedImage} 
                      alt="Original" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Enhanced Image */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-gray-700">Enhanced Image</h4>
                    <button
                      onClick={enhanceImage}
                      disabled={isAnalyzing}
                      className="btn-primary text-sm py-1 px-3 disabled:opacity-50"
                    >
                      {isAnalyzing ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Enhancing...
                        </div>
                      ) : (
                        <div className="flex items-center">
                          <SparklesIcon className="h-4 w-4 mr-1" />
                          Enhance
                        </div>
                      )}
                    </button>
                  </div>
                  <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                    {enhancedImage ? (
                      <img 
                        src={enhancedImage} 
                        alt="Enhanced" 
                        className="w-full h-full object-cover filter brightness-110 contrast-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-400">
                        <SparklesIcon className="h-12 w-12" />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Analysis Results */}
              {analysisResults && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  className="mt-6 p-4 bg-blue-50 rounded-lg"
                >
                  <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center">
                    <EyeIcon className="h-4 w-4 mr-1" />
                    AI Analysis Results (Confidence: {(analysisResults.confidence * 100).toFixed(0)}%)
                  </h4>
                  
                  <div className="space-y-3">
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">Detected Conditions:</h5>
                      {analysisResults.detectedConditions.map((condition: any, index: number) => (
                        <div key={index} className="bg-white p-3 rounded border">
                          <div className="flex justify-between items-start mb-1">
                            <span className="font-medium text-gray-900">{condition.name}</span>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              condition.requiresAttention 
                                ? 'bg-yellow-100 text-yellow-800' 
                                : 'bg-green-100 text-green-800'
                            }`}>
                              {(condition.confidence * 100).toFixed(0)}% confident
                            </span>
                          </div>
                          <p className="text-sm text-gray-600">{condition.description}</p>
                        </div>
                      ))}
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium text-gray-700 mb-2">AI Recommendations:</h5>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {analysisResults.recommendations.map((rec: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="text-blue-600 mr-2">•</span>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </motion.div>

        {/* Chat Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="lg:col-span-1"
        >
          <div className="card p-0 h-96 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 flex items-center">
                <DocumentTextIcon className="h-5 w-5 mr-2" />
                Consultation Notes
              </h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === 'patient' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.sender === 'patient'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <p>{message.text}</p>
                    <p className={`text-xs mt-1 ${
                      message.sender === 'patient' ? 'text-blue-200' : 'text-gray-500'
                    }`}>
                      {message.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 input-field text-sm"
                />
                <button
                  onClick={sendMessage}
                  className="p-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <PaperAirplaneIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ConsultationPage;
