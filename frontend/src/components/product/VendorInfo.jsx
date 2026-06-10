export default function VendorInfo({ vendor }) {
    return (
        <div className="p-4 border rounded-lg bg-gray-50">
            <h3 className="font-bold text-lg">{vendor.storeName}</h3>
            <p>Vendor: {vendor.name}</p>
            <p>Rating: {vendor.rating} ⭐</p>
            <button className="text-blue-500 underline text-sm">Contact Vendor</button>
        </div>
    );
}