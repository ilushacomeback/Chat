import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const channelsApi = createApi({
  reducerPath: "channelsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1/channels",
    prepareHeaders: (headers, { getState }) => {
      const {
        auth: { token },
      } = getState();
      headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => "",
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        method: "POST",
        body: channel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        method: "DELETE",
        url: `/${id}`,
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ id, name }) => ({
        method: "PATCH",
        url: `/${id}`,
        body: { name }
      }),
    }),
  }),
});

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} = channelsApi;
