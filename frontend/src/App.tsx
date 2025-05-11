import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Elements } from '@stripe/react-stripe-js';
import stripePromise from './utils/stripe';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import SpecsSection from './components/SpecsSection';
import TechSpecsSection from './components/TechSpecsSection';
import FAQSection from './components/FAQSection';
import ProductsSection from './components/ProductsSection';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import CookiePolicy from './components/CookiePolicy';
import Rent from './components/Rent';
import RentLayout from './components/rent/RentLayout';
import RentDashboard from './components/rent/RentDashboard';
import RentMyRentals from './components/rent/RentMyRentals';
import RentPayments from './components/rent/RentPayments';
import RentHistory from './components/rent/RentHistory';
import RentFavorites from './components/rent/RentFavorites';
import AuthPage from './components/AuthPage';
import AppLayout from './components/app/AppLayout';
import Dashboard from './components/app/Dashboard';
import Marketplace from './components/app/Marketplace';
import Portfolio from './components/app/Portfolio';
import VehicleDetails from './components/app/VehicleDetails';
import Wallet from './components/app/Wallet';
import AIWealthManager from './components/app/AIWealthManager';
import Rewards from './components/app/Rewards';
import Support from './components/app/Support';
import Cart from './components/app/Cart';
import PaymentSuccess from './components/app/PaymentSuccess';
import Footer from './components/Footer';

const HomePage = () => (
  <>
    <HeroSection />
    <FeaturesSection />
    <SpecsSection />
    <TechSpecsSection />
    <FAQSection />
    <ProductsSection />
    <Footer />
  </>
);

function App() {
  useEffect(() => {
    // Update the page title
    document.title = 'REVOFF - Experience Pure Power';
  }, []);
  return (
    <Router>
      <Elements stripe={stripePromise}>
        <CartProvider>
          <main className="min-h-screen">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/rent-cars" element={<Rent />} />
            <Route path="/app" element={<AppLayout />}>
              <Route index element={<Navigate to="/app/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="marketplace" element={<Marketplace />} />
              <Route path="marketplace/:id" element={<VehicleDetails />} />
              <Route path="portfolio" element={<Portfolio />} />
              <Route path="wallet" element={<Wallet />} />
              <Route path="ai-wealth-manager" element={<AIWealthManager />} />              <Route path="rewards" element={<Rewards />} />
              <Route path="support" element={<Support />} />
              <Route path="cart" element={<Cart />} />
              <Route path="payment/success" element={<PaymentSuccess />} />
            </Route>
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/rent" element={<RentLayout />}>
              <Route index element={<Navigate to="/rent/dashboard" replace />} />
              <Route path="dashboard" element={<RentDashboard />} />
              <Route path="my-rentals" element={<RentMyRentals />} />
              <Route path="payments" element={<RentPayments />} />
              <Route path="history" element={<RentHistory />} />
              <Route path="favorites" element={<RentFavorites />} />
              <Route path="support" element={<Support />} />
            </Route>
          </Routes>        </main>
      </CartProvider>
    </Elements>
    </Router>
  );
}

export default App;