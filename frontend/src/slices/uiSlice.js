/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  typeModal: null,
};

const uiSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    toggleModalChannel(state, { payload }) {
      const { type } = payload;
      state.typeModal = type;
    },
  },
});

export const uiSelectors = {
  selectTypeModal: (state) => state.ui.typeModal,
  selectTouchChannelId: (state) => state.ui.touchChannelId,
};

export const { actions } = uiSlice;
export default uiSlice.reducer;
