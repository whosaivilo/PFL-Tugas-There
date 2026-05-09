import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Loading from "./components/Loading";

// Lazy Loading Layouts
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));

// Lazy Loading Pages (Dashboard & CRM IDIC)
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Customers = React.lazy(() => import("./pages/Customers"));       // Tahap Identify
const Segmentation = React.lazy(() => import("./pages/Segmentation")); // Tahap Differentiate
const Interactions = React.lazy(() => import("./pages/Interactions")); // Tahap Interact
const Services = React.lazy(() => import("./pages/Services"));         // Tahap Customize

// Lazy Loading Pages (Inventory & Reports)
const Inventory = React.lazy(() => import("./pages/Inventory"));
const Reports = React.lazy(() => import("./pages/Reports"));

// Lazy Loading Auth Pages
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

// Error Pages
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Private Routes (Menggunakan MainLayout Navy) */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/segmentation" element={<Segmentation />} />
          <Route path="/interactions" element={<Interactions />} />
          <Route path="/services" element={<Services />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/reports" element={<Reports />} />
          
          {/* Error Route Handling di dalam Layout Utama */}
          <Route
            path="/error-401"
            element={
              <ErrorPage
                code="401"
                description="Unauthorized. Anda tidak memiliki akses ke halaman ini."
                image="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
              />
            }
          />
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Public Routes (Menggunakan AuthLayout Navy) */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;