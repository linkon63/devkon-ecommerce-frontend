import { IOrderList } from "@/types/orderTypes";
import Image from "next/image";

type TProps = {
  selectedOrder: IOrderList | null;
  closeModal: () => void;
};

export default function OrderProductsModal({
  selectedOrder,
  closeModal,
}: TProps) {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
      onClick={handleOutsideClick}
    >
      <div className="bg-lightCream p-8 rounded-lg lg:w-[50%] w-[90%] max-h-[80vh] overflow-auto shadow-lg">
        <h2 className="text-2xl font-semibold text-coral mb-4">
          Order Details - {selectedOrder?.orderId}
        </h2>

        <div className="mb-6 grid lg:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <p>
              <strong>Buyer Name:</strong> {selectedOrder?.buyer_name}
            </p>
            <p>
              <strong>Phone:</strong> {selectedOrder?.buyer_phone}
            </p>
            <p>
              <strong>Email:</strong> {selectedOrder?.buyer_email}
            </p>
          </div>
          <div className="space-y-2">
            {selectedOrder && (
              <p>
                <strong>Order Date:</strong>{" "}
                {new Date(selectedOrder.createdAt).toLocaleDateString()}
              </p>
            )}
            <p>
              <strong>Payment Method:</strong> {selectedOrder?.paymentMethod}
            </p>
            <div className="flex gap-2">
              <strong>Payment Status:</strong>{" "}
              <p
                className={`text-center font-semibold ${
                  selectedOrder?.paymentStatus === "Paid"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {selectedOrder?.paymentStatus}
              </p>
            </div>
            <p>
              <strong>Delivery Status:</strong> {selectedOrder?.deliveryStatus}
            </p>
          </div>
        </div>

        <h3 className="text-xl font-semibold text-darkGray mb-3">
          Ordered Products ({selectedOrder?.products.length}):
        </h3>

        {selectedOrder?.products.map((product) => (
          <div
            key={product.id}
            className="flex border rounded-lg mb-4 p-4 bg-white shadow-sm"
          >
            <Image
              src={product.cover_image.url}
              alt={product.name}
              className="object-cover rounded"
              height={96}
              width={96}
            />
            <div className="ml-4 flex flex-col justify-between w-full">
              <div>
                <h4 className="font-bold text-darkGray">{product.name}</h4>
                <p className="text-sm">Size: {product.size}</p>
                <p className="text-sm">SKU: {product.sku}</p>
              </div>
              <div className="lg:flex justify-between items-center mt-2">
                <p className="text-sm">Quantity: {product.quantity}</p>
                <div className="text-right">
                  {product.discount_rate > 0 ? (
                    <>
                      <span className="text-coral font-semibold mr-2">
                        &#x9F3;{product.discount_price}
                      </span>
                      <span className="line-through text-gray-500">
                        &#x9F3;{product.original_price}
                      </span>
                    </>
                  ) : (
                    <span className="text-coral font-semibold">
                      &#x9F3;{product.original_price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <div className="border-t border-t-coral pt-4 mt-4 text-right font-semibold">
          <p>Delivery Charge: &#x9F3;{selectedOrder?.delivery_charge}</p>
          <p className="text-lg text-coral">
            Total Amount: &#x9F3;{selectedOrder?.totalAmount}
          </p>
        </div>

        <div className="mt-6 text-right">
          <button
            className="bg-coral text-white px-6 py-2 rounded hover:bg-opacity-90"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
