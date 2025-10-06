import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import UserLogin from './pages/user-login';
import ExchangeDetails from './pages/exchange-details';
import ExchangeDashboard from './pages/exchange-dashboard';
import CreateExchange from './pages/create-exchange';
import ExchangeMatching from './pages/exchange-matching';
import UserRegistration from './pages/user-registration';

import RoutesRedirect from './RoutesRedirect';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<CreateExchange />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/exchange-details" element={<ExchangeDetails />} />
        <Route path="/exchange-dashboard" element={<ExchangeDashboard />} />
        <Route path="/create-exchange" element={<CreateExchange />} />
        <Route path="/exchange-matching" element={<ExchangeMatching />} />
        <Route path="/user-registration" element={<UserRegistration />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/dashboard" element={<RoutesRedirect />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
