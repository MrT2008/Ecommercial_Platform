// components/PrivateRoute.tsx
import { useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { JSX, useEffect } from 'react';
import React from 'react';

type Props = {
  children: JSX.Element;
};

const PrivateRoute = ({ children }: Props) => {
  const { session } = useAuth();

  return session ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
