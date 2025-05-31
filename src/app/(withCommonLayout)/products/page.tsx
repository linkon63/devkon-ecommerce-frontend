import dynamic from "next/dynamic";
import React from "react";

const ProductPage = () => {
  const Products = dynamic(
    () => import("@/components/common-layout/Products/Products")
  );
  return (
    <section  className="mt-40 w-[80%] mx-auto">
      <Products />
    </section>
  );
};

export default ProductPage;
