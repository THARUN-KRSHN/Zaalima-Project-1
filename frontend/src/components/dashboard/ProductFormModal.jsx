import React, { useState, useEffect } from 'react';
import { X, Image, FileText } from 'lucide-react';

export default function ProductFormModal({ isOpen, onClose, onSave, initialProduct }) {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        category: 'Fashion',
        brand: '',
        price: '',
        stock: '',
        imageUrl: '',
        specs: ''
    });

    useEffect(() => {
        if (initialProduct) {
            setFormData({
                name: initialProduct.name || '',
                description: initialProduct.description || '',
                category: initialProduct.category || 'Fashion',
                brand: initialProduct.brand || '',
                price: initialProduct.price || '',
                stock: initialProduct.stock || '',
                imageUrl: initialProduct.imageUrl || '',
                specs: initialProduct.specs || ''
            });
        } else {
            setFormData({
                name: '',
                description: '',
                category: 'Fashion',
                brand: '',
                price: '',
                stock: '',
                imageUrl: '',
                specs: ''
            });
        }
    }, [initialProduct, isOpen]);

    if (!isOpen) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e, status) => {
        e.preventDefault();
        onSave({
            ...formData,
            price: parseFloat(formData.price) || 0,
            stock: parseInt(formData.stock) || 0,
            status: status || 'published'
        });
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="w-full max-w-2xl bg-[var(--bg-surface)] border border-[var(--border-light)] rounded-2xl shadow-[var(--shadow-md)] flex flex-col max-h-[90vh] overflow-hidden animate-in scale-in duration-300">
                
                {/* Modal Header */}
                <div className="px-6 py-4 border-b border-[var(--border-light)]/60 flex items-center justify-between shrink-0">
                    <h3 className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100">
                        {initialProduct ? 'Edit Product details' : 'Add New Product'}
                    </h3>
                    <button onClick={onClose} className="p-1 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-900 transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Modal Form Scrollable body */}
                <form className="p-6 overflow-y-auto flex flex-col gap-5 text-left text-xs sm:text-sm">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="font-semibold text-stone-700 dark:text-stone-300">Product Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter product name..."
                                required
                                className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-800 dark:text-stone-200 font-medium"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="font-semibold text-stone-700 dark:text-stone-300">Brand</label>
                            <input
                                type="text"
                                name="brand"
                                value={formData.brand}
                                onChange={handleChange}
                                placeholder="e.g. Zaalima Wear"
                                required
                                className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-800 dark:text-stone-200 font-medium"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="flex flex-col gap-1.5">
                            <label className="font-semibold text-stone-700 dark:text-stone-300">Category</label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-800 dark:text-stone-200 font-medium"
                            >
                                <option value="Fashion">Fashion</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Home Decor">Home Decor</option>
                                <option value="Footwear">Footwear</option>
                                <option value="Gadgets">Gadgets</option>
                            </select>
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="font-semibold text-stone-700 dark:text-stone-300">Price (₹)</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                placeholder="899"
                                required
                                className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-800 dark:text-stone-200 font-medium"
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="font-semibold text-stone-700 dark:text-stone-300">Stock Units</label>
                            <input
                                type="number"
                                name="stock"
                                value={formData.stock}
                                onChange={handleChange}
                                placeholder="10"
                                required
                                className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-800 dark:text-stone-200 font-medium"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-semibold text-stone-700 dark:text-stone-300">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            placeholder="Enter detailed description..."
                            required
                            className="w-full p-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-800 dark:text-stone-200 font-medium resize-none"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1"><Image className="w-3.5 h-3.5 text-stone-400" /><span>Image URL</span></label>
                        <input
                            type="text"
                            name="imageUrl"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://images.unsplash.com/photo-..."
                            className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-800 dark:text-stone-200 font-medium"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <label className="font-semibold text-stone-700 dark:text-stone-300 flex items-center gap-1"><FileText className="w-3.5 h-3.5 text-stone-400" /><span>Specifications (Comma-separated)</span></label>
                        <input
                            type="text"
                            name="specs"
                            value={formData.specs}
                            onChange={handleChange}
                            placeholder="Material: Cotton, Wash: Handwash Only"
                            className="w-full h-10 px-3 border border-[var(--border-light)] bg-[var(--bg-main)]/50 rounded-xl focus:outline-none focus:border-[var(--primary)] text-xs text-stone-800 dark:text-stone-200 font-medium"
                        />
                    </div>
                </form>

                {/* Modal Footer actions */}
                <div className="px-6 py-4 border-t border-[var(--border-light)]/60 flex items-center justify-between shrink-0 bg-stone-50 dark:bg-stone-900/20">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 border border-stone-200 dark:border-stone-850 hover:bg-stone-100 dark:hover:bg-stone-900 font-semibold text-xs rounded-xl text-stone-600 dark:text-stone-450 transition-colors focus:outline-none cursor-pointer"
                    >
                        Cancel
                    </button>
                    
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, 'draft')}
                            className="px-4 py-2 border border-[var(--primary)]/20 hover:bg-[var(--primary)]/5 font-semibold text-xs rounded-xl text-[var(--primary)] transition-colors focus:outline-none cursor-pointer"
                        >
                            Save Draft
                        </button>
                        <button
                            type="button"
                            onClick={(e) => handleSubmit(e, 'published')}
                            className="px-4.5 py-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] font-semibold text-xs rounded-xl text-[var(--text-on-primary)] shadow-sm transition-all focus:outline-none cursor-pointer"
                        >
                            Publish Product
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
