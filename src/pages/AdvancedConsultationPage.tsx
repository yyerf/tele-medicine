import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CameraIcon,
  PhotoIcon,
  MagnifyingGlassIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  EyeIcon,
  ClipboardDocumentListIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useCamera } from '../hooks/useCamera';
import { MedicalImageAnalyzer, ImageEnhancer } from '../utils';
import toast from 'react-hot-toast';
import type { ImageAnalysis } from '../types';

const AdvancedConsultationPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [capturedImages, setCapturedImages] = useState<Array<{
    id: string;
    url: string;
    enhancedUrl?: string;
    analysis?: ImageAnalysis;
    timestamp: Date;
  }>>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [enhancement, setEnhancement] = useState<'none' | 'brightness' | 'sharpness'>('none');
  
  const analyzerRef = useRef<MedicalImageAnalyzer | null>(null);
  
  const {
    videoRef,
    canvasRef,
    isStreaming,
    error,
    startCamera,
    stopCamera,
    captureImage,
    switchCamera
  } = useCamera();

  useEffect(() => {
    analyzerRef.current = new MedicalImageAnalyzer();
    analyzerRef.current.loadModel();
    
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const handleStartCamera = async () => {
    setShowCamera(true);
    await startCamera();
  };

  const handleStopCamera = () => {
    setShowCamera(false);
    stopCamera();
  };

  const handleCaptureImage = async () => {
    const imageData = captureImage();
    if (!imageData) {
      toast.error('Failed to capture image');
      return;
    }

    const newImage = {
      id: Date.now().toString(),
      url: imageData,
      timestamp: new Date()
    };

    setCapturedImages(prev => [newImage, ...prev]);
    toast.success('Image captured successfully');
    
    // Auto-analyze the captured image
    await analyzeImage(newImage.id, imageData);
  };

  const analyzeImage = async (imageId: string, imageUrl: string) => {
    if (!analyzerRef.current) return;
    
    setIsAnalyzing(true);
    try {
      // Create image element for analysis
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imageUrl;
      });

      // Analyze the image
      const analysis = await analyzerRef.current.analyzeImage(img);
      
      // Update the image with analysis results
      const analysisWithTypedSeverity = {
        ...analysis,
        severity: analysis.severity as 'low' | 'medium' | 'high'
      };
      
      setCapturedImages(prev => 
        prev.map(image => 
          image.id === imageId 
            ? { ...image, analysis: analysisWithTypedSeverity }
            : image
        )
      );

      toast.success('Image analysis completed');
    } catch (error) {
      console.error('Analysis failed:', error);
      toast.error('Failed to analyze image');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const enhanceImage = (imageId: string, imageUrl: string, type: 'brightness' | 'sharpness') => {
    try {
      // Create canvas for enhancement
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);
        
        let enhancedCanvas = canvas;
        if (type === 'brightness') {
          enhancedCanvas = ImageEnhancer.enhanceImage(canvas);
        } else if (type === 'sharpness') {
          enhancedCanvas = ImageEnhancer.sharpenImage(canvas);
        }
        
        const enhancedUrl = enhancedCanvas.toDataURL('image/jpeg', 0.8);
        
        setCapturedImages(prev => 
          prev.map(image => 
            image.id === imageId 
              ? { ...image, enhancedUrl }
              : image
          )
        );
        
        toast.success(`Image ${type} enhancement applied`);
      };
      
      img.src = imageUrl;
    } catch (error) {
      console.error('Enhancement failed:', error);
      toast.error('Failed to enhance image');
    }
  };

  const AnalysisResults = ({ analysis }: { analysis: ImageAnalysis }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 p-4 bg-gray-50 rounded-lg"
    >
      <div className="flex items-center mb-3">
        <MagnifyingGlassIcon className="h-5 w-5 text-primary-600 mr-2" />
        <span className="font-medium text-gray-900">AI Analysis Results</span>
        <span className={`ml-auto px-2 py-1 rounded-full text-xs font-medium ${
          analysis.severity === 'high' ? 'bg-red-100 text-red-800' :
          analysis.severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
          'bg-green-100 text-green-800'
        }`}>
          {analysis.severity.toUpperCase()} PRIORITY
        </span>
      </div>
      
      <div className="mb-3">
        <span className="text-sm text-gray-600">Confidence: </span>
        <span className="font-medium">{(analysis.confidence * 100).toFixed(1)}%</span>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
          <div 
            className="bg-primary-600 h-2 rounded-full" 
            style={{ width: `${analysis.confidence * 100}%` }}
          ></div>
        </div>
      </div>

      {analysis.detectedConditions.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Detected Conditions:</h4>
          <div className="space-y-2">
            {analysis.detectedConditions.map((condition, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-white rounded border">
                <div className="flex items-center">
                  {condition.requiresAttention ? (
                    <ExclamationTriangleIcon className="h-4 w-4 text-yellow-500 mr-2" />
                  ) : (
                    <CheckCircleIcon className="h-4 w-4 text-green-500 mr-2" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-gray-900">{condition.name}</p>
                    <p className="text-xs text-gray-600">{condition.description}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-500">
                  {(condition.confidence * 100).toFixed(0)}%
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-2">Recommendations:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {analysis.recommendations.map((rec, index) => (
            <li key={index} className="flex items-start">
              <span className="text-primary-600 mr-2">•</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI-Powered Consultation</h1>
        <p className="mt-2 text-gray-600">
          Capture and analyze medical images with advanced AI technology
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Camera Section */}
        <div className="space-y-6">
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Camera Capture</h2>
              <div className="flex space-x-2">
                {!showCamera ? (
                  <button
                    onClick={handleStartCamera}
                    className="btn-primary flex items-center"
                  >
                    <CameraIcon className="h-5 w-5 mr-2" />
                    Start Camera
                  </button>
                ) : (
                  <button
                    onClick={handleStopCamera}
                    className="btn-secondary flex items-center"
                  >
                    <XMarkIcon className="h-5 w-5 mr-2" />
                    Stop Camera
                  </button>
                )}
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <AnimatePresence>
              {showCamera && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  <div className="relative bg-black rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      muted
                      className="w-full h-64 object-cover"
                    />
                    {isStreaming && (
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                        <button
                          onClick={handleCaptureImage}
                          className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <PhotoIcon className="h-6 w-6" />
                        </button>
                        <button
                          onClick={switchCamera}
                          className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                        >
                          <ArrowPathIcon className="h-6 w-6" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <canvas ref={canvasRef} className="hidden" />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Enhancement Controls */}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-900 mb-2">Real-time Enhancement</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setEnhancement('brightness')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    enhancement === 'brightness'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <SparklesIcon className="h-4 w-4 inline mr-1" />
                  Brighten
                </button>
                <button
                  onClick={() => setEnhancement('sharpness')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    enhancement === 'sharpness'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <EyeIcon className="h-4 w-4 inline mr-1" />
                  Sharpen
                </button>
                <button
                  onClick={() => setEnhancement('none')}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    enhancement === 'none'
                      ? 'bg-primary-100 text-primary-700'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Original
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Captured Images */}
        <div className="space-y-6">
          <div className="card">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Captured Images</h2>
            
            {capturedImages.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <PhotoIcon className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>No images captured yet</p>
                <p className="text-sm">Start the camera and capture images for analysis</p>
              </div>
            ) : (
              <div className="space-y-4">
                {capturedImages.map((image) => (
                  <motion.div
                    key={image.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          {image.timestamp.toLocaleTimeString()}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => enhanceImage(image.id, image.url, 'brightness')}
                            className="p-1 text-gray-400 hover:text-primary-600"
                            title="Enhance brightness"
                          >
                            <SparklesIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => enhanceImage(image.id, image.url, 'sharpness')}
                            className="p-1 text-gray-400 hover:text-primary-600"
                            title="Enhance sharpness"
                          >
                            <EyeIcon className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => analyzeImage(image.id, image.url)}
                            className="p-1 text-gray-400 hover:text-primary-600"
                            title="Re-analyze image"
                            disabled={isAnalyzing}
                          >
                            <MagnifyingGlassIcon className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-xs text-gray-500 mb-1">Original</p>
                          <img
                            src={image.url}
                            alt="Captured"
                            className="w-full h-32 object-cover rounded cursor-pointer"
                            onClick={() => setSelectedImage(image.url)}
                          />
                        </div>
                        {image.enhancedUrl && (
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Enhanced</p>
                            <img
                              src={image.enhancedUrl}
                              alt="Enhanced"
                              className="w-full h-32 object-cover rounded cursor-pointer"
                              onClick={() => setSelectedImage(image.enhancedUrl!)}
                            />
                          </div>
                        )}
                      </div>

                      {image.analysis && <AnalysisResults analysis={image.analysis} />}
                      
                      {isAnalyzing && (
                        <div className="mt-4 text-center text-sm text-gray-600">
                          <div className="inline-flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
                            Analyzing image...
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <ClipboardDocumentListIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Generate Report</p>
            <p className="text-xs text-gray-600">Create consultation summary</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <CheckCircleIcon className="h-8 w-8 text-medical-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Schedule Follow-up</p>
            <p className="text-xs text-gray-600">Book next appointment</p>
          </button>
          <button className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <PhotoIcon className="h-8 w-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-900">Save to Records</p>
            <p className="text-xs text-gray-600">Add to patient history</p>
          </button>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl max-h-[90vh] p-4"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedImage}
                alt="Full size"
                className="max-w-full max-h-full object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 bg-white text-gray-900 p-2 rounded-full hover:bg-gray-100"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedConsultationPage;
