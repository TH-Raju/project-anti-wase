// import { tagTypes.addReviewOfShopsg-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";

import { IShop } from "@/types/shopType";
import { IShopReview } from "@/types/shopReviesType";

const REVIEW_OfSHOPS_URL = "/shop-reviews";

export const shopsReviewEndPoint = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllReviewOfShops: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: REVIEW_OfSHOPS_URL,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IShopReview[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.shopReview],
    }),
    // get single academic department
    getSingleReviewOfShops: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${REVIEW_OfSHOPS_URL}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IShopReview) => ({ data: response }),
      providesTags: [tagTypes.shopReview],
    }),
    // create a new academic department
    addReviewOfShops: build.mutation({
      query: (data) => ({
        url: REVIEW_OfSHOPS_URL,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.shopReview],
    }),
    // update ac department
    updateReviewOfShops: build.mutation({
      query: ({ data, id }) => ({
        url: `${REVIEW_OfSHOPS_URL}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.shopReview],
    }),

    // delete ac department
    deleteReviewOfShops: build.mutation({
      query: (id) => ({
        url: `${REVIEW_OfSHOPS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.shopReview],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddReviewOfShopsMutation,
  useUpdateReviewOfShopsMutation,
  useDeleteReviewOfShopsMutation,
  useGetAllReviewOfShopsQuery,
  useGetSingleReviewOfShopsQuery,
} = shopsReviewEndPoint;
