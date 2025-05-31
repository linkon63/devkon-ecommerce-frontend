import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    ownOrder: build.query({
      query: () => ({
        url: `/order/own-order`,
        method: "GET",
      }),
      providesTags: [tagTypes?.order],
    }),
    stripeInit: build.mutation({
      query: (data) => ({
        url: `/order/stripe-initial`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes?.order],
    }),
    stripeValidation: build.mutation({
      query: (data) => ({
        url: `/order/stripe-validation`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes?.order],
    }),
    getOrderInvoice: build.query({
      query: (orderId) => ({
        url: `/order/invoice/${orderId}`,
        method: "GET",
      }),
      providesTags: [tagTypes?.order],
    }),
  }),
});

export const {
  useOwnOrderQuery,
  useStripeInitMutation,
  useStripeValidationMutation,
  useGetOrderInvoiceQuery
} = orderApi;
