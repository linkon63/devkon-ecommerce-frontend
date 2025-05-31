"use client";

import MyCartProductTable from "./MyCartProductTable";
import MyCartSummary from "./MyCartSummary";
import MyCartFooterButtons from "./MyCartFooterButtons";
import { useMyCartQuery } from "@/redux/api/cart/cartApi";
import { getClientIdFromLocalStorage } from "@/services/local-storage/local-storage";
import { useEffect, useState } from "react";
import Loader from "@/components/ui/Loader";

export default function MyCart() {
  const [clientId, setClientId] = useState("my-clientId");
  useEffect(() => {
    const client_id = getClientIdFromLocalStorage();
    setClientId(client_id);
  }, []);

  // cart data fetching
  const { data, isLoading } = useMyCartQuery(clientId);

  const totalItem = data?.data?.totalItem || 0;
  const totalQuantity = data?.data?.totalQuantity || 0;
  const totalAmount = data?.data?.totalAmount || 0;
  const products = data?.data?.products || [];

  console.log({ totalItem, totalQuantity, totalAmount, products });

  if (!!isLoading) {
    return <Loader />;
  }
  return (
    <div className="mx-auto lg:p-6">
      <MyCartProductTable products={products} />
      <MyCartSummary products={products} totalAmount={totalAmount} />
      <MyCartFooterButtons />
    </div>
  );
}
