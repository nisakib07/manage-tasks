import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import { RouterProvider } from "react-router-dom";
import Routes from "./routes/Routes.jsx";
import AuthProvider from "./Provider/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <div className=" bg-slate-100 min-h-screen">
          <div className="max-w-screen-xl mx-auto">
            <RouterProvider router={Routes} />
            <ToastContainer></ToastContainer>
          </div>
        </div>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
