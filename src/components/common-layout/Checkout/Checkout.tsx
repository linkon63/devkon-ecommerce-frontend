"use client";
import PCInput from "@/components/forms/PCInput";
import { useEffect, useState } from "react";
import CheckoutSummery from "./CheckoutSummery";
import { getClientIdFromLocalStorage } from "@/services/local-storage/local-storage";
import { useMyCartQuery } from "@/redux/api/cart/cartApi";
import { TCartProduct } from "@/types/ProductsType";
import PCForm from "@/components/forms/PCForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderValidationSchema } from "./validation-schema/validations";
import { filterUndefinedValues } from "@/utils/sanitizeObject";
import { toast } from "sonner";
import { useStripeInitMutation } from "@/redux/api/order/orderApi";
import { loadStripe } from "@stripe/stripe-js";
import { useGetOwnProfileQuery } from "@/redux/api/user/userApi";
import { BiHome, BiMapPin, BiUser } from "react-icons/bi";
import Loader from "@/components/ui/Loader";
import PCPhoneInput from "@/components/forms/PCPhoneInput";
import PCCountrySelect from "@/components/forms/PCCountrySelect";

export default function Checkout() {
  const [clientId, setClientId] = useState("my-clientId");
  useEffect(() => {
    const client_id = getClientIdFromLocalStorage();
    setClientId(client_id);
  }, []);

  const {
    data: userData,
    isLoading: isProfileLoading,
    isFetching,
  } = useGetOwnProfileQuery("");

  const defaultValues = {
    buyer_name: userData?.data?.name || "",
    buyer_email: userData?.data?.email || "",
    buyer_phone: userData?.data?.phone || "",
    shipping_info: {
      countryId: userData?.data?.shipping_info?.countryId || "",
      state: userData?.data?.shipping_info?.state || "",
      city: userData?.data?.shipping_info?.city || "",
      address_line: userData?.data?.shipping_info?.address_line || "",
      contact_no: userData?.data?.phone || "",
    },
  };
  // cart data fetching
  const { data, isLoading } = useMyCartQuery(clientId);
  const shippingCharge = process.env.NEXT_PUBLIC_DELIVERY_CHARGE || 0;
  const cartInfo = data?.data;
  const products: TCartProduct[] | [] = cartInfo?.products || [];
  // calculate total tax/vat
  const totalTaxPrice = products.reduce(
    (acc, item) => acc + item?.tax_price,
    0
  );

  // calculate total product price
  const subTotalPrice = products.reduce(
    (acc, item) => acc + item?.discount_price,
    0
  );


  const [stripeInit, { isLoading: isStripeInitLoading }] =
    useStripeInitMutation();

  const publishable_key = process.env
    .NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string;

  // submit handler
  const submitHandler: SubmitHandler<FieldValues> = async (values) => {
    const { shipping_info } = values;
    const order_data = {
      ...values,
      clientId,
      delivery_charge: Number(shippingCharge),
      shipping_info: filterUndefinedValues(shipping_info),
    };
    console.log({order_data});
    const payload = filterUndefinedValues(order_data);
    const toastId = toast.loading("Please wait...");
    console.log({payload});
    try {
      const stripe = await loadStripe(publishable_key);
      const response = await stripeInit(payload).unwrap();
      if (!!response?.success) {
        toast.success(response?.message, { id: toastId, duration: 3000 });
        stripe?.redirectToCheckout({
          sessionId: response?.data?.stripeInitInfo?.id,
        });
      } else {
        toast.error(response?.message, { id: toastId, duration: 3000 });
        console.log("Update Profile Response:", response);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong !", { id: toastId, duration: 3000 });
    }
  };

  if (!!isLoading || isFetching || isProfileLoading) {
    return (
      <>
        <Loader />
      </>
    );
  }
  return (
    <section>
      <PCForm
        onSubmit={submitHandler}
        resolver={zodResolver(orderValidationSchema)}
        defaultValues={defaultValues ?? {}}
      >
        <div className="lg:flex lg:gap-14">
          {/* left side form */}
          <div className="lg:w-2/3 w-full">
            <div className="rounded-xl shadow-lg overflow-hidden">
              <div className="bg-coral p-6">
                <h2 className="text-2xl font-medium text-white flex items-center gap-2">
                  <BiMapPin className="h-5 w-5" />
                  Shipping Details
                </h2>
                <p className="text-white text-sm mt-1">
                  Please enter your shipping information below
                </p>
              </div>
              <div className="p-8">
                <div className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4 bg-lightCream lg:p-6 p-3">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <BiUser className="h-4 w-4 text-coral" />
                      Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PCInput
                        label="Full Name"
                        type="text"
                        name="buyer_name"
                        required
                      />
                      <PCInput
                        label="Email"
                        type="email"
                        name="buyer_email"
                        required
                        readonly={!!userData?.data}
                      />
                      <PCPhoneInput
                        label="Phone"
                        name="buyer_phone"
                        type="text"
                        required
                      />
                    </div>
                  </div>
                  {/* Address Information */}
                  <div className="space-y-4 pt-4 bg-lightCream p-6">
                    <h3 className="text-lg font-medium text-gray-900 flex items-center gap-2">
                      <BiHome className="h-4 w-4 text-coral" />
                      Address Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <PCCountrySelect
                        label="Country"
                        name="shipping_info.countryId"
                        required
                      />
                      <PCInput
                        label="State/Province"
                        type="text"
                        name="shipping_info.state"
                        required
                      />
                      <PCInput
                        label="City"
                        type="text"
                        name="shipping_info.city"
                        required
                      />
                      <PCPhoneInput
                        name="shipping_info.contact_no"
                        label="Contact Number"
                        placeholder="Enter Contact number"
                        type="text"
                        required
                      />
                      <PCInput
                        label="Street Address"
                        type="text"
                        name="shipping_info.address_line"
                        required
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="border-l-2 border-l-coral lg:block hidden"></div>
          {/* right side order details*/}
          <div className="lg:w-1/3">
            <h3 className="text-2xl font-medium text-white bg-coral flex items-center gap-2 p-4">
              Your Order
            </h3>
            <div className="bg-lightCream">
              <CheckoutSummery
                totalAmount={data?.data?.totalAmount}
                shippingCharge={Number(shippingCharge)}
                subTotalPrice={subTotalPrice}
                taxPrice={totalTaxPrice}
              />
            </div>
            <div className="mt-10 text-center">
              <button
                type="submit"
                disabled={isStripeInitLoading}
                className="lg:px-32 px-20 py-2 text-coral font-bold rounded-md border border-coral hover:bg-coral hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </PCForm>
    </section>
  );
}
