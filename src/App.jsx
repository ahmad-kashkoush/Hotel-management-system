import Account from "@/pages/Account";
import Bookings from "@/pages/Bookings";
import Cabins from "@/pages/Cabins";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import PageNotFound from "@/pages/PageNotFound";
import Settings from "@/pages/Settings";
import NewUsers from "@/pages/Users";

import AppLayout from "@/ui/AppLayout";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    path: "/",
    errorElement: <PageNotFound />,
    children: [
      // default
      { index: true, element: <Navigate to="/dashboard" replace /> },
      // main page
      { path: "/dashboard", element: <Dashboard /> },
      // bookings
      { path: "/bookings", element: <Bookings /> },
      { path: "/bookings/:id", element: <Bookings /> },
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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
