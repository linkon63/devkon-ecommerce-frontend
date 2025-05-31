"use client";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaCheck } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

const Success = () => {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  useEffect(() => {
    const session_id = searchParams.get("session_id");
    const order_id = searchParams.get("order_id");

    if (session_id && order_id) {
      const payload = {
        orderId: order_id,
        sessionId: session_id,
      };

      fetch("http://localhost:5000/v1/order/stripe-validation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.success) {
            setPaymentStatus("Paid");
          } else {
            setPaymentStatus("Unpaid");
          }
        })
        .catch((error) => {
          console.error("Error verifying payment:", error);
          setPaymentStatus("failed");
        });
    }
  }, [searchParams]);

  const renderContent = () => {
    switch (paymentStatus) {
      case null:
        return (
          <div className="flex flex-col items-center space-y-6">
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
            <h2 className="text-xl font-semibold text-darkGray">
              Verifying your payment...
            </h2>
          </div>
        );
      case "Paid":
        return (
          <div className="flex flex-col items-center space-y-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full blur-lg opacity-75 animate-pulse" />
              <div className="relative w-24 h-24 rounded-full bg-green-500 flex items-center justify-center">
                <FaCheck className="text-white text-5xl" />
              </div>
            </div>
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-green-500">
                Payment Successful!
              </h2>
              <p className="text-darkGray text-lg max-w-sm">
                Thank you for your purchase. Your order has been confirmed and
                will be processed shortly.
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <Link
                href="/my-account/purchased-products"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                View Orders
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col items-center space-y-8">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-lg opacity-75 animate-pulse" />
              <div className="relative w-24 h-24 rounded-full bg-red-500 flex items-center justify-center">
                <RxCross1 className="text-white text-4xl" />
              </div>
            </div>
            <div className="text-center space-y-3">
              <h2 className="text-3xl font-bold text-red-500">
                Payment Failed
              </h2>
              <p className="text-darkGray text-lg max-w-sm">
                Something went wrong with your payment. Please try again or
                contact our support team for assistance.
              </p>
              <p className="text-sm text-darkGray">
                Error code: {Date.now().toString(36)}
              </p>
            </div>
            <div className="flex gap-4 pt-4">
              <Link
                href="/support"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Contact Support
              </Link>
              <Link
                href="/checkout"
                className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Try Again
              </Link>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white mt-32 py-20 px-4">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.08)] p-8 backdrop-blur-sm">
        {renderContent()}
      </div>
    </div>
  );
};

export default Success;
