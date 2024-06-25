import { IUser } from "@/types/userTypes";
import { tagTypes } from "../../tag-types";
import { baseApi } from "../baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userLogin: build.mutation({
      query: (loginData) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: loginData,
      }),
      invalidatesTags: [tagTypes.LoginHistory],
    }),
    userLogOut: build.mutation({
      query: ({ id, data }) => ({
        url: `${AUTH_URL}/log-out-history/${id}`,
        method: "POST",
        data: {},
        withCredentials: true,
      }),
      invalidatesTags: [tagTypes.LoginHistory],
    }),
    getProfile: build.query({
      query: () => ({
        url: `${AUTH_URL}/profile`,
        method: "GET",
      }),
      transformResponse: (response: IUser) => ({ data: response }),
      providesTags: [tagTypes.profile],
    }),
  

    changePassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/change-password`,
        method: "POST",
        data: data,
      }),
      // transformResponse: (response: IUser) => ({ data: response }),
      invalidatesTags: [tagTypes.profile],
    }),
    forgetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        data: data,
      }),
      // invalidatesTags: [tagTypes.profile],
    }),
    setOtp: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/set-otp`,
        method: "POST",
        data: data,
      }),
      // invalidatesTags: [tagTypes.profile],
    }),
    tokenToSetPassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/forgot-password`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.profile],
    }),
  }),
  overrideExisting: true,
});

export const {
  useUserLoginMutation,
  useGetProfileQuery,

  useUserLogOutMutation,
  useChangePasswordMutation,
  //
  useForgetPasswordMutation,
  useSetOtpMutation,
  useTokenToSetPasswordMutation,
  //
} = authApi;
