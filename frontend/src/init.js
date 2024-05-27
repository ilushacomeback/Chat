import React from 'react';
import { Provider as RollProvider, ErrorBoundary } from '@rollbar/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { io } from 'socket.io-client';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import filter from 'leo-profanity';
import resources from './locales/index.js';
import reducer, { actions, selectors } from './slices/index.js';
import { channelsApi } from './services/channelsApi.js';
import { messagesApi } from './services/messagesApi.js';
import { authApi } from './services/authApi.js';
import App from './components/App.jsx';

const init = async () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat([
      channelsApi.middleware,
      messagesApi.middleware,
      authApi.middleware,
    ]),
  });

  const i18Instance = i18n.createInstance();

  await i18Instance.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  });

  const ruDirectory = filter.getDictionary('ru');
  filter.add(ruDirectory);

  const socket = io();

  socket.on('newMessage', (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData('getMessages', undefined, (messages) => {
        messages.push(payload);
      }),
    );
  });

  socket.on('newChannel', (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (channels) => {
        channels.push(payload);
      }),
    );
  });

  socket.on('removeChannel', ({ id }) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (channels) => {
        const filteredChannels = channels.filter(
          (channel) => channel.id !== id,
        );
        const activeChannelId = selectors.channelSelectors.selectActiveChannelId(store.getState());
        const defaultChannel = selectors.channelSelectors.selectDefaultChannelId(store.getState());
        if (activeChannelId === id) {
          store.dispatch(actions.setActive(defaultChannel));
        }
        return filteredChannels;
      }),
    );
  });

  socket.on('renameChannel', (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData('getChannels', undefined, (channels) => {
        const currentChannel = channels.find(
          (channel) => channel.id === payload.id,
        );
        currentChannel.name = payload.name;
      }),
    );
  });

  const rollbarConfig = {
    accessToken: process.env.REACT_APP_ROLLBAR_KEY,
    environment: 'production',
  };

  return (
    <React.StrictMode>
      <Provider store={store}>
        <RollProvider config={rollbarConfig}>
          <ErrorBoundary>
            <I18nextProvider i18n={i18Instance}>
              <App />
            </I18nextProvider>
          </ErrorBoundary>
        </RollProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default init;
