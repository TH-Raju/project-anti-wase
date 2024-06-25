import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { IAllTextField } from "@/types/textFiledsType";

const NOTIFICATION = "/notification";

export const notificationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllTextFiled: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: NOTIFICATION,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: IAllTextField[], meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [tagTypes.notification],
    }),
    // get single academic department
    getSingleTextFiled: build.query({
      query: (id: string | string[] | undefined) => {
        // console.log(id);
        return {
          url: `${NOTIFICATION}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: IAllTextField) => ({
        data: response,
      }),
      providesTags: [tagTypes.notification],
    }),

    // create a new academic department
    addTextFiled: build.mutation({
      query: (data) => {
        // console.log(data, "cacccc");
        return {
          url: `${NOTIFICATION}/create-notification`,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.notification],
    }),
    // update ac department
    updateTextFiled: build.mutation({
      query: ({ data, id }) => {
        // console.log(data, "AllTextFiled data");
        return {
          url: `${NOTIFICATION}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.notification],
    }),

    // delete ac department
    deleteTextFiled: build.mutation({
      query: (id) => ({
        url: `${NOTIFICATION}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),
});

export const {
  useAddTextFiledMutation,
  useDeleteTextFiledMutation,
  useGetAllTextFiledQuery,
  useGetSingleTextFiledQuery,
  useUpdateTextFiledMutation,
} = notificationApi;
