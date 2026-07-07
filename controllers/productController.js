import Product from '../models/Product.js';
import { AppError } from '../utils/AppError.js';


const mapProductToFrontend = (product) => {
    const obj = product.toObject ? product.toObject() : product;
    return {
        ...obj,
        id: obj._id.toString(), 
        price: Number((obj.price / 100).toFixed(2)) 
    };
};

const escapeRegExp = (string) => {
    return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
};




export const getProducts = async (req, res, next) => {
    const { category, search, page = 1, limit = 12 } = req.query;

    try {
        const query = {};

        if (category && category.toLowerCase() !== 'all') {
            const escapedCategory = escapeRegExp(category);
            query.category = { $regex: new RegExp(`^${escapedCategory}$`, 'i') };
        }

        if (search) {
            const escapedSearch = escapeRegExp(search);
            query.$or = [
                { title: { $regex: escapedSearch, $options: 'i' } },
                { brand: { $regex: escapedSearch, $options: 'i' } },
                { description: { $regex: escapedSearch, $options: 'i' } }
            ];
        }

        const skip = (Number(page) - 1) * Number(limit);
        const total = await Product.countDocuments(query);
        const products = await Product.find(query).skip(skip).limit(Number(limit));

        res.json({
            success: true,
            products: products.map(mapProductToFrontend),
            metaData: {
                totalRecords: total,
                currentPage: Number(page),
                totalPages: Math.ceil(total / Number(limit))
            }
        });
    } catch (error) {
        next(error);
    }
};




export const getProductById = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            throw new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND');
        }

        res.json({
            success: true,
            product: mapProductToFrontend(product)
        });
    } catch (error) {
        next(error);
    }
};




export const getSimilarProducts = async (req, res, next) => {
    const limit = Number(req.query.limit) || 4;

    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            throw new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND');
        }

        const similar = await Product.find({
            category: product.category,
            _id: { $ne: product._id }
        }).limit(limit);

        res.json({
            success: true,
            products: similar.map(mapProductToFrontend)
        });
    } catch (error) {
        next(error);
    }
};




export const createProduct = async (req, res, next) => {
    const { title, brand, category, description, image, price, stock, tag } = req.body;

    try {
        
        const validationErrors = {};
        if (!title || !title.trim()) validationErrors.title = 'Product title is required.';
        if (!brand || !brand.trim()) validationErrors.brand = 'Brand name is required.';
        if (!category || !category.trim()) validationErrors.category = 'Category is required.';
        if (!image || !image.trim()) validationErrors.image = 'Product image URL is required.';
        if (price === undefined || isNaN(price) || Number(price) <= 0) {
            validationErrors.price = 'Valid product price is required.';
        }
        if (stock === undefined || isNaN(stock) || Number(stock) < 0) {
            validationErrors.stock = 'Stock must be a non-negative number.';
        }

        if (Object.keys(validationErrors).length > 0) {
            throw new AppError('Product validation failed.', 400, 'INVALID_PARAMETERS', validationErrors);
        }

        const priceInPaise = Math.round(Number(price) * 100);

        const product = await Product.create({
            title,
            brand,
            category,
            description,
            image,
            price: priceInPaise,
            stock: Number(stock),
            vendor: req.user._id,
            tag
        });

        res.status(201).json({
            success: true,
            product: mapProductToFrontend(product)
        });
    } catch (error) {
        next(error);
    }
};




export const updateProduct = async (req, res, next) => {
    const { title, brand, category, description, image, price, stock, tag } = req.body;

    try {
        let product = await Product.findById(req.params.id);
        if (!product) {
            throw new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND');
        }

        if (product.vendor.toString() !== req.user._id.toString() && req.user.role !== 'superadmin') {
            throw new AppError('Not authorized to modify this product.', 403, 'FORBIDDEN');
        }

        const validationErrors = {};
        if (title !== undefined && !title.trim()) validationErrors.title = 'Product title cannot be empty.';
        if (brand !== undefined && !brand.trim()) validationErrors.brand = 'Brand name cannot be empty.';
        if (category !== undefined && !category.trim()) validationErrors.category = 'Category cannot be empty.';
        if (image !== undefined && !image.trim()) validationErrors.image = 'Product image URL cannot be empty.';
        if (price !== undefined && (isNaN(price) || Number(price) <= 0)) {
            validationErrors.price = 'Valid product price is required.';
        }
        if (stock !== undefined && (isNaN(stock) || Number(stock) < 0)) {
            validationErrors.stock = 'Stock must be a non-negative number.';
        }

        if (Object.keys(validationErrors).length > 0) {
            throw new AppError('Product update validation failed.', 400, 'INVALID_PARAMETERS', validationErrors);
        }

        if (title !== undefined) product.title = title;
        if (brand !== undefined) product.brand = brand;
        if (category !== undefined) product.category = category;
        if (description !== undefined) product.description = description;
        if (image !== undefined) product.image = image;
        if (price !== undefined) product.price = Math.round(Number(price) * 100); 
        if (stock !== undefined) product.stock = Number(stock);
        if (tag !== undefined) product.tag = tag;

        const updatedProduct = await product.save();

        res.json({
            success: true,
            product: mapProductToFrontend(updatedProduct)
        });
    } catch (error) {
        next(error);
    }
};




export const deleteProduct = async (req, res, next) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            throw new AppError('Product not found.', 404, 'PRODUCT_NOT_FOUND');
        }

        if (product.vendor.toString() !== req.user._id.toString() && req.user.role !== 'superadmin') {
            throw new AppError('Not authorized to delete this product.', 403, 'FORBIDDEN');
        }

        await product.deleteOne();

        res.json({
            success: true,
            message: 'Product removed successfully.'
        });
    } catch (error) {
        next(error);
    }
};
