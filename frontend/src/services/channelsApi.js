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
  tagTypes: ["Channels", "Messages"],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => "",
      providesTags: ["Channels"]
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
      invalidatesTags: ["Channels", "Messages"]
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
