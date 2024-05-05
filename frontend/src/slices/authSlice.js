import { createSlice, current } from "@reduxjs/toolkit";
import { channelsApi } from "../services/channelsApi";
import { messagesApi } from "../services/messagesApi";
import { authApi } from "../services/authApi";

const authSlice = createSlice({
  name: "auth",
  initialState: JSON.parse(localStorage.getItem("user")) || {},
  reducers: {
    setAuth(state, { payload }) {
      localStorage.setItem("user", JSON.stringify(payload));
      state.token = payload.token;
      state.username = payload.username;
    },
    removeAuth(state) {
      localStorage.removeItem("user");
      state.token = null;
      state.username = null;
    },
  },
});

export const { actions } = authSlice;
export default authSlice.reducer;
