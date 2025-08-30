import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  VideoCameraIcon,
  ClipboardDocumentListIcon,
  DocumentTextIcon,
  BellIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const patientNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Consultation', href: '/consultation', icon: VideoCameraIcon },
    { name: 'Prescriptions', href: '/prescriptions', icon: ClipboardDocumentListIcon },
    { name: 'Medical Records', href: '/medical-records', icon: DocumentTextIcon },
  ];

  const doctorNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Consultations', href: '/consultation', icon: VideoCameraIcon },
    { name: 'Advanced Consultation', href: '/advanced-consultation', icon: VideoCameraIcon },
    { name: 'Prescriptions', href: '/prescriptions', icon: ClipboardDocumentListIcon },
    { name: 'Patient Records', href: '/medical-records', icon: DocumentTextIcon },
  ];

  const navigation = user?.role === 'doctor' ? doctorNavigation : patientNavigation;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl z-50 lg:hidden"
            >
              <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
                <h1 className="text-xl font-bold text-primary-600">MedConnect PH</h1>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-gray-600"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
              <nav className="mt-8 px-4 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === item.href
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:flex-shrink-0">
        <div className="flex flex-col w-64">
          <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
            <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
              <div className="flex items-center flex-shrink-0 px-4">
                <h1 className="text-xl font-bold text-primary-600">MedConnect PH</h1>
              </div>
              <nav className="mt-8 flex-1 px-2 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors ${
                      location.pathname === item.href
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon className="mr-3 h-6 w-6" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64 flex flex-col flex-1">
        {/* Top navigation */}
        <div className="relative z-10 flex-shrink-0 flex h-16 bg-white shadow-sm border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(true)}
            className="px-4 border-r border-gray-200 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 lg:hidden"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          <div className="flex-1 px-4 flex justify-between items-center">
            <div className="flex-1">
              {/* Search could go here */}
            </div>
            
            <div className="ml-4 flex items-center md:ml-6 space-x-4">
              {/* User info */}
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  {user?.firstName} {user?.lastName}
                </span>
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  {user?.role}
                </span>
              </div>

              {/* Notifications */}
              <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full">
                <BellIcon className="h-6 w-6" />
              </button>

              {/* Profile dropdown */}
              <div className="relative">
                <button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  {user?.avatar ? (
                    <img 
                      className="h-8 w-8 rounded-full" 
                      src={user.avatar} 
                      alt={`${user.firstName} ${user.lastName}`} 
                    />
                  ) : (
                    <UserCircleIcon className="h-8 w-8 text-gray-400" />
                  )}
                </button>
              </div>

              {/* Settings */}
              <button className="p-2 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full">
                <Cog6ToothIcon className="h-6 w-6" />
              </button>

              {/* Logout */}
              <button 
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
              >
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
