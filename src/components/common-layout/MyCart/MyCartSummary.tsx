import { TCartProduct } from "@/types/ProductsType";
import React from "react";

type TProps = {
  products: TCartProduct[] | [];
  totalAmount: number;
};

const MyCartSummary = ({ products, totalAmount }: TProps) => {
  // calculate total tax/vat
  const total_tax_price = products.reduce(
    (acc, item) => acc + item?.tax_price,
    0
  );

  // calculate total product price
  const total_sub_total = products.reduce(
    (acc, item) => acc + item?.discount_price,
    0
  );

  return (
    <div>
      <div className="flex justify-center mb-4">
        <h2 className="px-6 py-2  border border-darkGray font-bold rounded text-gray-700">
          Cart Summary
        </h2>
      </div>
      <div className="max-w-md ml-auto mx-auto">
        <div className="border border-coral rounded space-y-2">
          <div className="flex justify-between bg-lightCream p-2">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-700">{total_sub_total}</span>
          </div>
          <div className="flex justify-between bg-lightCream p-2">
            <span className="text-gray-600">Vat</span>
            <span className="text-gray-700">{total_tax_price}</span>
          </div>
          <div className="flex justify-between bg-lightCream p-2">
            <span className="font-bold text-darkGray">Total</span>
            <span className="text-coral">{totalAmount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCartSummary;
