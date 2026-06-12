import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListing from "./pages/customer/ProductListing";
import ProductDetails from "./pages/customer/ProductDetails";
// 🌟 STEP 1: Import your newly structured Day 04 Cart Page component
import Cart from "./pages/customer/Cart";
import "./App.css";

function App() {
  return (
    <Router>
      {/* Structural layout canvas wrapper tracking unified theme design token values */}
      <div className="w-full min-h-screen m-0 p-0 overflow-x-clip bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
        <Routes>
          {/* Main Product Listing Routes */}
          <Route path="/" element={<ProductListing />} />
          <Route path="/products" element={<ProductListing />} />

          {/* Dynamic Product Details Route */}
          <Route path="/products/:id" element={<ProductDetails />} />

          {/* 🌟 STEP 2: Dedicated Customer Shopping Cart Navigation Link Endpoint */}
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;