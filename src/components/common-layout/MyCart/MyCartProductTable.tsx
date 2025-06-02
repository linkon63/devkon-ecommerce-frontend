"use client";
import {
  useDeleteToCartMutation,
  useUpdateToCartMutation,
} from "@/redux/api/cart/cartApi";
import { StockStatus, TCartProduct } from "@/types/ProductsType";
import Image from "next/image";
import React from "react";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";

type TProps = {
  products: TCartProduct[] | [];
};

const MyCartProductTable = ({ products }: TProps) => {
  // update mutation
  const [updateToCart, { isLoading: isUpdateLoading }] =
    useUpdateToCartMutation();

  // delete mutation
  const [deleteToCart, { isLoading: isDeleteLoading }] =
    useDeleteToCartMutation();

  // quantity increment handler
  const handleIncrement = async (cart_id: string, quantity: number) => {
    const payload = {
      quantity: quantity + 1,
    };
    const toastId = toast.loading("Please wait...");
    try {
      const res = await updateToCart({ id: cart_id, payload }).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 2000 });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  // quantity decrement handler
  const handleDecrement = async (cart_id: string, quantity: number) => {
    if (quantity <= 1) {
      return;
    }

    const payload = {
      quantity: quantity - 1,
    };

    const toastId = toast.loading("Please wait...");
    try {
      const res = await updateToCart({ id: cart_id, payload }).unwrap();
      if (res?.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 2000 });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  // delete handler
  const deleteHandler = async (cart_id: string) => {
    const toastId = toast.loading("Please wait...");
    try {
      const res = await deleteToCart(cart_id).unwrap();

      if (res?.success) {
        toast.success(res.message, { id: toastId, duration: 2000 });
      } else {
        toast.error(res?.message, { id: toastId, duration: 2000 });
        console.log(res);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="overflow-y-auto mb-6 max-h-[45vh]">
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-lightCream text-xl font-medium text-coral border lg:p-4">
            <th className="px-4 py-2 text-left">PRODUCT</th>
            <th className="px-4 py-2 text-left">PRICE</th>
            <th className="px-4 py-2 text-left">SIZE</th>
            <th className="px-4 py-2 text-left">QUANTITY</th>
            <th className="px-4 py-2 text-left">STOCK STATUS</th>
            <th className="px-4 py-2 text-left">TOTAL</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => {
            const item_price = item?.discount_price + item?.tax_price;

            // console.log({ item_price });
            return (
              <tr key={item?.cart_id} className="border-b border-b-coral">
                <td className="px-4 py-2">
                  <div className="lg:flex items-center gap-4">
                    <Image
                      src={item?.cover_image?.url}
                      alt={item?.name}
                      className="w-24 h-24 object-cover rounded"
                      width={96}
                      height={96}
                    />
                    <span className="text-darkGray">{item?.name}</span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <span className="text-darkGray">&#x09F3; {item_price}</span>
                  <span className="text-darkGray text-sm ml-2">
                    (Incl. VAT)
                  </span>
                </td>

                <td className="px-4 py-2">
                  <span className="text-darkGray">{item?.size}</span>
                </td>

                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        handleDecrement(item?.cart_id, item?.quantity)
                      }
                      disabled={isUpdateLoading}
                      className="w-8 h-8 flex items-center justify-center border border-darkGray rounded hover:bg-coral hover:text-white hover:border-none"
                    >
                      −
                    </button>
                    <input
                      type="text"
                      value={item?.quantity?.toString().padStart(2, "0")}
                      className="w-12 py-2 bg-lightCream text-center border border-darkGray rounded "
                      readOnly
                    />
                    <button
                      onClick={() =>
                        handleIncrement(item?.cart_id, item?.quantity)
                      }
                      disabled={isUpdateLoading}
                      className="w-8 h-8 flex items-center justify-center border border-darkGray hover:bg-coral hover:text-white hover:border-none rounded"
                    >
                      +
                    </button>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center text-center justify-between">
                    <span
                      className={`${
                        item.stock === StockStatus.IN_STOCK
                          ? "text-green-500"
                          : "text-red-500"
                      }`}
                    >
                      {item?.stock === StockStatus.IN_STOCK
                        ? "In Stock"
                        : "Stock Out"}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2">
                  <div className="flex items-center justify-between">
                    <span className="text-darkGray">&#x09F3; {item?.total_price}</span>
                    <button
                      className="text-coral text-xl"
                      onClick={() => deleteHandler(item?.cart_id)}
                      disabled={isDeleteLoading}
                    >
                      <RiDeleteBin6Line />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MyCartProductTable;
