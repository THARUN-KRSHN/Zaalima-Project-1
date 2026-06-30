import Product from '../models/Product.js';


const mapProductToFrontend = (product) => {
    const obj = product.toObject ? product.toObject() : product;
    return {
        ...obj,
        id: obj._id.toString(), 
        price: Number((obj.price / 100).toFixed(2)) 
    };
};




export const getProducts = async (req, res, next) => {
    const { category, search, page = 1, limit = 12 } = req.query;

    try {
        const query = {};

        if (category && category.toLowerCase() !== 'all') {
            query.category = { $regex: new RegExp(`^${category}$`, 'i') };
        }

        if (search) {
            query.$or = [
                { title: { $regex: search, $options: 'i' } },
                { brand: { $regex: search, $options: 'i' } },
                { description: { $regex: search, $options: 'i' } }
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
            res.status(404);
            throw new Error('Product not found.');
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
            res.status(404);
            throw new Error('Product not found.');
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
            res.status(404);
            throw new Error('Product not found.');
        }

        
        if (product.vendor.toString() !== req.user._id.toString() && req.user.role !== 'superadmin') {
            res.status(403);
            throw new Error('Not authorized to modify this product.');
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
            res.status(404);
            throw new Error('Product not found.');
        }

        
        if (product.vendor.toString() !== req.user._id.toString() && req.user.role !== 'superadmin') {
            res.status(403);
            throw new Error('Not authorized to delete this product.');
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
