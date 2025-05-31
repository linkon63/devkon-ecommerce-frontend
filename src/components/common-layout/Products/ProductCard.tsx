import { TProduct } from "@/types/ProductsType";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type TProps = {
  product: TProduct;
};

const ProductCard = ({ product }: TProps) => {
  // Calculate discounted price
  const discountedPrice =
    product?.original_price * (1 - product?.discount_rate / 100);

  return (
    <Link href={`/products/${product?.sku.toLowerCase()}`}>
      <div className="bg-white border overflow-hidden border-gray-200 rounded-lg text-center shadow-lg hover:shadow-xl transition-shadow duration-300 w-full max-w-[350px] min-h-[450px] flex flex-col">
        <Image
          src={product?.cover_image?.url}
          alt={product?.name}
          className="object-cover w-full h-[350px] rounded-t-lg transition-all duration-300 ease-in-out hover:scale-105"
          width={250}
          height={200}
        />
        <div className="flex-grow flex flex-col justify-between p-4">
          <h2 className="text-lg font-semibold mb-2 h-16">{product?.name}</h2>
          <div>
            {discountedPrice && product?.discount_rate > 0 ? (
              <span className="text-xl font-bold text-coral">
                &#x9F3;{discountedPrice.toFixed(2)}
              </span>
            ) : (
              // If no discount, just show original price
              <span className="text-xl font-bold text-coral">
                &#x9F3;{product?.original_price}
              </span>
            )}

            {/* Display original price with strikethrough if there is a discount */}
            {product?.discount_rate > 0 && (
              <span className="text-xl font-medium line-through mx-4">
                &#x9F3;{product?.original_price}
              </span>
            )}
          </div>
        </div>
        {/* Optionally, display the discount rate */}
        {product?.discount_rate > 0 && (
          <span className="text-sm absolute px-3 py-1 ml-2 mt-2 bg-coral rounded-lg text-white">
            {product?.discount_rate}% Off
          </span>
        )}
      </div>
    </Link>
  );
};

export default ProductCard;
