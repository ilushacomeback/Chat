import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/messages",
    prepareHeaders: (headers) => {
      const { token } = JSON.parse(localStorage.getItem("user"));
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "",
      providesTags: ["Messages"],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: "POST",
        body: message,
      }),
    }),
  }),
});

export const { useGetMessagesQuery, useAddMessageMutation } = messagesApi;
