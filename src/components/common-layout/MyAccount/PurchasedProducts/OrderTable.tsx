"use client";
import { useOwnOrderQuery } from "@/redux/api/order/orderApi";
import { IOrderList } from "@/types/orderTypes";
// import Image from "next/image";
import { useState } from "react";
import OrderProductsModal from "./OrderProductsModal";
import Link from "next/link";
// import InvoiceButton from "./InvoiceButton";

const OrderTable = () => {
  const { data, isLoading } = useOwnOrderQuery("");

  const orderList: IOrderList[] | [] = data?.data || [];

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrderList | null>(null);

  const openModal = (order: IOrderList) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  // for pagination
  const limit = 10;
  const currentPage = 1;

  // Skeleton Loader
  if (isLoading) {
    return (
      <div className="mt-8 bg-lightCream p-4 rounded-lg animate-pulse">
        <div className="space-y-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 bg-gray-300 rounded w-full"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <>
        <div className="lg:mx-4">
          <div className="overflow-x-auto overflow-y-auto max-h-[90vh] text-darkGray py-4">
            <table className="table-auto w-full">
              {/* Table header */}
              <thead className="text-sm font-semibold uppercase text-white bg-coral">
                <tr>
                  <th className="w-20 p-2 whitespace-nowrap border border-gray-300">
                    <div className="font-semibold text-left">Serial</div>
                  </th>
                  <th className="p-2 whitespace-nowrap border border-gray-300">
                    <div className="font-semibold text-center">Order Id</div>
                  </th>
                  <th className="p-2 whitespace-nowrap border border-gray-300">
                    <div className="font-semibold text-center">Product</div>
                  </th>
                  <th className="p-2 whitespace-nowrap border border-gray-300">
                    <div className="font-semibold text-center">
                      Delivery Charge
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap border border-gray-300">
                    <div className="font-semibold text-center">
                      Total Amount
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap border border-gray-300">
                    <div className="font-semibold text-center">
                      Payment Method
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap border border-gray-300">
                    <div className="font-semibold text-center">
                      Payment Status
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap border border-gray-300">
                    <div className="font-semibold text-center">
                      Delivery Status
                    </div>
                  </th>
                  <th className="p-2 whitespace-nowrap border border-gray-300">
                    <div className="font-semibold text-center">Invoice</div>
                  </th>
                  <th className="p-2 whitespace-nowrap border border-gray-300">
                    <div className="font-semibold text-center">Actions</div>
                  </th>
                </tr>
              </thead>
              {/* Table body */}
              <tbody className="text-sm divide-y divide-slate-100 bg-lightCream">
                {/* Table Rows  */}
                {orderList?.map((item, index) => {
                  const serial_number = limit * (currentPage - 1) + index + 1;
                  const product_count = item?.products?.length;
                  return (
                    <tr
                      key={item?.id}
                      className={`hover:bg-slate-50 duration-500`}
                    >
                      <td className="w-20 p-2 whitespace-nowrap border border-gray-300">
                        <div className="text-left">{serial_number + "."}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap border border-gray-300">
                        <div className="text-left">{item?.orderId}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap border border-gray-300">
                        <div className="text-right">
                          {product_count > 1
                            ? `${product_count} Items`
                            : `${product_count} Item`}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap border border-gray-300">
                        <div className="text-right">
                          {item?.delivery_charge}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap border border-gray-300">
                        <div className="text-right">{item?.totalAmount}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap border border-gray-300">
                        <div className="text-center">{item?.paymentMethod}</div>
                      </td>
                      <td className="p-2 whitespace-nowrap border border-gray-300">
                        <div
                          className={`text-center font-semibold ${
                            item?.paymentStatus === "Paid"
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {item?.paymentStatus}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap border border-gray-300">
                        <div className="text-center">
                          {item?.deliveryStatus}
                        </div>
                      </td>
                      <td className="p-2 whitespace-nowrap border border-gray-300 text-center space-x-5">
                        <Link
                          href={`/my-account/purchased-products/invoice/${item?.orderId}`}
                        >
                          {" "}
                          <button className="text-coral font-bold">
                            View Invoice
                          </button>
                        </Link>
                      </td>
                      <td className="p-2 whitespace-nowrap border border-gray-300 text-center space-x-5">
                        <button
                          className="text-coral font-bold"
                          onClick={() => openModal(item)}
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal for showing details */}
        {isModalOpen && selectedOrder && (
          <OrderProductsModal
            closeModal={closeModal}
            selectedOrder={selectedOrder}
          />
        )}
      </>
    </div>
  );
};

export default OrderTable;
