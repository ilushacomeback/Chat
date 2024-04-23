import { useSelector } from "react-redux";
import { selectors as channelsSelectors } from "../slices/channelsSlice";
import { selectors as messagesSelectors } from "../slices/messagesSlice";
import FormSendMessage from "./FormSendMessage";

const Messages = () => {
  const messages = useSelector(messagesSelectors.selectAll);
  const activeChannelId = useSelector(
    (state) => state.chatReducer.activeChannelId
  );
  const channel = useSelector((state) =>
    channelsSelectors.selectById(state, activeChannelId)
  );
  console.log(messages);

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {channel.name}</b>
          </p>
          <span className="text-muted">Сколько-то сообщений</span>
        </div>
        <div className="chat-messages overflow-auto px-5 "></div>
        <div className="mt-auto px-5 py-3">
          <FormSendMessage />
        </div>
      </div>
    </div>
  );
};

export default Messages;
