import { selectors as channelsSelectors} from "./slices/channelsSlice"
import { selectors as messagesSelectors } from "./slices/messagesSlice"

const selectors = {
    auth: (state) => state.authReducer.auth,
    token: (state) => state.authReducer.token,
    errorAuth: (state) => state.authReducer.error,
    activeChannelId: (state) => state.channels.activeChannelId,
    modalChannel: (state) => state.modals.modalChannel
}

export { selectors, channelsSelectors, messagesSelectors }