import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Logo from './Logo';

const CookiePolicy: React.FC = () => {
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
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Cookie Policy</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-6">
            Last updated: March 15, 2024
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies</h2>
            <p className="text-gray-600">
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and actions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>Essential cookies for platform functionality</li>
              <li>Analytics cookies to improve our service</li>
              <li>Preference cookies to remember your settings</li>
              <li>Marketing cookies for targeted advertising</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Managing Cookies</h2>
            <p className="text-gray-600">
              You can control and/or delete cookies as you wish. You can delete all cookies that are already on your device and you can set most browsers to prevent them from being placed.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
            <p className="text-gray-600">
              Some of our pages display content from external providers, such as YouTube, Facebook, and Twitter. To view this content, you first have to accept their specific terms and conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Contact Us</h2>
            <p className="text-gray-600">
              If you have any questions about our use of cookies, please contact us at cookies@revoff.com.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CookiePolicy;