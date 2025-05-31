'use client'
import Image from "next/image";
import { useState } from 'react';
const previewItems = [
    {
      title: "Royal Wedding Collection",
      description: "Launching this Summer",
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070"
    },
    {
      title: "Heritage Jewelry Line",
      description: "Coming this Fall",
      image: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=2070"
    },
    {
      title: "Modern Fusion Series",
      description: "Preview Next Week",
      image: "https://images.unsplash.com/photo-1619646176605-b7417fb53b1e?q=80&w=2070"
    }
  ];

export default function ExclusivePreview() {
    const [activePreview, setActivePreview] = useState(0);
  return (
    <div className="relative w-full h-[600px] overflow-hidden mb-20">
    {previewItems.map((item, idx) => (
      <div
        key={idx}
        className={`absolute inset-0 transition-opacity duration-1000 ${
          activePreview === idx ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <div className="absolute inset-0 bg-black/40" />
        <Image
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover"
          fill
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h2 className="text-5xl font-serif mb-4">{item.title}</h2>
            <p className="text-xl mb-8">{item.description}</p>
            <button className="border-2 border-white px-8 py-3 rounded-md hover:bg-white hover:text-black transition-colors">
              Get Notified
            </button>
          </div>
        </div>
      </div>
    ))}
    
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">
      {previewItems.map((_, idx) => (
        <button
          key={idx}
          onClick={() => setActivePreview(idx)}
          className={`w-3 h-3 rounded-full transition-all ${
            activePreview === idx ? 'bg-white scale-125' : 'bg-white/50'
          }`}
        />
      ))}
    </div>
  </div>
  )
}
