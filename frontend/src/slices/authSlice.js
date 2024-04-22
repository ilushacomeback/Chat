import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const authAdapter = createEntityAdapter();
const initialState = authAdapter.getInitialState({ auth: false, error: false });

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth(state) {
      state.auth = true;
    },
    removeAuth(state) {
      state.auth = false;
    },
    setError(state) {
      state.error = true
    },
    removeError(state) {
      state.error = false
    }
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
