import { createSlice } from "@reduxjs/toolkit";

const initialState = { activeChannelId: '1' };

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActive(state, { payload: { id } }) {
        state.activeChannelId = id
    },
  },
});

export const { actions } = chatSlice
export default chatSlice.reducer