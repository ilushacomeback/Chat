import React from "react";
import i18n from "i18next";
import { io } from "socket.io-client";
import { initReactI18next, I18nextProvider } from "react-i18next";
import resources from "./locales/index.js";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import reducer, { actions } from "./slices/index.js";
import { channelsApi } from "./services/channelsApi.js";
import { messagesApi } from "./services/messagesApi.js";
import { authApi } from "./services/authApi.js";
import App from "./components/App.jsx";

const init = async () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        channelsApi.middleware,
        messagesApi.middleware,
        authApi.middleware,
      ]),
  });

  const i18Instance = i18n.createInstance();

  await i18Instance.use(initReactI18next).init({
    resources,
    fallbackLng: "ru",
  });

  const socket = io();

  socket.on("newMessage", (payload) => {
    store.dispatch(
      messagesApi.util.updateQueryData("getMessages", undefined, (messages) => {
        messages.push(payload);
      })
    );
  });

  socket.on("newChannel", (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData("getChannels", undefined, (channels) => {
        channels.push(payload);
      })
    );
  });

  socket.on("removeChannel", ({ id }) => {
    store.dispatch(
      channelsApi.util.updateQueryData("getChannels", undefined, (channels) => {
        const filteredChannels = channels.filter(
          (channel) => channel.id !== id
        );
        const currentChannelId = store.getState().ui.activeChannelId;
        const defaultChannel = store.getState().ui.defaultChannelId;
        if (currentChannelId === id) {
          store.dispatch(actions.setActive(defaultChannel));
        }
        return filteredChannels;
      })
    );
  });

  socket.on("renameChannel", (payload) => {
    store.dispatch(
      channelsApi.util.updateQueryData("getChannels", undefined, (channels) => {
        const index = channels.findIndex(
          (channel) => channel.id === payload.id
        );
        channels[index] = payload;
      })
    );
  });

  return (
    <React.StrictMode>
      <Provider store={store}>
        <I18nextProvider i18n={i18Instance}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </I18nextProvider>
      </Provider>
    </React.StrictMode>
  );
};

export default init;
