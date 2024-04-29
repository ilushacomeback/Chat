import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeChannelId: "1",
  defaultChannelId: "1",
  currentModal: null,
  isOpen: false,
  idTouchChannel: null
};

const uiSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    setActive(state, { payload }) {
      state.activeChannelId = payload;
    },
    toggleModalChannel(state, { payload }) {
      const { type, isOpen, id } = payload;
      state.currentModal = type;
      state.isOpen = isOpen;
      state.idTouchChannel = id ? id : state.idTouchChannel 
    },
  },
});

export const { actions } = uiSlice;
export default uiSlice.reducer;
