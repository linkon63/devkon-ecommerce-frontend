import Link from "next/link";
import React from "react";

const MyCartFooterButtons = () => {
  return (
    <div className="flex justify-between mt-6">
      <Link href={"/products"}>
        <button className="px-6 py-2 border border-darkGray rounded text-darkGray hover:bg-coral hover:border-none hover:text-white">
          Continue Shopping
        </button>
      </Link>
      <Link href="/checkout">
        <button className="px-6 py-2 border border-coral rounded text-coral font-bold hover:bg-lightCream">
          Check Out
        </button>
      </Link>
    </div>
  );
};

export default MyCartFooterButtons;
