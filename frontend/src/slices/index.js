import { combineReducers } from '@reduxjs/toolkit';
import auth, { actions as authActions, authSelectors } from './authSlice';
import ui, { actions as modalsActions, uiSelectors } from './uiSlice';
import channels, { actions as channelsActions, channelSelectors } from './channelsSlice';
import { channelsApi } from '../services/channelsApi';
import { messagesApi } from '../services/messagesApi';
import { authApi } from '../services/authApi';

export const actions = {
  ...authActions,
  ...modalsActions,
  ...channelsActions,
};

export const selectors = {
  authSelectors,
  uiSelectors,
  channelSelectors
};

export default combineReducers({
  auth,
  ui,
  channels,
  [channelsApi.reducerPath]: channelsApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
  [authApi.reducerPath]: authApi.reducer,
});
