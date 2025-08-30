// import * as tf from '@tensorflow/tfjs'; // Temporarily commented out to fix white screen

// Dummy data for demonstration
export const generateDummyData = () => {
  return {
    patients: [
      {
        id: '1',
        firstName: 'Maria',
        lastName: 'Santos',
        email: 'maria.santos@gmail.com',
        phone: '+63 917 123 4567',
        dateOfBirth: '1985-03-15',
        gender: 'female',
        address: {
          street: '123 Bonifacio St.',
          barangay: 'Poblacion',
          city: 'Makati',
          province: 'Metro Manila',
          zipCode: '1200',
          country: 'Philippines'
        },
        role: 'patient',
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150'
      },
      {
        id: '2',
        firstName: 'Juan',
        lastName: 'Dela Cruz',
        email: 'juan.delacruz@yahoo.com',
        phone: '+63 918 987 6543',
        dateOfBirth: '1978-11-22',
        gender: 'male',
        address: {
          street: '456 Rizal Ave.',
          barangay: 'San Antonio',
          city: 'Quezon City',
          province: 'Metro Manila',
          zipCode: '1105',
          country: 'Philippines'
        },
        role: 'patient',
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
      }
    ],
    doctors: [
      {
        id: 'd1',
        firstName: 'Dr. Elena',
        lastName: 'Rodriguez',
        email: 'elena.rodriguez@medconnect.ph',
        phone: '+63 919 555 0001',
        specialization: 'Dermatology',
        licenseNumber: 'PRC-12345',
        rating: 4.9,
        totalReviews: 247,
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150',
        role: 'doctor'
      },
      {
        id: 'd2',
        firstName: 'Dr. Miguel',
        lastName: 'Fernandez',
        email: 'miguel.fernandez@medconnect.ph',
        phone: '+63 919 555 0002',
        specialization: 'General Medicine',
        licenseNumber: 'PRC-12346',
        rating: 4.8,
        totalReviews: 189,
        isVerified: true,
        avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150',
        role: 'doctor'
      }
    ],
    consultations: [
      {
        id: 'c1',
        patientId: '1',
        doctorId: 'd1',
        scheduledAt: '2025-08-28T10:00:00Z',
        status: 'scheduled',
        type: 'video',
        symptoms: 'Skin rash on forearm, itching and redness',
        notes: 'Patient reports rash appeared 3 days ago after gardening',
        images: []
      },
      {
        id: 'c2',
        patientId: '2',
        doctorId: 'd2',
        scheduledAt: '2025-08-26T14:30:00Z',
        status: 'completed',
        type: 'video',
        symptoms: 'Persistent cough and mild fever',
        diagnosis: 'Upper respiratory tract infection',
        notes: 'Symptoms improving with prescribed medication',
        rating: 5,
        feedback: 'Excellent consultation, very thorough'
      }
    ],
    prescriptions: [
      {
        id: 'p1',
        consultationId: 'c2',
        doctorId: 'd2',
        patientId: '2',
        medications: [
          {
            id: 'm1',
            name: 'Amoxicillin',
            genericName: 'Amoxicillin trihydrate',
            dosage: '500mg',
            frequency: '3 times daily',
            duration: '7 days',
            instructions: 'Take with food to reduce stomach upset',
            quantity: 21,
            isAvailable: true,
            price: 15.50
          },
          {
            id: 'm2',
            name: 'Paracetamol',
            genericName: 'Acetaminophen',
            dosage: '500mg',
            frequency: 'Every 6 hours as needed',
            duration: '5 days',
            instructions: 'For fever and pain relief',
            quantity: 20,
            isAvailable: true,
            price: 8.75
          }
        ],
        instructions: 'Complete the full course of antibiotics. Return if symptoms worsen.',
        issuedAt: '2025-08-26T15:00:00Z',
        validUntil: '2025-09-26T15:00:00Z',
        status: 'active'
      }
    ],
    medicalRecords: [
      {
        id: 'r1',
        patientId: '1',
        hospitalId: 'h1',
        hospitalName: 'Makati Medical Center',
        doctorId: 'd1',
        doctorName: 'Dr. Elena Rodriguez',
        visitDate: '2025-08-20T09:00:00Z',
        visitType: 'consultation',
        diagnosis: 'Contact dermatitis',
        treatment: 'Topical corticosteroid cream, avoid allergens',
        medications: [
          {
            id: 'm3',
            name: 'Hydrocortisone Cream',
            genericName: 'Hydrocortisone',
            dosage: '1%',
            frequency: 'Apply twice daily',
            duration: '10 days',
            instructions: 'Apply thin layer to affected area',
            quantity: 1,
            isAvailable: true,
            price: 25.00
          }
        ],
        isShared: true
      },
      {
        id: 'r2',
        patientId: '2',
        hospitalId: 'h2',
        hospitalName: 'Philippine General Hospital',
        doctorId: 'd3',
        doctorName: 'Dr. Roberto Mendoza',
        visitDate: '2025-07-15T14:00:00Z',
        visitType: 'lab-test',
        diagnosis: 'Annual health screening',
        treatment: 'Continue healthy lifestyle, monitor blood pressure',
        labResults: [
          {
            id: 'l1',
            testName: 'Complete Blood Count',
            result: 'Normal',
            normalRange: 'Within normal limits',
            unit: '',
            status: 'normal',
            testedAt: '2025-07-15T10:00:00Z'
          },
          {
            id: 'l2',
            testName: 'Cholesterol',
            result: '180',
            normalRange: '< 200',
            unit: 'mg/dL',
            status: 'normal',
            testedAt: '2025-07-15T10:00:00Z'
          }
        ],
        isShared: true
      }
    ],
    hospitals: [
      {
        id: 'h1',
        name: 'Makati Medical Center',
        address: {
          street: '2 Amorsolo Street',
          barangay: 'Legaspi Village',
          city: 'Makati',
          province: 'Metro Manila',
          zipCode: '1229',
          country: 'Philippines'
        },
        phone: '+63 2 8888 8999',
        email: 'info@makatimed.net.ph',
        specializations: ['Cardiology', 'Dermatology', 'Oncology'],
        isPartner: true,
        rating: 4.7,
        totalReviews: 1250
      },
      {
        id: 'h2',
        name: 'Philippine General Hospital',
        address: {
          street: 'Taft Avenue',
          barangay: 'Ermita',
          city: 'Manila',
          province: 'Metro Manila',
          zipCode: '1000',
          country: 'Philippines'
        },
        phone: '+63 2 8554 8400',
        email: 'info@pgh.gov.ph',
        specializations: ['General Medicine', 'Surgery', 'Pediatrics'],
        isPartner: true,
        rating: 4.5,
        totalReviews: 892
      }
    ]
  };
};

// Computer Vision Analysis Functions
export class MedicalImageAnalyzer {
  private initialized = false;

  async loadModel() {
    try {
      // Simulate model loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      this.initialized = true;
      console.log('Medical image analysis model loaded');
    } catch (error) {
      console.error('Failed to load model:', error);
    }
  }

  async analyzeImage(_imageElement: HTMLImageElement | HTMLCanvasElement) {
    if (!this.initialized) {
      await this.loadModel();
    }

    try {
      // Simulate processing time
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Generate mock analysis results
      const mockAnalysis = this.generateMockAnalysis();

      return mockAnalysis;
    } catch (error) {
      console.error('Image analysis failed:', error);
      return this.generateMockAnalysis();
    }
  }

  private generateMockAnalysis() {
    const conditions = [
      { name: 'Normal Skin', confidence: 0.75, description: 'Healthy skin appearance', requiresAttention: false },
      { name: 'Mild Inflammation', confidence: 0.65, description: 'Slight redness detected', requiresAttention: true },
      { name: 'Possible Rash', confidence: 0.45, description: 'Skin irregularity detected', requiresAttention: true },
      { name: 'Dry Skin', confidence: 0.35, description: 'Dehydrated skin appearance', requiresAttention: false }
    ];

    const detectedConditions = conditions
      .filter(() => Math.random() > 0.6)
      .slice(0, 2);

    const severity = detectedConditions.some(c => c.requiresAttention) ? 'medium' : 'low';

    return {
      confidence: Math.random() * 0.3 + 0.7, // 70-100%
      detectedConditions,
      recommendations: [
        'Consult with a dermatologist for proper diagnosis',
        'Keep the area clean and dry',
        'Avoid scratching or irritating the area',
        'Monitor for any changes in appearance'
      ],
      severity
    };
  }
}

// Image Enhancement Functions
export class ImageEnhancer {
  static enhanceImage(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    // Apply brightness and contrast enhancement
    const brightness = 20;
    const contrast = 1.2;

    for (let i = 0; i < data.length; i += 4) {
      // Apply contrast
      data[i] = ((data[i] - 128) * contrast + 128) + brightness; // Red
      data[i + 1] = ((data[i + 1] - 128) * contrast + 128) + brightness; // Green
      data[i + 2] = ((data[i + 2] - 128) * contrast + 128) + brightness; // Blue
      
      // Clamp values to 0-255
      data[i] = Math.max(0, Math.min(255, data[i]));
      data[i + 1] = Math.max(0, Math.min(255, data[i + 1]));
      data[i + 2] = Math.max(0, Math.min(255, data[i + 2]));
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas;
  }

  static sharpenImage(canvas: HTMLCanvasElement): HTMLCanvasElement {
    const ctx = canvas.getContext('2d');
    if (!ctx) return canvas;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const width = canvas.width;
    const height = canvas.height;

    // Sharpening kernel
    const kernel = [
      0, -1, 0,
      -1, 5, -1,
      0, -1, 0
    ];

    const newData = new Uint8ClampedArray(data);

    for (let y = 1; y < height - 1; y++) {
      for (let x = 1; x < width - 1; x++) {
        for (let c = 0; c < 3; c++) { // RGB channels
          let sum = 0;
          for (let ky = -1; ky <= 1; ky++) {
            for (let kx = -1; kx <= 1; kx++) {
              const pixelIndex = ((y + ky) * width + (x + kx)) * 4 + c;
              const kernelIndex = (ky + 1) * 3 + (kx + 1);
              sum += data[pixelIndex] * kernel[kernelIndex];
            }
          }
          const currentIndex = (y * width + x) * 4 + c;
          newData[currentIndex] = Math.max(0, Math.min(255, sum));
        }
      }
    }

    const newImageData = new ImageData(newData, width, height);
    ctx.putImageData(newImageData, 0, 0);
    return canvas;
  }
}

// Date and formatting utilities
export const formatDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('en-PH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date));
};

export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  }).format(amount);
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
