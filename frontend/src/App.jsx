import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

// Customer Marketplace Base Pages
import ProductListing from "./pages/customer/ProductListing";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSuccess";

// Operational Admin Dashboards
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AnalyticsDashboard from "./pages/vendor/AnalyticsDashboard";
import VendorProducts from "./pages/vendor/VendorProducts";

// Modular Form Injections
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import "./App.css";

// 🌟 DYNAMIC MATRIX CONTROLLER: Intercepts active frames to resolve direct paths and search query strings gracefully
function AuthModalOverlayManager() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const authQuery = searchParams.get("auth");
  const currentPath = location.pathname;
  const currentHash = location.hash;

  // 1. Check for recovery states first (prevents ?auth=login from hijacking the view)
  if (authQuery === "forgot" || currentPath === "/forgot-password" || currentHash === "#forgot") {
    return <ForgotPassword />;
  }

  // 2. Check for registration states
  if (authQuery === "register" || currentPath === "/register" || currentHash === "#register") {
    return <Register />;
  }

  // 3. Fall back to standard login state
  if (authQuery === "login" || currentPath === "/login") {
    return <Login />;
  }

  return null;
}

export default function App() {
  return (
    <Router>
      <div className="w-full min-h-screen m-0 p-0 overflow-x-clip bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300 relative">

        <Routes>
          {/* Marketplace Client Framework Nodes */}
          <Route path="/" element={<ProductListing />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Operational Back-office Node Targets */}
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/analytics" element={<AnalyticsDashboard />} />
          <Route path="/vendor/products" element={<VendorProducts />} />

          {/* 🌟 DIRECT ROUTE FALLBACK ENGINES: Maps paths back to home context to guarantee blurred layers instead of blank screens */}
          <Route path="/login" element={<ProductListing />} />
          <Route path="/register" element={<ProductListing />} />
          <Route path="/forgot-password" element={<ProductListing />} />
        </Routes>

        {/* Global Modal Insertion Point Layer */}
        <AuthModalOverlayManager />

      </div>
    </Router>
  );
}