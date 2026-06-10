import React from 'react';
// Import the data
import { product } from '../../data/productDetails';

import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ProductGallery from '../../components/product/ProductGallery';
import ProductInfo from '../../components/product/ProductInfo';
import QuantitySelector from '../../components/product/QuantitySelector';
import VendorInfo from '../../components/product/VendorInfo';
import SimilarProducts from '../../components/product/SimilarProducts';

export default function ProductDetails() {
    // Now using the imported 'product' constant directly
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8">
                <nav className="text-sm text-gray-500 mb-6">
                    Home &gt; {product.category} &gt; {product.name}
                </nav>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                    {/* Passing images to gallery if needed */}
                    <ProductGallery images={product.images} />

                    <div className="flex flex-col gap-6">
                        <ProductInfo product={product} />
                        <QuantitySelector />
                        <button className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition w-full md:w-max">
                            Add To Cart
                        </button>
                    </div>
                </div>

                <div className="mb-12">
                    <h2 className="text-xl font-bold mb-4">Sold By</h2>
                    <VendorInfo vendor={product.vendor} />
                </div>

                <div className="mb-12 border-t pt-8">
                    <h2 className="text-2xl font-bold mb-4">Description</h2>
                    <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                <SimilarProducts />
            </main>

            <Footer />
        </div>
    );
}