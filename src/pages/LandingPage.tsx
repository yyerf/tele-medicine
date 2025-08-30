import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  CameraIcon, 
  EyeIcon, 
  ClipboardDocumentListIcon,
  ServerIcon 
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const features = [
    {
      name: 'AI Image Enhancement',
      description: 'Real-time image brightening and sharpening for clearer medical consultations',
      icon: CameraIcon,
    },
    {
      name: 'Computer Vision Detection',
      description: 'AI-powered analysis of skin and wound conditions with instant recommendations',
      icon: EyeIcon,
    },
    {
      name: 'E-Prescription System',
      description: 'Digital prescription management with secure doctor-patient communication',
      icon: ClipboardDocumentListIcon,
    },
    {
      name: 'Centralized Medical Records',
      description: 'Cross-hospital patient record synchronization across the Philippines',
      icon: ServerIcon,
    },
    {
      name: 'Secure & Compliant',
      description: 'HIPAA-compliant platform ensuring your medical data privacy and security',
      icon: ShieldCheckIcon,
    },
  ];

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <h1 className="text-2xl font-bold text-primary-600">MedConnect PH</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Link 
                to="/login" 
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Sign In
              </Link>
              <Link 
                to="/register" 
                className="btn-primary"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Advanced Telemedicine
              <span className="block text-blue-200">for the Philippines</span>
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Experience the future of healthcare with AI-powered consultations, smart image enhancement, 
              and centralized medical records across the Philippines.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/register" className="bg-white text-primary-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                Start Free Consultation
              </Link>
              <Link to="/login" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-3 rounded-lg font-semibold text-lg transition-colors">
                I'm a Doctor
              </Link>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Revolutionary Healthcare Technology
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge AI technology with practical healthcare solutions 
              designed specifically for the Philippine healthcare system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="card hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <feature.icon className="h-8 w-8 text-primary-600" />
                  </div>
                  <h3 className="ml-3 text-xl font-semibold text-gray-900">
                    {feature.name}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-medical-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of Filipinos who trust MedConnect PH for their healthcare needs.
            </p>
            <Link 
              to="/register" 
              className="bg-white text-medical-600 hover:bg-gray-50 px-8 py-3 rounded-lg font-semibold text-lg transition-colors inline-block"
            >
              Get Started Today
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">MedConnect PH</h3>
            <p className="text-gray-400 mb-8">
              Advanced telemedicine platform for the Philippines
            </p>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © 2025 MedConnect PH. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
