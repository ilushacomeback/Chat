import React from "react";
import socket from "./utils/socket-io.js";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { BrowserRouter } from "react-router-dom";
import reducer, { actions } from "./slices/index.js";
import { channelsApi } from "./services/channelsApi.js";
import { messagesApi } from "./services/messagesApi.js";
import App from "./components/App.jsx";

const init = async () => {
  const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([
        channelsApi.middleware,
        messagesApi.middleware,
      ]),
  });

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

  return (
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>
  );
};

export default init;
