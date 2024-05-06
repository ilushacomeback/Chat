const selectors = {
  token: (state) => state.auth.token,
  username: (state) => state.auth.username,
  currentModal: (state) => state.ui.currentModal,
  isOpen: (state) => state.ui.isOpen,
  idTouchChannel: (state) => state.ui.idTouchChannel,
  currentChannelId: (state) => state.ui.activeChannelId,
  defaultChannelId: (state) => state.ui.defaultChannelId,
};

export { selectors };
