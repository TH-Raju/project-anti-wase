import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";
import { IAllTextField } from "@/types/textFiledsType";

const TEXT_FIELDS = "/all-text-fields";

export const textFieldsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllTextFiled: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: TEXT_FIELDS,
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
      providesTags: [tagTypes.allTextFieldFilters],
    }),
    // get single academic department
    getSingleTextFiled: build.query({
      query: (id: string | string[] | undefined) => {
        // console.log(id);
        return {
          url: `${TEXT_FIELDS}/${id}`,
          method: "GET",
        };
      },
      transformResponse: (response: IAllTextField) => ({
        data: response,
      }),
      providesTags: [tagTypes.allTextFieldFilters],
    }),

    // create a new academic department
    addTextFiled: build.mutation({
      query: (data) => {
        // console.log(data, "cacccc");
        return {
          url: TEXT_FIELDS,
          method: "POST",
          data,
        };
      },
      invalidatesTags: [tagTypes.allTextFieldFilters],
    }),
    // update ac department
    updateTextFiled: build.mutation({
      query: ({ data, id }) => {
        // console.log(data, "AllTextFiled data");
        return {
          url: `${TEXT_FIELDS}/${id}`,
          method: "PATCH",
          data: data,
        };
      },
      invalidatesTags: [tagTypes.allTextFieldFilters],
    }),

    // delete ac department
    deleteTextFiled: build.mutation({
      query: (id) => ({
        url: `${TEXT_FIELDS}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.allTextFieldFilters],
    }),
  }),
});

export const {
  useAddTextFiledMutation,
  useDeleteTextFiledMutation,
  useGetAllTextFiledQuery,
  useGetSingleTextFiledQuery,
  useUpdateTextFiledMutation,
} = textFieldsApi;
