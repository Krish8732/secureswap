import React from "react";
import { Navigate } from "react-router-dom";

const RoutesRedirect = () => {
  return <Navigate to="/exchange-dashboard" replace />;
};

export default RoutesRedirect;
