import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    getAuth: builder.mutation({
      query: (data) => ({
        method: "POST",
        body: data,
        url: "/login",
      }),
    }),
    signup: builder.mutation({
      query: (data) => ({
        method: "POST",
        body: data,
        url: "/signup",
      }),
    }),
  }),
});

export const { useGetAuthMutation, useSignupMutation } = authApi;
