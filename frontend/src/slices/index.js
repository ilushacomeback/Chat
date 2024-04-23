import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice.js";
import channelsReducer from "./channelsSlice.js";
import messagesReducer from "./messagesSlice.js";
import chatReducer from './chatSlice.js'

export default configureStore({
  reducer: {
    authReducer,
    chatReducer,
    channels: channelsReducer,
    messages: messagesReducer,
  },
});
