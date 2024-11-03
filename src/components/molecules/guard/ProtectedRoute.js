import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  console.log("User in ProtectedRoute:", user);

  if (!user) {
    console.log("Redirecting to login");
    return <Navigate to="/login" />;
  }

  return element;
};

export default ProtectedRoute;
