import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ShoppingCart, ShoppingBag, ArrowLeft } from 'lucide-react';

// --- PLATFORM INTERIOR LAYOUTS ---
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import Loader from '../../components/common/Loader';
import Breadcrumbs from '../../components/common/Breadcrumbs';

// --- REUSABLE PRODUCT ATOMS ---
import ProductGallery from '../../components/product/ProductGallery';
import ProductInfo from '../../components/product/ProductInfo';
import QuantitySelector from '../../components/product/QuantitySelector';
import VendorInfo from '../../components/product/VendorInfo';
import SimilarProducts from '../../components/product/SimilarProducts';

// --- CENTRALIZED MOCK DATA ---
import { getProductDetailsById } from '../../data/productDetails';
import { getProductsByCategory } from '../../data/products';
import { getProductById, getSimilarProducts } from '../../services/productService';

export default function ProductDetails() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [qty, setQty] = useState(1);
    const navigate = useNavigate();

    const [product, setProduct] = useState(() => getProductDetailsById(id));
    const [similarProducts, setSimilarProducts] = useState([]);

    const handleAddToCart = () => {
        navigate("/cart");
    };

    const handleBuyNow = () => {
        navigate("/cart");
    };

    useEffect(() => {
        window.scrollTo(0, 0);
        const fetchProductData = async () => {
            setLoading(true);
            let activeProduct = null;
            try {
                const data = await getProductById(id);
                if (data && data.success && data.product) {
                    activeProduct = data.product;
                    setProduct(data.product);
                    
                    try {
                        const simData = await getSimilarProducts(id);
                        if (simData && simData.success && simData.products) {
                            setSimilarProducts(simData.products);
                        } else {
                            setSimilarProducts([]);
                        }
                    } catch {
                        const simList = getProductsByCategory(data.product.category)
                            .filter((p) => p.id !== data.product.id)
                            .slice(0, 4);
                        setSimilarProducts(simList);
                    }
                } else {
                    activeProduct = getProductDetailsById(id);
                    setProduct(activeProduct);
                    const simList = getProductsByCategory(activeProduct.category)
                        .filter((p) => p.id !== activeProduct.id)
                        .slice(0, 4);
                    setSimilarProducts(simList);
                }
            } catch (error) {
                console.warn(`Failed to fetch product details for ID ${id}, using fallback:`, error.message);
                activeProduct = getProductDetailsById(id);
                setProduct(activeProduct);
                const simList = getProductsByCategory(activeProduct.category)
                    .filter((p) => p.id !== activeProduct.id)
                    .slice(0, 4);
                setSimilarProducts(simList);
            } finally {
                setLoading(false);
            }
        };
        fetchProductData();
    }, [id]);

    return (
        <div className={`${isDarkMode ? 'dark' : ''} min-h-screen w-full bg-[var(--bg-main)] flex flex-col justify-between transition-colors duration-300`}>

            <header className="w-full bg-[var(--bg-surface)] flex flex-col gap-1 shadow-sm shrink-0 border-b border-[var(--border-light)] transition-colors duration-300">
                <Navbar isDarkMode={isDarkMode} onToggleTheme={() => setIsDarkMode(!isDarkMode)} />
            </header>

            <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-16 py-6 flex-grow flex flex-col gap-6 justify-center">
                {loading ? (
                    <Loader variant="default" />
                ) : (
                    <>
                        <Breadcrumbs />
                        
                        <div className="w-full flex justify-start">
                            <button
                                onClick={() => navigate("/products")}
                                className="text-xs font-semibold tracking-normal text-[var(--text-muted)] hover:text-[var(--primary)] flex items-center gap-1.5 transition-colors focus:outline-none"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span>Back to Listings</span>
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start h-auto w-full relative">
                            <div className="w-full md:col-span-6 lg:col-span-5 xl:col-span-5 md:sticky md:top-24 max-h-[85vh] overflow-visible z-10">
                                <ProductGallery images={product.images || []} />
                            </div>

                            <div className="w-full md:col-span-6 lg:col-span-7 xl:col-span-7 flex flex-col gap-6 border border-[var(--border-light)] bg-[var(--bg-surface)] rounded-2xl p-5 sm:p-8 shadow-sm transition-colors duration-300">
                                <ProductInfo product={product} />
                                <QuantitySelector quantity={qty} onQuantityChange={setQty} />

                                <div className="flex flex-col sm:flex-row gap-3 w-full pt-2 border-t border-[var(--border-light)]">
                                    <button
                                        onClick={handleAddToCart}
                                        className="flex-grow h-12 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-[var(--text-on-primary)] rounded-full font-semibold text-sm tracking-wide shadow-md transition-all active:scale-[0.99] flex items-center justify-center gap-2 focus:outline-none"
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        <span>Add To Cart</span>
                                    </button>

                                    <button
                                        onClick={handleBuyNow}
                                        className="flex-grow h-12 bg-[var(--bg-surface-hover)] hover:bg-[var(--border-light)] text-[var(--text-main)] rounded-full font-semibold text-sm tracking-wide border border-[var(--border-light)] transition-all active:scale-[0.99] flex items-center justify-center gap-2 focus:outline-none"
                                    >
                                        <ShoppingBag className="w-4 h-4" />
                                        <span>Buy It Now</span>
                                    </button>
                                </div>

                                <div className="text-xs sm:text-sm text-[var(--text-muted)] font-normal border-t border-[var(--border-light)] pt-4 flex flex-col gap-3">
                                    <p className="font-semibold text-[var(--text-main)] tracking-wider text-xs">Product Highlights</p>
                                    <ul className="list-disc pl-4 space-y-1.5 leading-relaxed text-xs sm:text-sm">
                                        {product.highlights && product.highlights.length > 0 ? (
                                            product.highlights.map((highlight, index) => (
                                                <li key={index}>{highlight}</li>
                                            ))
                                        ) : (
                                            <>
                                                <li>Premium handloomed fabric that is soft and breathable.</li>
                                                <li>Pre-shrunk for a perfect long-lasting fit.</li>
                                                <li>Ethically sourced directly from local weavers.</li>
                                                <li>Comfortable inner lining, perfect for all-day wear.</li>
                                            </>
                                        )}
                                    </ul>
                                </div>

                                <div className="mt-2 pt-4 border-t border-[var(--border-light)]">
                                    <VendorInfo vendor={product.vendor || {}} />
                                </div>
                            </div>
                        </div>

                        <div className="w-full">
                            <SimilarProducts products={similarProducts} />
                        </div>
                    </>
                )}
            </main>

            <Footer />
        </div>
    );
}