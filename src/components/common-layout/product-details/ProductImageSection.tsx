"use client";
import { IProductImage } from "@/types/ProductsType";
import Image from "next/image";
import { useState } from "react";

type TProps = {
  images: IProductImage[];
};

const ProductImageSection = ({ images }: TProps) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(
    images[0]?.url
  ); // Track the currently selected big image
  const [zoomStyles, setZoomStyles] = useState({
    backgroundImage: "",
    backgroundPosition: "center",
    backgroundSize: "contain",
  });

  // Handle image click to update the big image
  const handleImageClick = (img: string) => {
    setSelectedImage(img);
  };

  // Handle zoom effect on image
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect(); // Get the bounding box of the image
    const xPercent = ((e.clientX - rect.left) / rect.width) * 100; // Calculate X as a percentage
    const yPercent = ((e.clientY - rect.top) / rect.height) * 100; // Calculate Y as a percentage

    setZoomStyles({
      backgroundImage: `url(${selectedImage})`,
      backgroundPosition: `${xPercent}% ${yPercent}%`,
      backgroundSize: "200%",
    });
  };

  // Handle mouse leave to reset the zoom
  const handleMouseLeave = () => {
    setZoomStyles({
      backgroundImage: "",
      backgroundPosition: "center",
      backgroundSize: "contain",
    });
  };

  return (
    <div className="w-full md:w-1/2 border">
      <div className="flex flex-row md:flex-row-reverse gap-4">
        {/* Thumbnails */}
        <div className="flex md:flex-col gap-2 w-1/5">
          {images.length > 0 &&
            images.map((image, index) => (
              <div
                key={index}
                className={`border-2 cursor-pointer overflow-hidden ${
                  selectedImage === image.url
                    ? "border-coral"
                    : "border-gray-200"
                }`}
                onClick={() => handleImageClick(image.url)} // Set selected image on click
              >
                <div className="relative aspect-square">
                  <Image
                    src={image.url}
                    alt={image.key}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
        </div>

        {/* Big Image with Zoom Effect */}
        <div
          className="relative w-4/5 overflow-hidden cursor-zoom-in"
          style={zoomStyles.backgroundImage ? zoomStyles : {}}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Apply scale-110 for the non-hovered image */}
          {!zoomStyles.backgroundImage && selectedImage && (
            <Image
              src={selectedImage}
              alt="Selected Image"
              fill
              className="object-contain transition-all duration-300 transform scale-110"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductImageSection;
