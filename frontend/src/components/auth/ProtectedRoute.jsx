
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { isAuthenticated } from "../../utils/auth";

function ProtectedRoute() {
  const location = useLocation();
  const ok = isAuthenticated();

  if (!ok) {
    
    return (
      <Navigate
        to="/usuario"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  
  return <Outlet />;
}

export default ProtectedRoute;