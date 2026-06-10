export default function ProductInfo({ product }) {
    return (
        <div className="space-y-4">
            <span className="text-sm text-gray-500 uppercase">{product.category}</span>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl text-blue-600">${product.price}</p>
            <p className="text-gray-600">{product.description}</p>
            <div className={`font-semibold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? 'In Stock' : 'Out of Stock'}
            </div>
        </div>
    );
}