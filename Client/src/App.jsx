import BookingDetail from "@/features/bookings/BookingDetail";
import { DarkModeProvider } from "@/features/context/DarkModeContext";
import GlobalStyles from "@/styles/GlobalStyles";
import { AppLayout } from "@/ui";
import ErrorFallback from "@/ui/ErrorFallback";
import ProtectedRoute from "@/ui/ProtectedRoute";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import Account from "@/pages/Account";
import Bookings from "@/pages/Bookings";
import Cabins from "@/pages/Cabins";
import Checkin from "@/pages/Checkin";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import Settings from "@/pages/Settings";
import NewUsers from "@/pages/Users";

const router = createBrowserRouter([
  {
    element: (
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => window.location.replace("/")}
      >
        <ProtectedRoute>
          <AppLayout />
        </ProtectedRoute>
      </ErrorBoundary>
    ),
    path: "/",
    children: [
      // default
      { index: true, element: <Navigate to="/dashboard" replace /> },
      // main page
      { path: "/dashboard", element: <Dashboard /> },
      // bookings
      {
        path: "/bookings",
        element: <Bookings />,
      },
      { path: "/bookings/:id", element: <BookingDetail /> },
      { path: "/checkin/:id", element: <Checkin /> },
      // Cabins
      { path: "/cabins", element: <Cabins /> },
      { path: "/cabins/:id", element: <Cabins /> },
      // users
      { path: "/users", element: <NewUsers /> },
      // Authentication
      { path: "/account", element: <Account /> },
      // settings
      { path: "/settings", element: <Settings /> },
      // settings
    ],
  },
  { path: "/login", element: <Login /> },
]);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <>
      <GlobalStyles />
      <DarkModeProvider>
        <QueryClientProvider client={queryClient}>
          <ReactQueryDevtools initialIsOpen={false} />
          <RouterProvider router={router} />
          <Toaster
            position="top-center"
            gutter={12}
            containerStyle={{ margin: "8px" }}
            toastOptions={{
              success: { duration: 3000 },
              error: { duration: 5000 },
              style: {
                fontSize: "16px",
                maxWidth: "500px",
                padding: "16px 24px",
                backgroundColor: "var(--color-grey-0)",
                color: "var(--color-grey-700)",
              },
            }}
          />
        </QueryClientProvider>
      </DarkModeProvider>
    </>
  );
}

export default App;
