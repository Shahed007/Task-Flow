import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/home/Home";
import AuthProvider from "./context/AuthProvider";
import SignIn from "./pages/registration/SignIn";
import { Toaster } from "react-hot-toast";
import Login from "./pages/registration/Login";
import Dashboard from "./pages/dashboard/Dashboard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import TaskBoard from "./pages/taskBoard/TaskBoard";
import PrivateRoute from "./pages/private/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/task-dashboard",
        element: (
          <PrivateRoute>
            <Dashboard></Dashboard>
          </PrivateRoute>
        ),
      },
      {
        path: "/task-board",
        element: (
          <PrivateRoute>
            <TaskBoard></TaskBoard>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/signUp",
    element: <SignIn></SignIn>,
  },
  {
    path: "/logIn",
    element: <Login></Login>,
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-center" reverseOrder={false} />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
