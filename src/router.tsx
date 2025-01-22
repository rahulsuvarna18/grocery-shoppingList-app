import { createBrowserRouter, Navigate } from "react-router-dom";
import HomePage from "./pages/Home";
import Login from "./pages/Login";
import GroceryList from "./pages/GroceryList";
import AppLayout from "./ui/AppLayout";
import { useAuth } from "./context/AuthContext";

// Protected Route wrapper component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();

  if (loading) return null;
  if (!user) return <Navigate to="/login" replace />;

  return (
    <AppLayout>
      {children}
    </AppLayout>
  );
};

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/home" replace />,
  },
  {
    path: "/login",
    element: <Login />,
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
]); 