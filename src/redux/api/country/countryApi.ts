import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

const countryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllCountry: build.query({
      query: () => ({
        url: `/country/public`,
        method: "GET",
      }),
      providesTags: [tagTypes?.country],
    }),
  }),
});

export const { useGetAllCountryQuery } = countryApi;
