# MedConnect PH - Advanced Telemedicine Platform

A comprehensive telemedicine platform designed specifically for the Philippines, featuring AI-powered image analysis, secure consultations, and seamless medicine delivery.

## 🚀 Features

### Core Functionality
- **AI-Powered Image Enhancement**: Real-time image brightening and sharpening for clearer medical consultations
- **Computer Vision Detection**: AI-powered analysis of skin and wound conditions with instant recommendations
- **E-Prescription System**: Digital prescription management with secure doctor-patient communication
- **Medicine Delivery**: Grab-like delivery service for prescribed medications straight to your door
- **Centralized Medical Records**: Cross-hospital patient record synchronization across the Philippines
- **Secure & Compliant**: HIPAA-compliant platform ensuring medical data privacy and security

### User Roles
- **Patients**: Schedule consultations, view prescriptions, order medicine, access medical records
- **Doctors**: Conduct consultations, issue prescriptions, analyze patient images, manage patient records
- **Administrators**: Platform management and oversight

### Technical Features
- **Real-time Video Consultations**: High-quality video calls with screen sharing
- **AI Image Analysis**: TensorFlow.js-powered medical image analysis
- **Responsive Design**: Mobile-first design optimized for all devices
- **Modern UI/UX**: Beautiful, intuitive interface with smooth animations
- **TypeScript**: Full type safety and better development experience
- **React 19**: Latest React features and performance optimizations

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, Vite
- **Styling**: Tailwind CSS, Framer Motion
- **Icons**: Heroicons
- **Forms**: React Hook Form with Yup validation
- **AI/ML**: TensorFlow.js (for image analysis)
- **Notifications**: React Hot Toast
- **Routing**: React Router DOM
- **State Management**: React Context API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd pharmacy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in your terminal)

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── Layout.tsx      # Main layout with navigation
├── contexts/           # React contexts
│   └── AuthContext.tsx # Authentication state management
├── hooks/              # Custom React hooks
│   └── useCamera.ts    # Camera functionality
├── pages/              # Page components
│   ├── LandingPage.tsx           # Homepage
│   ├── LoginPage.tsx             # User login
│   ├── RegisterPage.tsx          # User registration
│   ├── DashboardPage.tsx         # Main dashboard
│   ├── ConsultationPage.tsx      # Basic consultation
│   ├── AdvancedConsultationPage.tsx # AI-powered consultation
│   ├── PrescriptionsPage.tsx     # Prescription management
│   ├── DeliveryPage.tsx          # Medicine delivery
│   └── MedicalRecordsPage.tsx    # Medical records
├── types/              # TypeScript type definitions
│   └── index.ts        # All type definitions
├── utils/              # Utility functions
│   └── index.ts        # Helper functions and dummy data
├── App.tsx             # Main application component
├── main.tsx            # Application entry point
└── index.css           # Global styles
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎯 Key Features Explained

### AI Image Analysis
The platform uses TensorFlow.js to analyze medical images:
- **Image Enhancement**: Brightness and contrast adjustment
- **Sharpening**: Edge detection and enhancement
- **Condition Detection**: AI-powered skin condition analysis
- **Recommendations**: Automated medical recommendations

### Secure Authentication
- JWT-based authentication
- Role-based access control
- Secure session management
- Password encryption

### Real-time Consultations
- WebRTC video calls
- Screen sharing capabilities
- Chat functionality
- File sharing

### Prescription Management
- Digital prescription creation
- Medication tracking
- Expiry date monitoring
- Order management

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_API_URL=your_api_url_here
VITE_AI_MODEL_URL=your_ai_model_url_here
```

## 🔒 Security Features

- **HIPAA Compliance**: Medical data protection standards
- **End-to-end Encryption**: Secure data transmission
- **Role-based Access**: User permission management
- **Audit Logging**: Activity tracking and monitoring
- **Data Backup**: Regular automated backups

## 📱 Mobile Responsiveness

The platform is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🎨 Design System

### Color Palette
- **Primary**: Blue (#0284c7) - Trust and professionalism
- **Medical**: Green (#22c55e) - Health and wellness
- **Neutral**: Gray scale for text and backgrounds

### Typography
- **Font**: Inter - Clean and readable
- **Weights**: 100-900 for various emphasis levels

### Components
- **Cards**: Consistent container styling
- **Buttons**: Primary and secondary variants
- **Forms**: Accessible input fields
- **Modals**: Overlay dialogs

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Email: support@medconnect.ph
- Documentation: [docs.medconnect.ph](https://docs.medconnect.ph)
- Issues: [GitHub Issues](https://github.com/your-repo/issues)

## 🔮 Roadmap

### Phase 1 (Current)
- ✅ Basic consultation system
- ✅ AI image analysis
- ✅ Prescription management
- ✅ User authentication

### Phase 2 (Planned)
- 🔄 Real-time video consultations
- 🔄 Payment integration
- 🔄 Pharmacy integration
- 🔄 Mobile app development

### Phase 3 (Future)
- 📋 Advanced AI diagnostics
- 📋 Integration with hospital systems
- 📋 Telemedicine regulations compliance
- 📋 Multi-language support

---

**MedConnect PH** - Transforming healthcare in the Philippines through technology.
