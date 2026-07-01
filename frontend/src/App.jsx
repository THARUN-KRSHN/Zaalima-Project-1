import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Home from "./pages/public/Home";
import About from "./pages/public/About";
import Contact from "./pages/public/Contact";
import FAQs from "./pages/public/FAQs";
import PrivacyPolicy from "./pages/public/PrivacyPolicy";
import TermsConditions from "./pages/public/TermsConditions";
import NotFound from "./pages/public/NotFound";
import Unauthorized from "./pages/public/Unauthorized";
import NetworkError from "./pages/public/NetworkError";

// Customer Catalog & Checkout Flow
import ProductListing from "./pages/customer/ProductListing";
import ProductDetails from "./pages/customer/ProductDetails";
import Cart from "./pages/customer/Cart";
import Checkout from "./pages/customer/Checkout";
import OrderSuccess from "./pages/customer/OrderSuccess";

// Customer Account Pages
import Orders from "./pages/customer/Orders";
import OrderDetails from "./pages/customer/OrderDetails";
import Profile from "./pages/customer/Profile";
import Addresses from "./pages/customer/Addresses";
import Wishlist from "./pages/customer/Wishlist";

// Vendor Dashboard Pages
import VendorDashboard from "./pages/vendor/VendorDashboard";
import AnalyticsDashboard from "./pages/vendor/AnalyticsDashboard";
import VendorProducts from "./pages/vendor/VendorProducts";
import VendorOrders from "./pages/vendor/VendorOrders";
import Inventory from "./pages/vendor/Inventory";
import VendorSettings from "./pages/vendor/VendorSettings";

// Admin Dashboard Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminVendors from "./pages/admin/AdminVendors";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminSettings from "./pages/admin/AdminSettings";

// Auth Overlay Pages
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import CustomerRegister from "./pages/auth/CustomerRegister";
import VendorRegister from "./pages/auth/VendorRegister";
import ForgotPassword from "./pages/auth/ForgotPassword";

// Route Protection
import ProtectedRoute from "./routes/ProtectedRoute";

import "./App.css";

// Resolves auth query params and path-based auth triggers into overlay modals
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
              1. PUBLIC PAGES — No auth required
              ========================================== */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductListing />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faqs" element={<FAQs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="/network-error" element={<NetworkError />} />

          {/* ==========================================
              2. CUSTOMER PROTECTED ROUTES
              ========================================== */}
          <Route path="/cart" element={<ProtectedRoute allowedRoles={['customer']}><Cart /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute allowedRoles={['customer']}><Checkout /></ProtectedRoute>} />
          <Route path="/orders" element={<ProtectedRoute allowedRoles={['customer']}><Orders /></ProtectedRoute>} />
          <Route path="/orders/:id" element={<ProtectedRoute allowedRoles={['customer']}><OrderDetails /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute allowedRoles={['customer']}><Profile /></ProtectedRoute>} />
          <Route path="/profile/addresses" element={<ProtectedRoute allowedRoles={['customer']}><Addresses /></ProtectedRoute>} />
          <Route path="/wishlist" element={<ProtectedRoute allowedRoles={['customer']}><Wishlist /></ProtectedRoute>} />

          {/* ==========================================
              3. VENDOR PROTECTED ROUTES
              ========================================== */}
          <Route path="/vendor/dashboard" element={<ProtectedRoute allowedRoles={['vendor']}><VendorDashboard /></ProtectedRoute>} />
          <Route path="/vendor/analytics" element={<ProtectedRoute allowedRoles={['vendor']}><AnalyticsDashboard /></ProtectedRoute>} />
          <Route path="/vendor/products" element={<ProtectedRoute allowedRoles={['vendor']}><VendorProducts /></ProtectedRoute>} />
          <Route path="/vendor/orders" element={<ProtectedRoute allowedRoles={['vendor']}><VendorOrders /></ProtectedRoute>} />
          <Route path="/vendor/inventory" element={<ProtectedRoute allowedRoles={['vendor']}><Inventory /></ProtectedRoute>} />
          <Route path="/vendor/settings" element={<ProtectedRoute allowedRoles={['vendor']}><VendorSettings /></ProtectedRoute>} />

          {/* ==========================================
              4. ADMIN PROTECTED ROUTES
              ========================================== */}
          <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />
          <Route path="/admin/users" element={<ProtectedRoute allowedRoles={['admin']}><AdminUsers /></ProtectedRoute>} />
          <Route path="/admin/vendors" element={<ProtectedRoute allowedRoles={['admin']}><AdminVendors /></ProtectedRoute>} />
          <Route path="/admin/products" element={<ProtectedRoute allowedRoles={['admin']}><AdminProducts /></ProtectedRoute>} />
          <Route path="/admin/orders" element={<ProtectedRoute allowedRoles={['admin']}><AdminOrders /></ProtectedRoute>} />
          <Route path="/admin/analytics" element={<ProtectedRoute allowedRoles={['admin']}><AdminAnalytics /></ProtectedRoute>} />
          <Route path="/admin/settings" element={<ProtectedRoute allowedRoles={['admin']}><AdminSettings /></ProtectedRoute>} />

          {/* ==========================================
              5. AUTH BACKGROUND ROUTES (show product listing behind modal)
              ========================================== */}
          <Route path="/login" element={<ProductListing />} />
          <Route path="/register" element={<ProductListing />} />
          <Route path="/register/customer" element={<ProductListing />} />
          <Route path="/register/vendor" element={<ProductListing />} />
          <Route path="/forgot-password" element={<ProductListing />} />

          {/* ==========================================
              6. CATCH-ALL 404
              ========================================== */}
          <Route path="*" element={<NotFound />} />
        </Routes>

        {/* Auth Modal Overlay — renders on top of current route */}
        <AuthModalOverlayManager />

      </div>
    </Router>
  );
}