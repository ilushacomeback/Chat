import { createSlice } from "@reduxjs/toolkit";

const initialState = { error: false, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, { payload: { token } }) {
      state.token = token;
    },
    removeAuth(state) {
      state.token = null;
    },
    setError(state) {
      state.error = true;
    },
    removeError(state) {
      state.error = false;
    },
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
