/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useGetAllCountryQuery } from "@/redux/api/country/countryApi";
import { TResponseDataObj } from "@/types/responseType";

export const useCountryOptions = () => {
  const { data, isLoading } = useGetAllCountryQuery("");
  const countryDataObj = data as TResponseDataObj;
  const country_data = countryDataObj?.data || [];

  let country_options = [];
  if (!!country_data) {
    country_options = country_data?.map((item: Record<string, any>) => {
      return {
        label: item?.name,
        value: item?.id,
      };
    });
  }
  return {
    options: country_options,
    isLoading,
  };
};
