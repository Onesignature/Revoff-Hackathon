import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from './Logo';

const TermsOfService: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate(-1)}
              className="text-white hover:text-red-400 transition-colors flex items-center gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <div className="absolute left-1/2 -translate-x-1/2">
              <Logo />
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: March 15, 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Agreement to Terms</h2>
            <p className="text-gray-600">
              By accessing or using REVOFF's platform, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Investment Terms</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Minimum investment requirements</li>
              <li>Investment period and lock-in terms</li>
              <li>Return distribution schedule</li>
              <li>Exit options and conditions</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Platform Usage</h2>
            <p className="text-gray-600">
              Users must be at least 18 years old and legally able to enter into contracts. The platform is for personal investment use only.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Risk Disclosure</h2>
            <p className="text-gray-600">
              All investments carry risk. Past performance is not indicative of future results. Users should carefully consider their investment objectives and risks.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
            <p className="text-gray-600">
              REVOFF shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the platform.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;