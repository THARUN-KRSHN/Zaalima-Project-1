import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListing from "./pages/customer/ProductListing";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSuccess";

// Day 06 Administrative Vendor Import
import VendorDashboard from "./pages/vendor/VendorDashboard";

// 🌟 New Administrative Vendor Analytics Import
import AnalyticsDashboard from "./pages/vendor/AnalyticsDashboard";
import VendorProducts from "./pages/vendor/VendorProducts";

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

          {/* Day 06 Operational Vendor Endpoint */}
          <Route path="/vendor/dashboard" element={<VendorDashboard />} />

          {/* 🌟 New Operational Vendor Analytics Endpoint */}
          <Route path="/vendor/analytics" element={<AnalyticsDashboard />} />
          <Route path="/vendor/products" element={<VendorProducts />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;