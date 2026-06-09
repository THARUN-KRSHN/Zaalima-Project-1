import React from "react";
import ProductListing from "./pages/customer/ProductListing";
import "./App.css";

function App() {
  return (
    <div className="w-full min-h-screen m-0 p-0 overflow-x-hidden bg-[var(--bg-main)] text-[var(--text-main)] transition-colors duration-300">
      <ProductListing />
    </div>
  );
}

export default App;