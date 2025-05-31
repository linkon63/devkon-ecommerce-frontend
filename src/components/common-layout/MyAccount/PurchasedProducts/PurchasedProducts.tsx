"use client";
import UserInfoSection from "./UserInfoSection";
import PurchaseHistorySection from "./PurchaseHistorySection";


export default function PurchasedProducts() {
  return (
    <div>
      <div className="lg:flex">
        {/* Left Panel */}
        <UserInfoSection />
        {/* Right Panel */}
        <PurchaseHistorySection />
      </div>
    </div>
  );
}
