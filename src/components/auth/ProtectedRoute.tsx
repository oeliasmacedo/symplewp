import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import AuthService from '../../services/auth';
import { useWordPress } from '../../contexts/WordPressContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const location = useLocation();
  const { currentUser } = useWordPress();
  const isAuthenticated = AuthService.isAuthenticated();

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
} 