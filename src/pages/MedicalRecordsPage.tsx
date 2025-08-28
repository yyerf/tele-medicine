import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  DocumentTextIcon,
  BuildingOffice2Icon,
  CalendarDaysIcon,
  ShareIcon,
  EyeIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';

const MedicalRecordsPage = () => {
  const [selectedHospital, setSelectedHospital] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');

  const medicalRecords = [
    {
      id: 1,
      hospitalId: 'davao-doc',
      hospitalName: 'Davao Doctors Hospital',
      doctorName: 'Dr. Maria Santos',
      visitDate: '2025-07-28',
      visitType: 'consultation',
      diagnosis: 'Acne Vulgaris',
      treatment: 'Topical retinoid treatment prescribed',
      medications: [
        { name: 'Tretinoin Gel 0.025%', dosage: 'Apply once daily at night' },
        { name: 'Clindamycin Gel', dosage: 'Apply twice daily' },
      ],
      labResults: [],
      attachments: [
        { name: 'Consultation Notes.pdf', type: 'pdf' },
        { name: 'Treatment Plan.pdf', type: 'pdf' },
      ],
      isShared: true,
    },
    {
      id: 2,
      hospitalId: 'adventist',
      hospitalName: 'Adventist Medical Center',
      doctorName: 'Dr. Juan Dela Cruz',
      visitDate: '2025-07-15',
      visitType: 'emergency',
      diagnosis: 'Acute Upper Respiratory Infection',
      treatment: 'Symptomatic treatment and rest',
      medications: [
        { name: 'Amoxicillin 500mg', dosage: '1 capsule every 8 hours for 7 days' },
        { name: 'Paracetamol 500mg', dosage: 'As needed for fever' },
      ],
      labResults: [
        { testName: 'Complete Blood Count', result: 'Normal', status: 'normal' },
        { testName: 'Chest X-ray', result: 'Clear lung fields', status: 'normal' },
      ],
      attachments: [
        { name: 'Emergency Room Report.pdf', type: 'pdf' },
        { name: 'X-ray Results.jpg', type: 'image' },
      ],
      isShared: true,
    },
    {
      id: 3,
      hospitalId: 'san-pedro',
      hospitalName: 'San Pedro Hospital',
      doctorName: 'Dr. Ana Reyes',
      visitDate: '2025-06-20',
      visitType: 'lab-test',
      diagnosis: 'Annual Health Check-up',
      treatment: 'Routine laboratory tests',
      medications: [],
      labResults: [
        { testName: 'Lipid Profile', result: 'Total Cholesterol: 180 mg/dL', status: 'normal' },
        { testName: 'Blood Sugar', result: '92 mg/dL', status: 'normal' },
        { testName: 'Blood Pressure', result: '120/80 mmHg', status: 'normal' },
      ],
      attachments: [
        { name: 'Lab Results.pdf', type: 'pdf' },
      ],
      isShared: false,
    },
  ];

  const hospitals = [
    { id: 'all', name: 'All Hospitals' },
    { id: 'davao-doc', name: 'Davao Doctors Hospital' },
    { id: 'adventist', name: 'Adventist Medical Center' },
    { id: 'san-pedro', name: 'San Pedro Hospital' },
  ];

  const years = [
    { id: 'all', name: 'All Years' },
    { id: '2025', name: '2025' },
    { id: '2024', name: '2024' },
    { id: '2023', name: '2023' },
  ];

  const getVisitTypeColor = (type: string) => {
    switch (type) {
      case 'consultation':
        return 'bg-blue-100 text-blue-800';
      case 'emergency':
        return 'bg-red-100 text-red-800';
      case 'surgery':
        return 'bg-purple-100 text-purple-800';
      case 'lab-test':
        return 'bg-green-100 text-green-800';
      case 'imaging':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredRecords = medicalRecords.filter(record => {
    const hospitalMatch = selectedHospital === 'all' || record.hospitalId === selectedHospital;
    const yearMatch = selectedYear === 'all' || new Date(record.visitDate).getFullYear().toString() === selectedYear;
    return hospitalMatch && yearMatch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
        <p className="text-gray-600 mt-2">Centralized medical records from hospitals across the Philippines</p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="card mb-6"
      >
        <div className="flex items-center space-x-4">
          <FunnelIcon className="h-5 w-5 text-gray-400" />
          <div className="flex flex-wrap gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Hospital</label>
              <select
                value={selectedHospital}
                onChange={(e) => setSelectedHospital(e.target.value)}
                className="input-field w-48"
              >
                {hospitals.map((hospital) => (
                  <option key={hospital.id} value={hospital.id}>
                    {hospital.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="input-field w-32"
              >
                {years.map((year) => (
                  <option key={year.id} value={year.id}>
                    {year.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Records List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {filteredRecords.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            className="card"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{record.diagnosis}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getVisitTypeColor(record.visitType)}`}>
                    {record.visitType.replace('-', ' ')}
                  </span>
                  {record.isShared && (
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                      <ShareIcon className="h-3 w-3 mr-1" />
                      Shared
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <BuildingOffice2Icon className="h-4 w-4 mr-2 text-gray-400" />
                    <div>
                      <span className="font-medium">Hospital:</span>
                      <p>{record.hospitalName}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <CalendarDaysIcon className="h-4 w-4 mr-2 text-gray-400" />
                    <div>
                      <span className="font-medium">Visit Date:</span>
                      <p>{new Date(record.visitDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div>
                    <span className="font-medium">Doctor:</span>
                    <p>{record.doctorName}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Treatment */}
              <div className="p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-1">Treatment</h4>
                <p className="text-gray-600">{record.treatment}</p>
              </div>

              {/* Medications */}
              {record.medications.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Medications</h4>
                  <div className="space-y-2">
                    {record.medications.map((med, index) => (
                      <div key={index} className="p-2 bg-blue-50 rounded border-l-4 border-blue-400">
                        <p className="font-medium text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-600">{med.dosage}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Lab Results */}
              {record.labResults.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Lab Results</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {record.labResults.map((lab, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium text-gray-900">{lab.testName}</p>
                            <p className="text-sm text-gray-600">{lab.result}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            lab.status === 'normal' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {lab.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments */}
              {record.attachments.length > 0 && (
                <div>
                  <h4 className="font-medium text-gray-700 mb-2">Attachments</h4>
                  <div className="flex flex-wrap gap-2">
                    {record.attachments.map((attachment, index) => (
                      <button
                        key={index}
                        className="flex items-center px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <DocumentTextIcon className="h-4 w-4 mr-2 text-gray-400" />
                        <span className="text-sm text-gray-700">{attachment.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 flex space-x-3">
              <button className="btn-primary flex items-center">
                <EyeIcon className="h-4 w-4 mr-2" />
                View Full Record
              </button>
              <button className="btn-secondary flex items-center">
                <ShareIcon className="h-4 w-4 mr-2" />
                Share with Doctor
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredRecords.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12"
        >
          <DocumentTextIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No medical records found</h3>
          <p className="text-gray-600">
            No records match your current filter criteria.
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MedicalRecordsPage;
