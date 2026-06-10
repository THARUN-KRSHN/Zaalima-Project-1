import { useState } from 'react';

const images = ['/img1.jpg', '/img2.jpg', '/img3.jpg']; // Dummy paths

export default function ProductGallery() {
    const [activeImg, setActiveImg] = useState(images[0]);

    return (
        <div className="flex flex-col gap-4">
            <img src={activeImg} alt="Main" className="w-full h-96 object-cover rounded-lg" />
            <div className="flex gap-2">
                {images.map((img, idx) => (
                    <img key={idx} src={img} onClick={() => setActiveImg(img)}
                        className="w-20 h-20 cursor-pointer border-2 hover:border-blue-500" />
                ))}
            </div>
        </div>
    );
}