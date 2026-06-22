import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListing from "./pages/customer/ProductListing";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSuccess";

// Day 06 Administrative Vendor Import
import VendorDashboard from "./pages/vendor/VendorDashboard";

// Administrative Vendor Analytics & Products Imports
import AnalyticsDashboard from "./pages/vendor/AnalyticsDashboard";
import VendorProducts from "./pages/vendor/VendorProducts";

// 🌟 New Administrative Platform Authentication Page Imports
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

import "./App.css";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen m-0 p-0 overflow-x-clip bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
        <Routes>
          {/* Marketplace Customer Catalog Routes */}
          <Route path="/" element={<ProductListing />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* Day 04 & 05 Core Checkout Pipeline Endpoints */}
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          {/* Day 06 Operational Vendor Dashboard Endpoints */}
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />
          <Route path="/vendor/analytics" element={<AnalyticsDashboard />} />
          <Route path="/vendor/products" element={<VendorProducts />} />

          {/* 🌟 New Operational Platform Authentication Endpoints */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;