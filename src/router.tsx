import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";

import { useAuth } from "./context/AuthContext";
import Login from "./pages/Login";

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return null; // or your LoadingSpinner
  if (!user) return <Navigate to="/login" replace />;

  return children;
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <App />
      </ProtectedRoute>
    ),
  },
  {
    path: "/login",
    element: <Login />,
  },
]); 