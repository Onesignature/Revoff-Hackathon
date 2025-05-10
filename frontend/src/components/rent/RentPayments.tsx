import React from 'react';
import { CreditCard, Calendar, Download, ArrowUpRight } from 'lucide-react';

const RentPayments: React.FC = () => {
  const transactions = [
    {
      id: 1,
      car: "Porsche 911 GT3 RS",
      date: "2024-03-15",
      amount: 10500,
      status: "completed",
      type: "rental"
    },
    {
      id: 2,
      car: "Lamborghini Urus",
      date: "2024-03-10",
      amount: 14000,
      status: "completed",
      type: "rental"
    }
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Payments</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6">
          <h3 className="text-gray-600 mb-2">Total Spent</h3>
          <div className="text-3xl font-bold">AED 24,500</div>
          <div className="mt-4 text-sm text-gray-500">Last 30 days</div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <h3 className="text-gray-600 mb-2">Active Rentals</h3>
          <div className="text-3xl font-bold">2</div>
          <div className="mt-4 text-sm text-gray-500">Total value: AED 15,500</div>
        </div>

        <div className="bg-white rounded-xl p-6">
          <h3 className="text-gray-600 mb-2">Next Payment</h3>
          <div className="text-3xl font-bold">AED 7,500</div>
          <div className="mt-4 text-sm text-gray-500">Due in 5 days</div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-6">
        <h2 className="text-xl font-bold mb-6">Payment Methods</h2>
        <div className="flex gap-4 mb-6">
          <div className="flex-1 border border-gray-200 rounded-xl p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <CreditCard className="w-6 h-6 text-gray-400" />
                <div>
                  <div className="font-medium">•••• 4242</div>
                  <div className="text-sm text-gray-500">Expires 12/25</div>
                </div>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                Default
              </span>
            </div>
          </div>
          <button className="px-6 py-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            + Add New Card
          </button>
        </div>

        <h2 className="text-xl font-bold mb-6">Transaction History</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 font-medium text-gray-600">Car</th>
                <th className="text-left py-4 font-medium text-gray-600">Date</th>
                <th className="text-left py-4 font-medium text-gray-600">Amount</th>
                <th className="text-left py-4 font-medium text-gray-600">Status</th>
                <th className="text-left py-4 font-medium text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id} className="border-b border-gray-100">
                  <td className="py-4">{transaction.car}</td>
                  <td className="py-4">{transaction.date}</td>
                  <td className="py-4">AED {transaction.amount}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                      {transaction.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <button className="text-gray-600 hover:text-gray-900">
                      <Download className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RentPayments;