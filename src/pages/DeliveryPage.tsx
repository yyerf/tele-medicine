import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TruckIcon,
  MapPinIcon,
  ClockIcon,
  CheckCircleIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
} from '@heroicons/react/24/outline';

const DeliveryPage = () => {
  const [activeTab, setActiveTab] = useState('active');

  const deliveries = [
    {
      id: 1,
      orderNumber: 'ORD-001',
      prescriptionId: 'RX-001',
      status: 'out-for-delivery',
      medications: [
        { name: 'Amoxicillin 500mg', quantity: 21, price: 150 },
        { name: 'Vitamin C 1000mg', quantity: 30, price: 200 },
      ],
      totalAmount: 350,
      deliveryFee: 50,
      estimatedDeliveryTime: '2:00 PM',
      courier: 'John Santos',
      courierPhone: '+63 917 123 4567',
      trackingNumber: 'TRK-001',
      deliveryAddress: {
        street: '123 Rizal Street',
        barangay: 'Poblacion',
        city: 'Davao City',
        province: 'Davao del Sur',
        zipCode: '8000',
      },
      orderedAt: '2025-07-31T08:00:00Z',
      timeline: [
        { status: 'Order Placed', time: '8:00 AM', completed: true },
        { status: 'Prescription Verified', time: '8:30 AM', completed: true },
        { status: 'Preparing Order', time: '9:00 AM', completed: true },
        { status: 'Out for Delivery', time: '1:00 PM', completed: true },
        { status: 'Delivered', time: '', completed: false },
      ],
    },
    {
      id: 2,
      orderNumber: 'ORD-002',
      prescriptionId: 'RX-002',
      status: 'delivered',
      medications: [
        { name: 'Ibuprofen 400mg', quantity: 20, price: 80 },
      ],
      totalAmount: 80,
      deliveryFee: 50,
      courier: 'Maria Cruz',
      courierPhone: '+63 917 987 6543',
      trackingNumber: 'TRK-002',
      deliveryAddress: {
        street: '123 Rizal Street',
        barangay: 'Poblacion',
        city: 'Davao City',
        province: 'Davao del Sur',
        zipCode: '8000',
      },
      orderedAt: '2025-07-29T10:00:00Z',
      deliveredAt: '2025-07-29T14:30:00Z',
      timeline: [
        { status: 'Order Placed', time: '10:00 AM', completed: true },
        { status: 'Prescription Verified', time: '10:15 AM', completed: true },
        { status: 'Preparing Order', time: '11:00 AM', completed: true },
        { status: 'Out for Delivery', time: '1:00 PM', completed: true },
        { status: 'Delivered', time: '2:30 PM', completed: true },
      ],
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'preparing':
        return 'bg-purple-100 text-purple-800';
      case 'out-for-delivery':
        return 'bg-orange-100 text-orange-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'confirmed':
        return 'Confirmed';
      case 'preparing':
        return 'Preparing';
      case 'out-for-delivery':
        return 'Out for Delivery';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return status;
    }
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['pending', 'confirmed', 'preparing', 'out-for-delivery'].includes(delivery.status);
    return delivery.status === activeTab;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900">Medicine Delivery</h1>
        <p className="text-gray-600 mt-2">Track your medicine orders and delivery status</p>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mb-6"
      >
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'active', label: 'Active Orders', count: deliveries.filter(d => ['pending', 'confirmed', 'preparing', 'out-for-delivery'].includes(d.status)).length },
              { key: 'delivered', label: 'Delivered', count: deliveries.filter(d => d.status === 'delivered').length },
              { key: 'all', label: 'All Orders', count: deliveries.length },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.key
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Delivery Orders */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-6"
      >
        {filteredDeliveries.map((delivery, index) => (
          <motion.div
            key={delivery.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            className="card"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Order #{delivery.orderNumber}</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(delivery.status)}`}>
                    {getStatusText(delivery.status)}
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Ordered on {new Date(delivery.orderedAt).toLocaleDateString()} at{' '}
                  {new Date(delivery.orderedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              {delivery.status === 'out-for-delivery' && (
                <div className="text-right">
                  <p className="text-sm font-medium text-orange-600">ETA: {delivery.estimatedDeliveryTime}</p>
                  <p className="text-xs text-gray-500">Tracking: {delivery.trackingNumber}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Order Details */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Order Details</h4>
                <div className="space-y-2">
                  {delivery.medications.map((med, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                      <div>
                        <p className="font-medium text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-600">Quantity: {med.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">₱{med.price}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>₱{delivery.totalAmount}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Delivery Fee:</span>
                    <span>₱{delivery.deliveryFee}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900 mt-2 pt-2 border-t">
                    <span>Total:</span>
                    <span>₱{delivery.totalAmount + delivery.deliveryFee}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div>
                <h4 className="font-medium text-gray-900 mb-3">Delivery Information</h4>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">Delivery Address</p>
                      <p className="text-gray-600">
                        {delivery.deliveryAddress.street}, {delivery.deliveryAddress.barangay}
                      </p>
                      <p className="text-gray-600">
                        {delivery.deliveryAddress.city}, {delivery.deliveryAddress.province} {delivery.deliveryAddress.zipCode}
                      </p>
                    </div>
                  </div>
                  
                  {delivery.courier && (
                    <div className="flex items-start">
                      <TruckIcon className="h-5 w-5 text-gray-400 mr-2 mt-0.5" />
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">Courier</p>
                        <p className="text-gray-600">{delivery.courier}</p>
                        <p className="text-gray-600">{delivery.courierPhone}</p>
                      </div>
                    </div>
                  )}
                </div>

                {delivery.status === 'out-for-delivery' && (
                  <div className="mt-4 flex space-x-2">
                    <button className="btn-primary flex items-center text-sm">
                      <PhoneIcon className="h-4 w-4 mr-1" />
                      Call Courier
                    </button>
                    <button className="btn-secondary flex items-center text-sm">
                      <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
                      Message
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Delivery Timeline */}
            <div className="mt-6">
              <h4 className="font-medium text-gray-900 mb-3">Delivery Timeline</h4>
              <div className="flow-root">
                <ul className="-mb-8">
                  {delivery.timeline.map((step, stepIndex) => (
                    <li key={stepIndex}>
                      <div className="relative pb-8">
                        {stepIndex !== delivery.timeline.length - 1 && (
                          <span
                            className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${
                              step.completed ? 'bg-primary-600' : 'bg-gray-200'
                            }`}
                            aria-hidden="true"
                          />
                        )}
                        <div className="relative flex space-x-3">
                          <div>
                            <span
                              className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                                step.completed
                                  ? 'bg-primary-600'
                                  : 'bg-gray-200'
                              }`}
                            >
                              {step.completed ? (
                                <CheckCircleIcon className="h-5 w-5 text-white" />
                              ) : (
                                <ClockIcon className="h-5 w-5 text-gray-400" />
                              )}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                            <div>
                              <p className={`text-sm ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                                {step.status}
                              </p>
                            </div>
                            <div className="text-right text-sm whitespace-nowrap text-gray-500">
                              {step.time && (
                                <time>{step.time}</time>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {filteredDeliveries.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center py-12"
        >
          <TruckIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No deliveries found</h3>
          <p className="text-gray-600">
            {activeTab === 'active' ? 'You have no active deliveries.' : `No ${activeTab} deliveries found.`}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default DeliveryPage;
