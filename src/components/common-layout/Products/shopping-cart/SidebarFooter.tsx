import Link from "next/link";
import { FaShoppingBag } from "react-icons/fa";

type TProps = {
  sideCartFooter: {
    totalItem: number;
    totalAmount: number;
    totalQuantity: number;
  };
};

export default function SidebarFooter({ sideCartFooter }: TProps) {
  const { totalItem, totalAmount, totalQuantity } = sideCartFooter;

  return (
    <div className="border-t p-4 lg:py-10 border-t-coral border">
      {/* Row for total items, quantity, and amount */}
      <div className="flex flex-col lg:flex-row justify-between items-center text-lg font-semibold mb-4 text-center gap-2">
        <p>
          Total Items: <span className="text-coral">{totalItem}</span>
        </p>
        <p>
          Total Quantity: <span className="text-coral">{totalQuantity}</span>
        </p>
        <p>
          Total: <span className="text-coral">$ {totalAmount}</span>
        </p>
      </div>

      {/* Row for buttons */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-3">
        <Link href="/products">
          <button className="p-3 text-darkGray border border-coral rounded-lg w-48 hover:bg-coral hover:text-white">
            Continue Shopping
          </button>
        </Link>
        <Link href="/checkout">
          <button className="flex items-center justify-center p-3 text-white bg-coral rounded-lg w-48 hover:bg-darkGray gap-x-2">
            <FaShoppingBag /> Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
