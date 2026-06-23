import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import ProtectedRoute from "components/ProtectedRoute";
const NotFound = React.lazy(() => import("pages/NotFound"));
const UserLogin = React.lazy(() => import('./pages/user-login'));
const ExchangeDetails = React.lazy(() => import('./pages/exchange-details'));
const ExchangeDashboard = React.lazy(() => import('./pages/exchange-dashboard'));
const CreateExchange = React.lazy(() => import('./pages/create-exchange'));
const ExchangeMatching = React.lazy(() => import('./pages/exchange-matching'));
const UserRegistration = React.lazy(() => import('./pages/user-registration'));

import RoutesRedirect from './RoutesRedirect';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <React.Suspense fallback={
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary mb-2"></div>
          <p className="text-sm text-muted-foreground font-medium animate-pulse">Loading secure session...</p>
        </div>
      }>
        <RouterRoutes>
          <Route path="/" element={<ProtectedRoute><CreateExchange /></ProtectedRoute>} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/exchange-details" element={<ProtectedRoute><ExchangeDetails /></ProtectedRoute>} />
          <Route path="/exchange-dashboard" element={<ProtectedRoute><ExchangeDashboard /></ProtectedRoute>} />
          <Route path="/create-exchange" element={<ProtectedRoute><CreateExchange /></ProtectedRoute>} />
          <Route path="/exchange-matching" element={<ProtectedRoute><ExchangeMatching /></ProtectedRoute>} />
          <Route path="/user-registration" element={<UserRegistration />} />
          <Route path="/dashboard" element={<RoutesRedirect />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </React.Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
