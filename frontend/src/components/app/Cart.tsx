import React, { useState } from 'react';
import { Trash2, Plus, Minus, Loader2 } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useStripe } from '@stripe/react-stripe-js';
import { createCheckoutSession } from '../../services/paymentService';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  const stripe = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  
  const total = state.items.reduce((sum, item) => sum + item.price, 0);
  const handlePayment = async () => {
    if (!stripe || state.items.length === 0) return;

    try {
      setIsLoading(true);
      
      // Create checkout session using the payment service
      const data = await createCheckoutSession(state.items);

      if (!data.success) {
        console.error('Error creating checkout session:', data.message);
        return;
      }

      // Redirect to Stripe Checkout
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Cart ({state.items.length})
        </h1>
        <button className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors">
          <Plus className="w-5 h-5" />
          Add more
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {state.items.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-gray-500">
              Your cart is empty
            </div>
          ) : (
            state.items.map((item) => (
              <div key={item.id} className="bg-white rounded-xl p-6">
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                  </div>

                  <div className="flex flex-col items-end gap-4">
                    <div className="flex items-center gap-4">
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <Minus className="w-5 h-5" />
                      </button>
                      <span className="font-medium">AED {item.price.toLocaleString()}</span>
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>

                    <button
                      onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                      className="text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Summary */}
        <div className="bg-white rounded-xl p-6 h-fit space-y-6">
          <h2 className="text-xl font-semibold">Total</h2>
          <div className="text-3xl font-bold">AED {total.toLocaleString()}</div>

          <button 
            onClick={handlePayment}
            disabled={isLoading || state.items.length === 0}
            className={`w-full mt-4 flex items-center justify-center ${
              isLoading || state.items.length === 0 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-red-600 hover:bg-red-700'
            } text-white px-4 py-3 rounded-lg transition-colors`}
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing...
              </div>
            ) : (
              'Pay Now'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;