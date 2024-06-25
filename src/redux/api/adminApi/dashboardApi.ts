import { tagTypes } from "@/redux/tag-types";
import { IMeta } from "@/types";
import { baseApi } from "../baseApi";

const DASHBOARD = "/dashboard";

export const dashboardData = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // get all academic departments
    getAllDashboardData: build.query({
      query: (arg: Record<string, any>) => {
        return {
          url: DASHBOARD,
          method: "GET",
          params: arg,
        };
      },
      transformResponse: (response: any, meta: IMeta) => {
        // console.log(response);
        return {
          data: response,
          meta,
        };
      },
      providesTags: [],
    }),
  }),
});

export const { useGetAllDashboardDataQuery } = dashboardData;
