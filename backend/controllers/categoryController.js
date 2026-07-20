import Product from '../models/Product.js';


export const getCategories = async (req, res, next) => {
    try {
        const categories = await Product.distinct('category');

        const formatted = categories
            .filter(cat => cat && cat.trim())
            .sort()
            .map((name, index) => ({
                _id: name.toLowerCase().replace(/\s+/g, '-'),
                name,
                slug: name.toLowerCase().replace(/\s+/g, '-'),
                count: 0 // Could be enriched with product counts if needed
            }));

        res.json({
            success: true,
            data: formatted,
            categories: formatted
        });
    } catch (error) {
        next(error);
    }
};


export const getCategoriesWithCount = async (req, res, next) => {
    try {
        const aggregation = await Product.aggregate([
            { $match: { status: { $ne: 'OUT_OF_STOCK' } } },
            {
                $group: {
                    _id: '$category',
                    count: { $sum: 1 }
                }
            },
            { $sort: { count: -1 } }
        ]);

        const categories = aggregation
            .filter(item => item._id && item._id.trim())
            .map(item => ({
                _id: item._id.toLowerCase().replace(/\s+/g, '-'),
                name: item._id,
                slug: item._id.toLowerCase().replace(/\s+/g, '-'),
                count: item.count
            }));

        res.json({
            success: true,
            data: categories,
            categories
        });
    } catch (error) {
        next(error);
    }
};
