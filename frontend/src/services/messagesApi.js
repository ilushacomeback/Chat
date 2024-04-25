import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/messages",
    prepareHeaders: (headers, { getState }) => {
      const {
        auth: { token },
      } = getState();
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => "",
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
