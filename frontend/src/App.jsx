import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/public/Home";
// Base Customer Catalogs & Checkout Flow Pages
import ProductListing from "./pages/customer/ProductListing";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSuccess";

// Vendor Dashboard Management Framework Pages
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AnalyticsDashboard from "./pages/vendor/AnalyticsDashboard";
import VendorProducts from "./pages/vendor/VendorProducts";

// Back-Office Super Admin Dashboard
import AdminDashboard from "./pages/admin/AdminDashboard";

// Modular Form Authentication Overlay Core Injections
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CustomerRegister from "./pages/auth/CustomerRegister";
import VendorRegister from "./pages/auth/VendorRegister";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Completed Customer Suite Operations Page Modules
import Orders from "./pages/customer/Orders";
import OrderDetails from "./pages/customer/OrderDetails";
import Profile from "./pages/customer/Profile";
import Addresses from "./pages/customer/Addresses";
import Wishlist from "./pages/customer/Wishlist";

// Security Guard Access Authorization Protection Shields
import ProtectedRoute from "./routes/ProtectedRoute";

import "./App.css";

// 🌟 DYNAMIC MATRIX CONTROLLER: Resolves query parameter triggers and residual sticky hashes gracefully
function AuthModalOverlayManager() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const authQuery = searchParams.get("auth");
  const currentPath = location.pathname;
  const currentHash = location.hash;

  if (authQuery === "forgot" || currentPath === "/forgot-password" || currentHash === "#forgot") return <ForgotPassword />;
  if (authQuery === "register_customer" || currentPath === "/register/customer") return <CustomerRegister />;
  if (authQuery === "register_vendor" || currentPath === "/register/vendor") return <VendorRegister />;
  if (authQuery === "register" || currentPath === "/register" || currentHash === "#register") return <Register />;
  if (authQuery === "login" || currentPath === "/login" || currentHash === "#login") return <Login />;

  return null;
}

export default function App() {
  return (
    <Router>
      <div className="w-full min-h-screen m-0 p-0 overflow-x-clip bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 relative">

        <Routes>
          {/* ==========================================
              1. PUBLIC ANONYMOUS PLATFORM PATHWAY NODES
              ========================================== */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* ==========================================
              2. SECURE RBAC PROTECTED CUSTOMER MODULE ARRAY
              ========================================== */}
          <Route path="/cart" element={<ProtectedRoute allowedRoles={['customer']}><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute allowedRoles={['customer']}><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute allowedRoles={['customer']}><Orders /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute allowedRoles={['customer']}><OrderDetails /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={['customer']}><Profile /></ProtectedRoute>} />
          <Route path="/profile/addresses" element={<ProtectedRoute allowedRoles={['customer']}><Addresses /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute allowedRoles={['customer']}><Wishlist /></ProtectedRoute>} />

          {/* ==========================================
              3. SECURE RBAC PROTECTED COMMERCIAL MERCHANT SUITE
              ========================================== */}
          <Route path="/vendor/dashboard" element={<ProtectedRoute allowedRoles={['vendor']}><VendorDashboard /></ProtectedRoute>} />
          <Route path="/vendor/analytics" element={<ProtectedRoute allowedRoles={['vendor']}><AnalyticsDashboard /></ProtectedRoute>} />
          <Route path="/vendor/products" element={<ProtectedRoute allowedRoles={['vendor']}><VendorProducts /></ProtectedRoute>} />

          {/* ==========================================
              4. SECURE RBAC PROTECTED ADMINISTRATIVE MONOLITH
              ========================================== */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

          {/* ==========================================
              5. BACKGROUND CONTEXT BLUR DIRECTORY FALLBACK ENGINES
              ========================================== */}
          <Route path="/login" element={<ProductListing />} />
          <Route path="/register" element={<ProductListing />} />
          <Route path="/register/customer" element={<ProductListing />} />
          <Route path="/register/vendor" element={<ProductListing />} />
          <Route path="/forgot-password" element={<ProductListing />} />

          <Route path="/orders" element={<ProductListing />} />
          <Route path="/orders/:id" element={<ProductListing />} />
          <Route path="/profile" element={<ProductListing />} />
          <Route path="/profile/addresses" element={<ProductListing />} />
          <Route path="/wishlist" element={<ProductListing />} />
        </Routes>

        {/* Global Dynamic Modal Layer Mount Portal Insertion Node */}
        <AuthModalOverlayManager />

      </div>
    </Router>
  );
}