"use client";
import { TProductDetailsSize } from "@/types/ProductsType";
import React, { Dispatch, SetStateAction } from "react";

type TProps = {
  size: TProductDetailsSize;
  setSelectedSize: Dispatch<SetStateAction<TProductDetailsSize | null>>;
  selectedSize: TProductDetailsSize | null;
};

const ProductSizeButton = ({ size, setSelectedSize, selectedSize }: TProps) => {
  return (
    <button
      className={`h-10 min-w-10 px-3 rounded-md border transition-all duration-300 ${
        size?.quantity === 0
          ? "bg-darkGray text-white cursor-not-allowed"
          : "hover:bg-coral hover:text-lightCream"
      } ${
        selectedSize?.id === size?.id
          ? "bg-coral text-lightCream border-primary"
          : "bg-background border-input"
      } relative`}
      disabled={size?.quantity === 0}
      onClick={() => setSelectedSize(size)}
      data-tooltip={size?.quantity === 0 ? "Out of stock" : ""} // Tooltip when out of stock
    >
      {size?.title}
    </button>
  );
};

export default ProductSizeButton;
