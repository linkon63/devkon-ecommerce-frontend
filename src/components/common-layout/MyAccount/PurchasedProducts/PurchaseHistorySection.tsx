"use client";
import { logOutUser } from "@/services/actions/logoutUser";
import React from "react";
import OrderTable from "./OrderTable";
import MyAccountNavbar from "../MyAccountNavbar";

const PurchaseHistorySection = () => {
  return (
    <div className="flex-1 lg:p-8">
      <MyAccountNavbar />
      <OrderTable />
      <div className="mt-10 text-right">
        <button
          onClick={() => logOutUser()}
          className="border border-[#FF6B4A] text-[#FF6B4A] hover:bg-coral hover:text-white px-6 py-2 rounded"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default PurchaseHistorySection;
