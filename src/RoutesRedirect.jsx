import React from "react";
import { Navigate } from "react-router-dom";

const RoutesRedirect = () => {
  return (
    <>
      {/* Redirect /dashboard to /exchange-dashboard */}
      <Navigate from="/dashboard" to="/exchange-dashboard" replace />
    </>
  );
};

export default RoutesRedirect;
