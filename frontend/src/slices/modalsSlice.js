import { createSlice } from "@reduxjs/toolkit";

const initialState = { modalChannel: false };

const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    toggleModalChannel(state, { payload: { isOpen } }) {
        state.modalChannel = isOpen
    },
  },
});

export const { actions } = modalsSlice
export default modalsSlice.reducer
