const dummyProducts = [1, 2, 3, 4];

export default function SimilarProducts() {
    return (
        <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4">Similar Products</h2>
            <div className="grid grid-cols-4 gap-4">
                {dummyProducts.map((p) => (
                    <div key={p} className="border p-4 rounded shadow-sm">
                        <div className="h-40 bg-gray-200 mb-2"></div>
                        <p className="font-semibold">Product {p}</p>
                        <p className="text-blue-600">$99.00</p>
                    </div>
                ))}
            </div>
        </div>
    );
}