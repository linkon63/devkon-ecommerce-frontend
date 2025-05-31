"use client";
import React, { useState } from "react";
import { ImCheckmark } from "react-icons/im";
import { IoCopyOutline } from "react-icons/io5";

type TProps = {
  sku: string;
};

const ProductSKU = ({ sku }: TProps) => {
  const [isCopied, setIsCopied] = useState(false);

  const copySKU = () => {
    navigator.clipboard.writeText(sku);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div className="flex items-center gap-2 mb-6">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">SKU: {sku}</span>
        
        <button
          onClick={copySKU}
          className="text-muted-foreground hover:text-foreground"
        >
          {isCopied ? (
             <span className="text-sm text-green-700 font-bold flex"><ImCheckmark size={16} className="text-xl mt-[2px] mr-1" />Copied!</span>
          ) : (
            <IoCopyOutline size={16} />
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductSKU;
