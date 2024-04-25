import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChannelId: '1',
  defaultChannelId: '1',
  modalChannel: false,
};

const uiSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setActive(state, { payload }) {
      state.activeChannelId = payload
    },
    toggleModalChannel(state, { payload: { isOpen } }) {
      state.modalChannel = isOpen;
    },
  },
});

export const { actions } = uiSlice;
export default uiSlice.reducer;
