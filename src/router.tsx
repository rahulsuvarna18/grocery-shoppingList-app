import { createHashRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import GroceryList from "./pages/GroceryList";
import AppLayout from "./ui/AppLayout";
import { useAuth } from "./context/AuthContext";
import Inventory from "./pages/Inventory";
import Dashboard from "./pages/Dashboard";
// import Dashboard from "./pages/Dashboard";

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return <AppLayout>{children}</AppLayout>;
};

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (user) return <Navigate to="/home" replace />;

  return <>{children}</>;
};

export const router = createHashRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Landing />
      </PublicRoute>
    ),
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <Login />
      </PublicRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/list/:listName",
    element: (
      <ProtectedRoute>
        <GroceryList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/inventory",
    element: (
      <ProtectedRoute>
        <Inventory />
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
]);
