import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import { verifyPayment } from '../../services/paymentService';

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [paymentDetails, setPaymentDetails] = useState<{
    success: boolean;
    amount?: number;
  }>({
    success: false,
  });
  useEffect(() => {
    const checkPaymentStatus = async () => {
      const params = new URLSearchParams(location.search);
      const sessionId = params.get('session_id');

      if (!sessionId) {
        setIsLoading(false);
        return;
      }

      try {
        const data = await verifyPayment(sessionId);

        setPaymentDetails({
          success: data.success,
          amount: data.session?.amount_total ? data.session.amount_total / 100 : undefined,
        });
      } catch (error) {
        console.error('Error verifying payment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkPaymentStatus();
  }, [location]);

  return (
    <div className="py-12 px-4 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl p-8 shadow-sm">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-600">Verifying payment...</p>
          </div>
        ) : paymentDetails.success ? (
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful</h1>
            {paymentDetails.amount && (
              <p className="text-xl text-gray-700 mb-6">
                You have successfully paid AED {paymentDetails.amount.toLocaleString()}
              </p>
            )}
            <p className="text-gray-600 mb-8">
              Thank you for your payment. A confirmation email has been sent to your registered email address.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/rent/my-rentals')}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                View My Rentals
              </button>
              <button
                onClick={() => navigate('/app/dashboard')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Dashboard
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Payment Failed</h1>
            <p className="text-gray-600 mb-8">
              We couldn't process your payment. Please try again or contact support for assistance.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => navigate('/app/cart')}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => navigate('/app/support')}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Contact Support
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentSuccess;
