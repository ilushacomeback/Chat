import { createSlice } from "@reduxjs/toolkit";

const initialState = { auth: false, error: false, token: null };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state, { payload: { token } }) {
      state.token = token;
      state.auth = true;
    },
    removeAuth(state) {
      state.token = null;
      state.auth = false;
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
