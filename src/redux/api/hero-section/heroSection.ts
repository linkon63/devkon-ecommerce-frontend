
import { tagTypes } from "@/redux/tag-types";
import { baseApi } from "../baseApi";

export const heroSectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getHeroSection: build.query({
      query: () => ({
        url: "/hero-section",
        method: "GET",
      }),
      providesTags: [tagTypes?.hero_section],
    }),
  }),
});

export const { useGetHeroSectionQuery } = heroSectionApi;
