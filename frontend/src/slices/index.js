import { combineReducers } from "@reduxjs/toolkit";
import auth, { actions as authActions } from "./authSlice";
import ui, { actions as modalsActions } from "./uiSlice";
import { channelsApi } from "../services/channelsApi";
import { messagesApi } from "../services/messagesApi";


const actions = {
  ...authActions,
  ...modalsActions,
};

export { actions };

export default combineReducers({
  auth,
  ui,
  [channelsApi.reducerPath]: channelsApi.reducer ,
  [messagesApi.reducerPath]: messagesApi.reducer,
});
