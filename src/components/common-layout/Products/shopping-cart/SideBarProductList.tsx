import { useDeleteToCartMutation } from "@/redux/api/cart/cartApi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";

/* eslint-disable @typescript-eslint/no-explicit-any */
type TProps = {
  products: any;
};

export default function SidebarProductList({ products }: TProps) {
  // delete mutation
  const [deleteToCart, { isLoading: isDeleteLoading }] =
    useDeleteToCartMutation();

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
    <div className="lg:p-4 p-2">
      {products?.length > 0 ? (
        <ul className="overflow-auto h-[70vh]">
          {products.map((product: any) => (
            <li
              key={product?.cart_id}
              className="border-b border-coral py-2 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{product?.name}</p>
                <p className="text-sm text-darkGray">
                  Size: {product?.size}{" "}
                  <span className="mx-2 text-coral">|</span> Quantity:{" "}
                  {product?.quantity} <span className="mx-2 text-coral">|</span>{" "}
                  {product?.stock}
                </p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-coral mb-2">
                  BDT: {product?.total_price}
                </p>
                <button
                  onClick={() => deleteHandler(product?.cart_id)}
                  disabled={isDeleteLoading}
                  className="text-coral text-xl "
                >
                  <RiDeleteBin6Line />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="flex justify-center items-center p-2">
          <p className="text-xl">Your shopping cart is empty!</p>
        </div>
      )}
    </div>
  );
}
