import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    myCart: build.query({
      query: (clientId: string) => ({
        url: `/cart/client/${clientId}`,
        method: "GET",
      }),
      providesTags: [tagTypes?.add_to_cart],
    }),
    addToCart: build.mutation({
      query: (data) => ({
        url: `/cart`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes?.add_to_cart],
    }),
    updateToCart: build.mutation({
      query: ({ id, payload }) => ({
        url: `/cart/${id}`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes?.add_to_cart],
    }),
    deleteToCart: build.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes?.add_to_cart],
    }),
  }),
});

export const {
  useMyCartQuery,
  useAddToCartMutation,
  useUpdateToCartMutation,
  useDeleteToCartMutation,
} = cartApi;
