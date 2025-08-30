import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  CalendarDaysIcon,
  ClipboardDocumentListIcon,
  ChartBarIcon,
  VideoCameraIcon,
  UserGroupIcon,
  BeakerIcon,
  DocumentTextIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { generateDummyData, formatDate, formatCurrency } from '../utils';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [dummyData, setDummyData] = useState<any>(null);

  useEffect(() => {
    setDummyData(generateDummyData());
  }, []);

  if (!dummyData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const isDoctor = user?.role === 'doctor';

  const PatientDashboard = () => (
    <>
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <CalendarDaysIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Next Appointment</p>
              <p className="text-2xl font-bold text-gray-900">Aug 28</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center">
            <div className="p-2 bg-medical-100 rounded-lg">
              <ClipboardDocumentListIcon className="h-6 w-6 text-medical-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Prescriptions</p>
              <p className="text-2xl font-bold text-gray-900">{dummyData.prescriptions.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Appointments</h2>
            <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {dummyData.consultations.slice(0, 3).map((appointment: any) => {
              const doctor = dummyData.doctors.find((d: any) => d.id === appointment.doctorId);
              return (
                <div key={appointment.id} className="flex items-center p-4 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                      <VideoCameraIcon className="h-5 w-5 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-medium text-gray-900">
                      {doctor?.firstName} {doctor?.lastName}
                    </h3>
                    <p className="text-sm text-gray-500">{doctor?.specialization}</p>
                    <p className="text-xs text-gray-400">
                      {formatDate(appointment.scheduledAt)}
                    </p>
                  </div>
                  <div className="ml-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      appointment.status === 'scheduled' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {appointment.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          <button className="mt-4 w-full btn-primary">
            Schedule New Consultation
          </button>
        </motion.div>

        {/* Active Prescriptions */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Active Prescriptions</h2>
            <ClipboardDocumentListIcon className="h-5 w-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {dummyData.prescriptions.map((prescription: any) => (
              <div key={prescription.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    Prescription #{prescription.id.slice(-6)}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    prescription.status === 'active' 
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {prescription.status}
                  </span>
                </div>
                <div className="space-y-2">
                  {prescription.medications.slice(0, 2).map((med: any) => (
                    <div key={med.id} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{med.name}</p>
                        <p className="text-xs text-gray-500">{med.dosage} - {med.frequency}</p>
                      </div>
                      <span className="text-sm text-gray-600">{formatCurrency(med.price)}</span>
                    </div>
                  ))}
                </div>
                <button className="mt-3 w-full btn-secondary text-sm">
                  Order Medicine
                </button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  );

  const DoctorDashboard = () => (
    <>
      {/* Doctor Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <UserGroupIcon className="h-6 w-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Today's Patients</p>
              <p className="text-2xl font-bold text-gray-900">12</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card"
        >
          <div className="flex items-center">
            <div className="p-2 bg-medical-100 rounded-lg">
              <ClipboardDocumentListIcon className="h-6 w-6 text-medical-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Prescriptions Issued</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="card"
        >
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <ChartBarIcon className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Patient Rating</p>
              <p className="text-2xl font-bold text-gray-900">4.9</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="card"
        >
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <BeakerIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">AI Analyses</p>
              <p className="text-2xl font-bold text-gray-900">45</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Today's Schedule */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Today's Schedule</h2>
          <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dummyData.consultations.map((consultation: any) => {
            const patient = dummyData.patients.find((p: any) => p.id === consultation.patientId);
            return (
              <div key={consultation.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-sm font-medium text-gray-900">
                    {patient?.firstName} {patient?.lastName}
                  </h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    consultation.status === 'scheduled' 
                      ? 'bg-blue-100 text-blue-800'
                      : consultation.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {consultation.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{consultation.symptoms}</p>
                <p className="text-xs text-gray-400">
                  {formatDate(consultation.scheduledAt)}
                </p>
                <button className="mt-3 w-full btn-primary text-sm">
                  Start Consultation
                </button>
              </div>
            );
          })}
        </div>
      </motion.div>
    </>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.firstName}!
        </h1>
        <p className="mt-2 text-gray-600">
          {isDoctor 
            ? 'Here\'s your practice overview for today'
            : 'Here\'s your health dashboard overview'
          }
        </p>
      </div>

      {isDoctor ? <DoctorDashboard /> : <PatientDashboard />}

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isDoctor ? (
            <>
              <button 
                onClick={() => navigate('/consultation')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <VideoCameraIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Start Consultation</p>
              </button>
              <button 
                onClick={() => navigate('/advanced-consultation')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <BeakerIcon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">AI Diagnosis</p>
              </button>
              <button 
                onClick={() => navigate('/prescriptions')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <PlusIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Create Prescription</p>
              </button>
              <button 
                onClick={() => navigate('/medical-records')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ClipboardDocumentListIcon className="h-8 w-8 text-medical-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Patient Records</p>
              </button>
            </>
          ) : (
            <>
              <button 
                onClick={() => navigate('/consultation')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <VideoCameraIcon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">Start Consultation</p>
              </button>
              <button 
                onClick={() => navigate('/medical-records')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <DocumentTextIcon className="h-8 w-8 text-medical-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">My Records</p>
              </button>
              <button 
                onClick={() => navigate('/prescriptions')}
                className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <ClipboardDocumentListIcon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-gray-900">My Prescriptions</p>
              </button>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default DashboardPage;
