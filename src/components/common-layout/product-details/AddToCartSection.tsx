/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { TProductDetailsSize } from "@/types/ProductsType";
import { getOrCreateClientId } from "@/utils/clientId";
import { useEffect, useState } from "react";
import { IoAddOutline, IoRemoveOutline } from "react-icons/io5";
import ProductSizeButton from "./ProductSizeButton";
// import { addToCart } from "@/services/cartServices";
import { useAddToCartMutation } from "@/redux/api/cart/cartApi";
import { toast } from "sonner";

type TProps = {
  sizes: TProductDetailsSize[] | [];
  productId: string;
};

const defaultSizes: TProductDetailsSize[] = [
  {
    id: "0001",
    title: "N/A",
    quantity: 0,
  },
];

const AddToCartSection = ({ sizes, productId }: TProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<TProductDetailsSize | null>(
    null
  );

  const [addToCart, { isLoading }] = useAddToCartMutation();

  useEffect(() => {
    if (sizes?.length === 1) {
      setSelectedSize(sizes[0]);
    }
  }, [sizes]);

  // quantity change handler
  const quantityChangeHandler = (type: "increase" | "decrease") => {
    if (type === "increase") {
      if (!!selectedSize) {
        return setQuantity((prev) =>
          selectedSize?.quantity > prev ? prev + 1 : prev + 0
        );
      } else {
        return alert("Please select product size.");
      }
    } else if (type === "decrease" && quantity > 1) {
      if (!!selectedSize) {
        setQuantity((prev) => prev - 1);
      } else {
        return alert("Please select product size.");
      }
    }
  };

  // handle add to cart
  const addToCardHandler = async () => {
    const clientId = getOrCreateClientId();

    if (!selectedSize) {
      return alert("Please select product size.");
    }

    const payload = {
      clientId: clientId,
      productId,
      productSizeId: selectedSize?.id,
      quantity,
    };

    const toastId = toast.loading("Please wait...");
    console.log('selecting product')
    try {
      const response = await addToCart(payload).unwrap();
      console.log('res:', response)
      if (!!response?.success) {
        toast.success(response?.message, { id: toastId, duration: 3000 });
        if (sizes.length === 1) {
          setSelectedSize(sizes[0]);
        } else {
          setSelectedSize(null);
        }
        setQuantity(1);
      } else {
        toast.error(response?.message, { id: toastId, duration: 3000 });
        console.log("Add to Cart Response:", response);
      }
    } catch (error: any) {
      console.error("Add to Cart Error:", error);

      toast.error("Something went wrong.", { id: toastId, duration: 3000 });
    }
  };

  return (
    <div>
      {/* Size Selection */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium">Size</p>
          {sizes?.length > 0 && (
            <button className="text-sm text-primary flex items-center gap-1">
              Size Guide
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.length > 0
            ? sizes?.map((size) => (
                <ProductSizeButton
                  key={size?.id}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  size={size}
                />
              ))
            : defaultSizes?.map((size) => (
                <ProductSizeButton
                  key={size?.id}
                  selectedSize={selectedSize}
                  setSelectedSize={setSelectedSize}
                  size={size}
                />
              ))}
        </div>
      </div>

      {/* Qty and AddToCard Button  */}
      <div className="mb-6">
        <p className="text-sm font-medium mb-2">Qty</p>
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-input rounded-md">
            <button
              className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
              onClick={() => quantityChangeHandler("decrease")}
            >
              <IoRemoveOutline size={16} />
            </button>
            <input
              type="text"
              value={quantity}
              onChange={(e) => {
                const val = parseInt(e.target.value);
                if (!isNaN(val) && val > 0) {
                  setQuantity(val);
                }
              }}
              className="w-12 h-10 text-center border-x border-input"
            />
            <button
              className="w-10 h-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
              onClick={() => quantityChangeHandler("increase")}
            >
              <IoAddOutline size={16} />
            </button>
          </div>
          <button
            className={`${
              (sizes?.length > 1 && selectedSize === null) || isLoading
                ? "bg-darkGray hover:bg-darkGray"
                : "bg-coral hover:bg-darkGray"
            } text-white font-medium px-8 py-2 rounded-md transition-colors`}
            onClick={() => addToCardHandler()}
            disabled={isLoading}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartSection;
