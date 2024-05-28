import { createSlice, createSelector } from '@reduxjs/toolkit';
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
      )
      .addMatcher(
        channelsApi.endpoints.renameChannel.matchFulfilled,
        (state, { payload }) => {
          const currentChannel = state.channels.find(
            (channel) => channel.id === payload.id
          );
          currentChannel.name = payload.name;
        }
      );
  },
});

export const channelSelectors = {
  selectActiveChannelId: (state) => state.channels.activeChannelId,
  selectDefaultChannelId: (state) => state.channels.defaultChannelId,
  selectChannels: (state) => state.channels.channels,
  selectCurrentChannelId: (state) => state.channels.currentChannelId,
  selectCurrentChannel() {
    return createSelector(
      this.selectCurrentChannelId,
      this.selectChannels,
      (id, channels) => channels.find((channel) => channel.id === id)
    );
  },
  selectChannelsNames() {
    return createSelector(this.selectChannels, (channels) => channels.map(({ name }) => name));
  },
};

export const { actions } = channelsSlice;
export default channelsSlice.reducer;
