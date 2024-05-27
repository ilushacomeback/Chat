import { createSlice } from '@reduxjs/toolkit';
import { channelsApi } from '../services/channelsApi';

const channelsSlice = createSlice({
  name: 'channels',
  initialState: {
    defaultChannelId: '1',
    activeChannelId: '1',
    currentChannelId: null,
    channels: [],
  },
  reducers: {
    setActive(state, { payload }) {
      state.activeChannelId = payload;
    },
    addChannels(state, { payload }) {
      state.channels.push(...payload);
    },
    setCurrentChannelId(state, { payload }) {
      const { id } = payload;
      state.currentChannelId = id || state.currentChannelId;
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(
        channelsApi.endpoints.addChannel.matchFulfilled,
        (state, { payload }) => {
          state.channels.push(payload);
        }
      )
      .addMatcher(
        channelsApi.endpoints.removeChannel.matchFulfilled,
        (state, { payload }) => {
          state.channels = state.channels.filter(
            (channel) => channel.id !== payload.id
          );
        }
      );
  },
});

export const channelSelectors = {
  selectActiveChannelId: (state) => state.channels.activeChannelId,
  selectDefaultChannelId: (state) => state.channels.defaultChannelId,
  selectChannels: (state) => state.channels.channels,
  selectCurrentChannelId: (state) => state.channels.currentChannelId,
};

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
