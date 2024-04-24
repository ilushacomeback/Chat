import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import channelsReducer from "./channelsSlice.js";
import messagesReducer from "./messagesSlice.js";
import modalsReduces from "./modalsSlice.js";

export default configureStore({
  reducer: {
    authReducer,
    channels: channelsReducer,
    messages: messagesReducer,
    modals: modalsReduces,
  },
});
