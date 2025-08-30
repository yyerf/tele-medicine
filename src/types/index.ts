export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
  isVerified: boolean;
  dateOfBirth?: string;
  gender?: 'male' | 'female' | 'other';
  address?: Address;
  specialization?: string; // for doctors
  licenseNumber?: string; // for doctors
}

export interface Address {
  street: string;
  barangay: string;
  city: string;
  province: string;
  zipCode: string;
  country: string;
}

export interface Consultation {
  id: string;
  patientId: string;
  doctorId: string;
  scheduledAt: string;
  status: 'scheduled' | 'in-progress' | 'completed' | 'cancelled';
  type: 'video' | 'audio' | 'chat';
  symptoms: string;
  diagnosis?: string;
  prescription?: Prescription;
  notes?: string;
  images?: ConsultationImage[];
  duration?: number;
  rating?: number;
  feedback?: string;
}

export interface ConsultationImage {
  id: string;
  url: string;
  originalUrl: string;
  enhancedUrl?: string;
  analysis?: ImageAnalysis;
  uploadedAt: string;
  type: 'skin' | 'wound' | 'other';
}

export interface ImageAnalysis {
  confidence: number;
  detectedConditions: DetectedCondition[];
  recommendations: string[];
  severity: 'low' | 'medium' | 'high';
}

export interface DetectedCondition {
  name: string;
  confidence: number;
  description: string;
  requiresAttention: boolean;
}

export interface Prescription {
  id: string;
  consultationId: string;
  doctorId: string;
  patientId: string;
  medications: Medication[];
  instructions: string;
  issuedAt: string;
  validUntil: string;
  status: 'active' | 'filled' | 'expired' | 'cancelled';
}

export interface Medication {
  id: string;
  name: string;
  genericName: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions: string;
  quantity: number;
  isAvailable: boolean;
  price?: number;
}

export interface MedicalRecord {
  id: string;
  patientId: string;
  hospitalId: string;
  hospitalName: string;
  doctorId: string;
  doctorName: string;
  visitDate: string;
  visitType: 'consultation' | 'emergency' | 'surgery' | 'lab-test' | 'imaging';
  diagnosis: string;
  treatment: string;
  medications: Medication[];
  labResults?: LabResult[];
  attachments?: MedicalAttachment[];
  isShared: boolean;
}

export interface LabResult {
  id: string;
  testName: string;
  result: string;
  normalRange: string;
  unit: string;
  status: 'normal' | 'abnormal' | 'critical';
  testedAt: string;
}

export interface MedicalAttachment {
  id: string;
  name: string;
  type: 'image' | 'pdf' | 'document';
  url: string;
  uploadedAt: string;
}

export interface Hospital {
  id: string;
  name: string;
  address: Address;
  phone: string;
  email: string;
  website?: string;
  specializations: string[];
  isPartner: boolean;
  rating: number;
  totalReviews: number;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'appointment' | 'prescription' | 'reminder' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
  actionUrl?: string;
}
