// import { tagTypes.addSurpriseBagsg-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { tagTypes } from "@/redux/tag-types";

import { ISurpriseBag } from "@/types/surpriseBagType";

const SURPRISE_BAG = "/surprise-bag";

export const surpriseBagEndPoint = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllSurpriseBags: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: SURPRISE_BAG,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: ISurpriseBag[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.surpriseBag],
    }),
    // get single academic department
    getSingleSurpriseBag: build.query({
      query: (id: string | string[] | undefined) => ({
        url: `${SURPRISE_BAG}/${id}`,
        method: "GET",
      }),
      transformResponse: (response: ISurpriseBag) => ({ data: response }),
      providesTags: [tagTypes.surpriseBag],
    }),
    // create a new academic department
    addSurpriseBag: build.mutation({
      query: (data) => ({
        url: SURPRISE_BAG,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.surpriseBag],
    }),
    // update ac department
    updateSurpriseBag: build.mutation({
      query: ({ data, id }) => ({
        url: `${SURPRISE_BAG}/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.surpriseBag],
    }),

    // delete ac department
    deleteSurpriseBags: build.mutation({
      query: (id) => ({
        url: `${SURPRISE_BAG}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.surpriseBag],
    }),
  }),
  overrideExisting: true,
});

export const {
  useAddSurpriseBagMutation,
  useUpdateSurpriseBagMutation,
  useDeleteSurpriseBagsMutation,
  useGetSingleSurpriseBagQuery,
  useGetAllSurpriseBagsQuery,
} = surpriseBagEndPoint;
