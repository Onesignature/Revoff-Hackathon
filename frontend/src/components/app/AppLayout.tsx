import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import AppSidebar from './AppSidebar';
import AppHeader from './AppHeader';
import Footer from '../Footer';

const isAuthenticated = true;

const AppLayout: React.FC = () => {
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 flex">
        <AppSidebar />
        <div className="flex-1 flex flex-col">
          <AppHeader />
          <main className="flex-1 p-6 bg-gray-100">
            <Outlet />
          </main>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AppLayout;