import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOwnProfile: build.query({
      query: () => ({
        url: `/users/me`,
        method: "GET",
      }),
      providesTags: [tagTypes?.profile],
    }),
    updateOwnProfile: build.mutation({
      query: (payload) => ({
        url: `/users/update-public-own-profile`,
        method: "PATCH",
        data: payload,
      }),
      invalidatesTags: [tagTypes?.profile],
    }),
    deleteOwnProfile: build.mutation({
      query: () => ({
        url: `/users/delete-public-own-profile`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes?.profile],
    }),
  }),
});

export const {
  useGetOwnProfileQuery,
  useUpdateOwnProfileMutation,
  useDeleteOwnProfileMutation,
} = userApi;
