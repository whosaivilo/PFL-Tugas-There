import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Loading from "./components/Loading";
import { useAuth } from "./contexts/AuthContext"; // Import AuthContext

// Lazy Loading Layouts
const MainLayout = React.lazy(() => import("./layouts/MainLayout"));
const AuthLayout = React.lazy(() => import("./layouts/AuthLayout"));
const MemberLayout = React.lazy(() => import("./layouts/MemberLayout"));

// Guest Pages
const GuestLayout = React.lazy(() => import("./layouts/GuestLayout"));
const GuestPage = React.lazy(() => import("./pages/guest/GuestPage"));
const KatalogProduk = React.lazy(() => import("./pages/guest/KatalogProduk"));
const KontakKami = React.lazy(() => import("./pages/guest/KontakKami"));

// Lazy Loading Pages (Dashboard & CRM IDIC)
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Customers = React.lazy(() => import("./pages/Customers"));       // Tahap Identify
const Segmentation = React.lazy(() => import("./pages/Segmentation")); // Tahap Differentiate
const Interactions = React.lazy(() => import("./pages/Interactions")); // Tahap Interact
const Services = React.lazy(() => import("./pages/Services"));         // Tahap Customize

// Lazy Loading Pages (Inventory, Reports, & Users)
const Inventory = React.lazy(() => import("./pages/Inventory"));
const Orders = React.lazy(() => import("./pages/Orders")); // PRD 2
const Reports = React.lazy(() => import("./pages/Reports"));
const Users = React.lazy(() => import("./pages/Users"));

// Lazy Loading Auth Pages
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

// Lazy Loading Member Pages
const MemberDashboard = React.lazy(() => import("./pages/member/MemberDashboard"));
const MemberProfile = React.lazy(() => import("./pages/member/MemberProfile"));
const MemberRiwayat = React.lazy(() => import("./pages/member/MemberRiwayat"));
const MemberLoyalty = React.lazy(() => import("./pages/member/MemberLoyalty"));
const MemberResep = React.lazy(() => import("./pages/member/MemberResep"));

// Error Pages
const NotFound = React.lazy(() => import("./pages/NotFound"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

function App() {
  const { user, role } = useAuth(); // Ambil state login dari Supabase Context

  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        
        {/* ===== GUEST ROUTE (ROOT) ===== */}
        <Route element={<GuestLayout />}>
          <Route 
            path="/" 
            element={
              !user ? <GuestPage /> :
              role === "member" ? <Navigate to="/member" replace /> :
              <Navigate to="/admin" replace />
            } 
          />
          <Route path="/katalog-produk" element={<KatalogProduk />} />
          <Route path="/kontak-kami" element={<KontakKami />} />
        </Route>

        {/* ===== ADMIN ROUTES (MainLayout) ===== */}
        <Route 
          path="/admin"
          element={
            (!user || role === "member") ? <Navigate to="/login" replace /> : <MainLayout />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="customers" element={<Customers />} />
          <Route path="segmentation" element={<Segmentation />} />
          <Route path="interactions" element={<Interactions />} />
          <Route path="services" element={<Services />} />
          <Route path="inventory" element={<Inventory />} />
          <Route path="orders" element={<Orders />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<Users />} />
          
          <Route
            path="error-401"
            element={
              <ErrorPage
                code="401"
                description="Unauthorized. Anda tidak memiliki akses ke halaman ini."
                image="https://cdn-icons-png.flaticon.com/512/3075/3075977.png"
              />
            }
          />
        </Route>

        {/* ===== MEMBER ROUTES (MemberLayout) ===== */}
        <Route
          path="/member"
          element={
            (!user || role !== "member") ? <Navigate to="/login" replace /> : <MemberLayout />
          }
        >
          <Route index element={<MemberDashboard />} />
          <Route path="profile" element={<MemberProfile />} />
          <Route path="katalog" element={<KatalogProduk />} />
          <Route path="riwayat" element={<MemberRiwayat />} />
          <Route path="loyalty" element={<MemberLoyalty />} />
          <Route path="resep" element={<MemberResep />} />
        </Route>

        {/* ===== AUTH ROUTES ===== */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={
            user ? (
              role === "member" ? <Navigate to="/member" replace /> : <Navigate to="/admin" replace />
            ) : <Login />
          } />
          <Route path="/register" element={
            user ? (
              role === "member" ? <Navigate to="/member" replace /> : <Navigate to="/admin" replace />
            ) : <Register />
          } />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;