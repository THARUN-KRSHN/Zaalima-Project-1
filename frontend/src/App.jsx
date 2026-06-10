import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListing from "./pages/customer/ProductListing";
import ProductDetails from "./pages/customer/ProductDetails";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="w-full min-h-screen m-0 p-0 overflow-x-hidden bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
        <Routes>
          {/* Main Product Listing Route */}
          <Route path="/" element={<ProductListing />} />
          <Route path="/products" element={<ProductListing />} />

          {/* Dynamic Product Details Route */}
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;