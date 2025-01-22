import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";

const queryClient = new QueryClient();

const App: React.FC = () => {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  );
};

export default App;
