import React from "react";

import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

const ProtectedRoute = ({ element }) => {
  const { user } = useAuth();
  console.log("User in ProtectedRoute:", user); // Log user untuk debugging

  if (!user) {
    console.log("Redirecting to login"); // Log untuk memahami alur
    return <Navigate to="/login" />;
  }

  return element; // Kembalikan elemen jika user ada
};

export default ProtectedRoute;
