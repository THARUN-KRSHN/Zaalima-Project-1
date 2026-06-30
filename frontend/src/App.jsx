import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/public/Home";
// Base Customer Catalogs & Checkout
import ProductListing from "./pages/customer/ProductListing";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSuccess";

// Vendor Dashboard Management Pages
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AnalyticsDashboard from "./pages/vendor/AnalyticsDashboard";
import VendorProducts from "./pages/vendor/VendorProducts";

// Auth Container Views
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CustomerRegister from "./pages/auth/CustomerRegister";
import VendorRegister from "./pages/auth/VendorRegister";
import ForgotPassword from "./pages/auth/ForgotPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";

// Customer Operations Pages
import Orders from "./pages/customer/Orders";
import OrderDetails from "./pages/customer/OrderDetails";
import Profile from "./pages/customer/Profile";
import Addresses from "./pages/customer/Addresses";

// Security Framework Protection Shields
import ProtectedRoute from "./routes/ProtectedRoute";

import "./App.css";

// 🌟 INTEGRATED ROUTE/QUERY OVERLAY DISPATCH ENGINE
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
          {/* Public Customer Paths */}
          <Route path="/" element={<Home />} />

          {/* Customer Catalog dedicated path routes */}
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* 🔐 Protected Customer-Only Routes */}
          <Route path="/cart" element={<ProtectedRoute allowedRoles={['customer']}><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute allowedRoles={['customer']}><Checkout /></ProtectedRoute>} />

          <Route path="/orders" element={<ProtectedRoute allowedRoles={['customer']}><Orders /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute allowedRoles={['customer']}><OrderDetails /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={['customer']}><Profile /></ProtectedRoute>} />
          <Route path="/profile/addresses" element={<ProtectedRoute allowedRoles={['customer']}><Addresses /></ProtectedRoute>} />

          {/* 🔐 Protected Vendor-Only Administration Workspace Nodes */}
          <Route path="/vendor/dashboard" element={<ProtectedRoute allowedRoles={['vendor']}><VendorDashboard /></ProtectedRoute>} />
          <Route path="/vendor/analytics" element={<ProtectedRoute allowedRoles={['vendor']}><AnalyticsDashboard /></ProtectedRoute>} />
          <Route path="/vendor/products" element={<ProtectedRoute allowedRoles={['vendor']}><VendorProducts /></ProtectedRoute>} />

          {/* 🔐 Protected Admin-Only Administration Workspace Nodes */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

          {/* Fallback endpoints ensuring catalog backgrounds stay visible and blurred behind modals */}
          <Route path="/login" element={<ProductListing />} />
          <Route path="/register" element={<ProductListing />} />
          <Route path="/register/customer" element={<ProductListing />} />
          <Route path="/register/vendor" element={<ProductListing />} />
          <Route path="/forgot-password" element={<ProductListing />} />

          <Route path="/orders" element={<ProductListing />} />
          <Route path="/orders/:id" element={<ProductListing />} />
          <Route path="/profile" element={<ProductListing />} />
          <Route path="/profile/addresses" element={<ProductListing />} />
        </Routes>

        {/* Global Dynamic Overlay Portal Mount Layer */}
        <AuthModalOverlayManager />

      </div>
    </Router>
  );
}