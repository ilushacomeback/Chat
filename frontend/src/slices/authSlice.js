import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";

const authAdapter = createEntityAdapter();
const initialState = authAdapter.getInitialState({ auth: false });

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
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
