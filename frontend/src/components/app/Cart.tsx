import React from 'react';
import { Trash2, HelpCircle, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Cart: React.FC = () => {
  const { state, dispatch } = useCart();
  
  const total = state.items.reduce((sum, item) => sum + item.price, 0);

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
                    
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Monthly rent</span>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">AED {item.monthlyRent}</span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600">Appreciation</span>
                        <HelpCircle className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">AED {item.appreciation}</span>
                      </div>
                    </div>
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

                    <div className="h-2 bg-gray-100 rounded-full w-32">
                      <div
                        className="h-full bg-emerald-500 rounded-full"
                        style={{ width: `${item.fundingProgress}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">{item.fundingProgress}% funded</span>

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

          <div className="bg-orange-50 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
                <HelpCircle className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Complete onboarding</h3>
                <p className="text-sm text-gray-600 mt-1">
                  Local regulations require all investors to complete onboarding before they can invest.
                </p>
              </div>
            </div>
            <button className="w-full mt-4 flex items-center justify-between bg-white text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-50 transition-colors">
              <span>Complete onboarding</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;