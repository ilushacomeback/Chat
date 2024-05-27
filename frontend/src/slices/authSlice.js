/* eslint-disable no-param-reassign */

import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: JSON.parse(localStorage.getItem('user')) || {},
  reducers: {
    setAuth(state, { payload }) {
      state.token = payload.token;
      state.username = payload.username;
    },
    removeAuth(state) {
      state.token = null;
      state.username = null;
    },
  },
});

export const authSelectors = {
  selectToken: (state) => state.auth.token,
  selectUsername: (state) => state.auth.username,
};

export const { actions } = authSlice;
export default authSlice.reducer;
