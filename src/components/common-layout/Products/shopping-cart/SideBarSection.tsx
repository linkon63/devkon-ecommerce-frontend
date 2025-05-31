"use client";
import { useState, useEffect, useRef } from "react";
import { useMyCartQuery } from "@/redux/api/cart/cartApi";
import StickyCart from "./StickyCart";
import SidebarHeader from "./SidebarHeader";
import SidebarProductList from "./SideBarProductList";
import SidebarFooter from "./SidebarFooter";
import { getClientIdFromLocalStorage } from "@/services/local-storage/local-storage";

export default function SidebarSection() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const [clientId, setClientId] = useState<string>("");
  const { data, isLoading } = useMyCartQuery(clientId);

  // Fetch clientId only on the client side
  useEffect(() => {
    const storedClientId = getClientIdFromLocalStorage();
    setClientId(storedClientId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    // Add event listener when the component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // toggle cart func
  const toggleCart = () => {
    setIsOpen(!isOpen);
  };

  // TODO: should be design it
  if (isLoading) {
    return <p>loading...</p>;
  }

  const cart_data = data?.data;
  const totalQuantity = cart_data?.totalQuantity || 0;
  const totalItem = cart_data?.totalItem || 0;
  const totalAmount = cart_data?.totalAmount || 0;
  const products = cart_data?.products || [];

  const sideCartFooter = {
    totalItem,
    totalAmount,
    totalQuantity,
  };

  return (
    <div>
      <StickyCart totalItem={totalItem} toggleCart={toggleCart} />
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={toggleCart}
        />
      )}
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-[300px] lg:w-[500px] bg-white z-50 shadow-lg flex flex-col justify-between transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div>
          <SidebarHeader toggleCart={toggleCart} />
          <SidebarProductList products={products} />
        </div>
        <SidebarFooter sideCartFooter={sideCartFooter} />
      </div>
    </div>
  );
}
