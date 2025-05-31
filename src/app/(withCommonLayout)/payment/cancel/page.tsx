import Link from "next/link";
import { IoWarningOutline } from "react-icons/io5";

const PaymentCancelPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20 px-4 mt-32">
      <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-[0_0_40px_rgba(0,0,0,0.08)] p-8 backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-8">
          <div className="relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-lg opacity-75 animate-pulse" />
            <div className="relative w-24 h-24 rounded-full bg-amber-500 flex items-center justify-center">
              <IoWarningOutline className="text-white text-5xl" />
            </div>
          </div>
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-amber-500">
              Payment Cancelled
            </h2>
            <p className="text-darkGray text-lg max-w-sm  mx-auto">
              You&apos;ve cancelled your payment. No charges have been made to your
              account.
            </p>
            <p className="text-sm text-darkGray">
              Your cart items are still saved if you&apos;d like to complete the
              purchase later.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full sm:w-auto">
            <Link
              href="/my-cart"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200 w-full sm:w-auto"
            >
              Return to Cart
            </Link>
            <Link
              href="/products"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 w-full sm:w-auto"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;
