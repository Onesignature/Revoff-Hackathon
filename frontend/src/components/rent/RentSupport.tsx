import React, { useState } from 'react';
import { MessageSquare, Bot, Users, Send, ArrowRight } from 'lucide-react';

const RentSupport: React.FC = () => {
  const [message, setMessage] = useState('');

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Support</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* AI Chat Support */}
        <div className="md:col-span-2 bg-white rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold">AI Assistant</h2>
              <p className="text-gray-600">Get instant help with your rental queries</p>
            </div>
          </div>

          <div className="h-[400px] border border-gray-100 rounded-xl mb-4 p-4 overflow-y-auto">
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <Bot className="w-4 h-4 text-red-600" />
                </div>
                <div className="bg-gray-100 rounded-2xl rounded-tl-none p-4 max-w-[80%]">
                  <p>Hello! I'm your rental assistant. How can I help you today?</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-200 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button className="bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 transition-colors">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Support Options */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">Contact Live Agent</h3>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Live Chat</div>
                    <div className="text-sm text-gray-500">Response in 2 mins</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>

              <button className="w-full flex items-center justify-between bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="text-left">
                    <div className="font-medium">Schedule Call</div>
                    <div className="text-sm text-gray-500">Book a time slot</div>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6">
            <h3 className="text-lg font-bold mb-4">Common Topics</h3>
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Rental Process
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Payment Issues
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Vehicle Information
              </button>
              <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Insurance & Coverage
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentSupport;