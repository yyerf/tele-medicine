import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  ClipboardDocumentListIcon,
  EyeIcon,
  PrinterIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon,
  PlusIcon,
} from '@heroicons/react/24/outline';
import { useAuth } from '../contexts/AuthContext';
import { generateDummyData, formatDate, formatCurrency } from '../utils';
import toast from 'react-hot-toast';

const PrescriptionsPage = () => {
  const { user } = useAuth();
  const [dummyData, setDummyData] = useState<any>(null);
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

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
  
  // Filter prescriptions based on user role
  const userPrescriptions = isDoctor 
    ? dummyData.prescriptions.filter((p: any) => p.doctorId === user?.id)
    : dummyData.prescriptions.filter((p: any) => p.patientId === user?.id);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'filled':
        return 'bg-blue-100 text-blue-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'filled':
        return <CheckCircleIcon className="h-4 w-4" />;
      case 'expired':
        return <ExclamationTriangleIcon className="h-4 w-4" />;
      case 'cancelled':
        return <ClockIcon className="h-4 w-4" />;
      default:
        return <ClockIcon className="h-4 w-4" />;
    }
  };

  const handleViewPrescription = (prescription: any) => {
    setSelectedPrescription(prescription);
    setShowModal(true);
  };

  const handlePrintPrescription = (_prescription: any) => {
    toast.success('Printing prescription...');
    // In a real app, this would open print dialog
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
            <p className="mt-2 text-gray-600">
              {isDoctor 
                ? 'Manage prescriptions you have issued to patients'
                : 'View and manage your active prescriptions'
              }
            </p>
          </div>
          {isDoctor && (
            <button
              onClick={() => setShowCreateModal(true)}
              className="flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              <PlusIcon className="h-5 w-5" />
              <span>New Prescription</span>
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="card"
        >
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-gray-900">
                {userPrescriptions.filter((p: any) => p.status === 'active').length}
              </p>
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
            <div className="p-2 bg-blue-100 rounded-lg">
              <CheckCircleIcon className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Filled</p>
              <p className="text-2xl font-bold text-gray-900">
                {userPrescriptions.filter((p: any) => p.status === 'filled').length}
              </p>
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
            <div className="p-2 bg-red-100 rounded-lg">
              <ExclamationTriangleIcon className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Expired</p>
              <p className="text-2xl font-bold text-gray-900">
                {userPrescriptions.filter((p: any) => p.status === 'expired').length}
              </p>
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
              <ClipboardDocumentListIcon className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{userPrescriptions.length}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Prescriptions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">All Prescriptions</h2>
          <ClipboardDocumentListIcon className="h-5 w-5 text-gray-400" />
        </div>

        {userPrescriptions.length === 0 ? (
          <div className="text-center py-12">
            <ClipboardDocumentListIcon className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
            <p className="text-gray-600">
              {isDoctor 
                ? 'You haven\'t issued any prescriptions yet.'
                : 'You don\'t have any prescriptions yet.'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {userPrescriptions.map((prescription: any) => {
              const doctor = dummyData.doctors.find((d: any) => d.id === prescription.doctorId);
              const patient = dummyData.patients.find((p: any) => p.id === prescription.patientId);
              const consultation = dummyData.consultations.find((c: any) => c.id === prescription.consultationId);
              
              return (
                <div key={prescription.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">
                            Prescription #{prescription.id.slice(-6)}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {isDoctor 
                              ? `Patient: ${patient?.firstName} ${patient?.lastName}`
                              : `Doctor: ${doctor?.firstName} ${doctor?.lastName}`
                            }
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium flex items-center space-x-1 ${getStatusColor(prescription.status)}`}>
                            {getStatusIcon(prescription.status)}
                            <span>{prescription.status}</span>
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-600">Issued Date</p>
                          <p className="text-sm text-gray-900">{formatDate(prescription.issuedAt)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Valid Until</p>
                          <p className="text-sm text-gray-900">{formatDate(prescription.validUntil)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-600">Medications</p>
                          <p className="text-sm text-gray-900">{prescription.medications.length} items</p>
                        </div>
                      </div>

                      {consultation && (
                        <div className="mb-4">
                          <p className="text-sm font-medium text-gray-600">Consultation Notes</p>
                          <p className="text-sm text-gray-900">{consultation.symptoms}</p>
                        </div>
                      )}

                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600">Instructions</p>
                        <p className="text-sm text-gray-900">{prescription.instructions}</p>
                      </div>

                      {/* Medications List */}
                      <div className="mb-4">
                        <p className="text-sm font-medium text-gray-600 mb-2">Medications</p>
                        <div className="space-y-2">
                          {prescription.medications.map((med: any) => (
                            <div key={med.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{med.name}</p>
                                <p className="text-xs text-gray-600">
                                  {med.dosage} - {med.frequency} for {med.duration}
                                </p>
                                <p className="text-xs text-gray-500">{med.instructions}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm font-medium text-gray-900">{formatCurrency(med.price)}</p>
                                <p className="text-xs text-gray-600">Qty: {med.quantity}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleViewPrescription(prescription)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700"
                    >
                      <EyeIcon className="h-4 w-4" />
                      <span>View Details</span>
                    </button>
                    
                    <button
                      onClick={() => handlePrintPrescription(prescription)}
                      className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700"
                    >
                      <PrinterIcon className="h-4 w-4" />
                      <span>Print</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </motion.div>

      {/* Prescription Detail Modal */}
      {showModal && selectedPrescription && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  Prescription Details
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="sr-only">Close</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900">Prescription Information</h4>
                  <p className="text-sm text-gray-600">ID: {selectedPrescription.id}</p>
                  <p className="text-sm text-gray-600">Status: {selectedPrescription.status}</p>
                  <p className="text-sm text-gray-600">Issued: {formatDate(selectedPrescription.issuedAt)}</p>
                  <p className="text-sm text-gray-600">Valid Until: {formatDate(selectedPrescription.validUntil)}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Instructions</h4>
                  <p className="text-sm text-gray-600">{selectedPrescription.instructions}</p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900">Medications</h4>
                  <div className="space-y-2">
                    {selectedPrescription.medications.map((med: any) => (
                      <div key={med.id} className="p-3 bg-gray-50 rounded-lg">
                        <p className="font-medium text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-600">{med.dosage} - {med.frequency}</p>
                        <p className="text-sm text-gray-600">Duration: {med.duration}</p>
                        <p className="text-sm text-gray-600">{med.instructions}</p>
                        <p className="text-sm font-medium text-gray-900">Price: {formatCurrency(med.price)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                >
                  Close
                </button>
                <button
                  onClick={() => handlePrintPrescription(selectedPrescription)}
                  className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg"
                >
                  Print Prescription
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Prescription Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Create New Prescription</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <form className="space-y-6">
                {/* Patient Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Patient
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent">
                    <option value="">Select a patient...</option>
                    <option value="1">Juan Dela Cruz - Age 45</option>
                    <option value="2">Maria Santos - Age 32</option>
                    <option value="3">Pedro Rodriguez - Age 67</option>
                  </select>
                </div>

                {/* Medications */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medications
                  </label>
                  <div className="space-y-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Medication Name</label>
                          <input
                            type="text"
                            placeholder="e.g., Amoxicillin"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Dosage</label>
                          <input
                            type="text"
                            placeholder="e.g., 500mg"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Frequency</label>
                          <input
                            type="text"
                            placeholder="e.g., 3 times daily"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
                          <input
                            type="text"
                            placeholder="e.g., 7 days"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                          />
                        </div>
                      </div>
                      <div className="mt-3">
                        <label className="block text-xs font-medium text-gray-600 mb-1">Special Instructions</label>
                        <textarea
                          placeholder="e.g., Take with food"
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="mt-3 text-sm text-primary-600 hover:text-primary-700 font-medium"
                  >
                    + Add Another Medication
                  </button>
                </div>

                {/* General Instructions */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    General Instructions
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Additional instructions for the patient..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    onClick={(e) => {
                      e.preventDefault();
                      toast.success('Prescription created successfully!');
                      setShowCreateModal(false);
                    }}
                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg"
                  >
                    Create Prescription
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionsPage;
