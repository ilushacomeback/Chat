import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const channelsAdapter = createEntityAdapter();
const initialState = channelsAdapter.getInitialState({ activeChannelId: '1' });

const channelsSlice = createSlice({
  name: "channels",
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: channelsAdapter.addMany,
    setActive(state, { payload: { id } }) {
      state.activeChannelId = id;
    },
  },
});

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels
);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
