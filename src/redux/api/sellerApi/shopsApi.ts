// import { tagTypes.addShopsg-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";

import { IShop } from "@/types/shopType";

const SHOPS_URL = "/shops";

export const shopsEndPoint = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllShops: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SHOPS_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IShop[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.shops],
    }),
    // get all academic departments
    getAllFavoriteAvgRatingShops: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${SHOPS_URL}/favorite-avgrating`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IShop[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.shops],
    }),
    // get single academic department
    getSingleShops: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SHOPS_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IShop) => ({ data: response }),
      providesTags: [tagTypes.shops],
    }),
    // create a new academic department
    addShops: build.mutation({
      query: (data) => ({
        url: SHOPS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.shops],
    }),
    // update ac department
    updateShops: build.mutation({
      query: ({ data, id }) => ({
        url: `${SHOPS_URL}/${id}`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.shops],
    }),

    // delete ac department
    deleteShops: build.mutation({
      query: (id) => ({
        url: `${SHOPS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.shops],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddShopsMutation,
  useUpdateShopsMutation,
  useDeleteShopsMutation,
  useGetAllShopsQuery,
  useGetSingleShopsQuery,
  useGetAllFavoriteAvgRatingShopsQuery
} = shopsEndPoint;
