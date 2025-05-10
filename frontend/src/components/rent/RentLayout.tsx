import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import RentHeader from './RentHeader';
import RentSidebar from './RentSidebar';
import Footer from '../Footer';

const isAuthenticated = true;

const RentLayout: React.FC = () => {
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex">
        <RentSidebar />
        <div className="flex-1 flex flex-col">
          <RentHeader />
          <main className="flex-1 p-6 bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RentLayout;