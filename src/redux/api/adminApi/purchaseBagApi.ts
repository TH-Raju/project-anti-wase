// import { tagTypes.addPurchaseBagg-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";
import { IPurchase } from "@/types/purchaseType";

const PURCHASE_BAG = "/purchase-bag";

export const purchaseBagEndPoint = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllPurchaseBag: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: PURCHASE_BAG,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IPurchase[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.purchaseBag],
    }),
    // get all academic departments
    getAllTransaction: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: `${PURCHASE_BAG}/transaction`,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (
        response: {
          total: [
            {
              _id: null;
              total: number;
            }
          ];
          deliveryCompleted: [
            {
              _id: null;
              total: number;
            }
          ];
          deliveryPending: [
            {
              _id: null;
              total: number;
            }
          ];
          data: IPurchase[];
        }[],
        meta: IMeta
      ) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.purchaseBag],
    }),
    // get single academic department
    getSinglePurchaseBag: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${PURCHASE_BAG}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: IPurchase) => ({ data: response }),
      providesTags: [tagTypes.purchaseBag],
    }),

    // update ac department
    updatePurchaseBag: build.mutation({
      query: ({ data, id }) => ({
        url: ``,
        // url: `${PURCHASE_BAG}/${id}`,
        method: "PATCH",
        data,
        contentType: "multipart/form-data",
      }),
      invalidatesTags: [tagTypes.purchaseBag],
    }),

    // delete ac department
    deletePurchaseBag: build.mutation({
      query: (id) => ({
        url: ``,
        // url: `${PURCHASE_BAG}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.purchaseBag],
    }),
  }),
  overrideExisting: true,
});

export const {
  useUpdatePurchaseBagMutation,
  useDeletePurchaseBagMutation,
  useGetAllPurchaseBagQuery,
  useGetSinglePurchaseBagQuery,
  useGetAllTransactionQuery
} = purchaseBagEndPoint;
