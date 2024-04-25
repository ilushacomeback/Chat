const selectors = {
  token: (state) => state.auth.token,
  username: (state) => state.auth.username,
  modalChannel: (state) => state.ui.modalChannel,
  currentChannelId: (state) => state.ui.activeChannelId,
  defaultChannelId: (state) => state.ui.defaultChannelId
};

export { selectors };
