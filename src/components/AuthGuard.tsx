import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import GetStarted from "./GetStarted";

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export default function AuthGuard({ children, allowedRoles }: AuthGuardProps) {
  const { user, profile, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while authentication state is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // If user is not authenticated, redirect to welcome page
  if (!user || !profile) {
    if (location.pathname !== "/welcome") {
      return <Navigate to="/welcome" replace />;
    }
    return <GetStarted />;
  }

  // If user is authenticated and on welcome page, redirect to dashboard
  if (location.pathname === "/welcome") {
    return <Navigate to="/" replace />;
  }

  // Check role-based access
  if (allowedRoles && !allowedRoles.includes(profile.role)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h1>
          <p className="text-gray-600">
            You don't have permission to access this page.
          </p>
        </div>
      </div>
    );
  }

  // User is authenticated and has proper access
  return <>{children}</>;
}
