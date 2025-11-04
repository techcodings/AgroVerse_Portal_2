import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../../config/firebase";

export default function ProtectedAdminRoute({ children }) {
  const user = auth.currentUser;
  const role = localStorage.getItem("role");

  if (!user || role !== "admin") {
    return <Navigate to="/admin-login" replace />;
  }

  return children;
}
