import { useSelector } from "react-redux";
import FormSendMessage from "./FormSendMessage";
import { useGetMessagesQuery } from "../../services/messagesApi";
import { useGetChannelsQuery } from "../../services/channelsApi";
import { selectors } from "../../selectors";

const Messages = () => {
  const { data: channels } = useGetChannelsQuery();
  const { data: allMessages } = useGetMessagesQuery();
  const activeChannelId = useSelector(selectors.currentChannelId);

  const channel = channels.find((channel) => activeChannelId === channel.id);
  const messages = allMessages.filter(
    ({ channelId }) => channelId === activeChannelId
  );

  const renderMessage = (message) => {
    return (
      <div className="text-break mb-2" key={message.id}>
        <b>{message.username}</b>: {message.body}
      </div>
    );
  };

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {channel && channel.name}</b>
          </p>
          <span className="text-muted">{messages.length} сообщений</span>
        </div>
        <div className="chat-messages overflow-auto px-5 ">
          {messages.map(renderMessage)}
        </div>
        <div className="mt-auto px-5 py-3">
          <FormSendMessage />
        </div>
      </div>
    </div>
  );
};

export default Messages;
