import Channels from "./Channels";
import Messages from "./Messages";
import { useGetChannelsQuery } from "../../services/channelsApi";
import { useGetMessagesQuery } from "../../services/messagesApi";

const ChatBox = () => {
  const {
    isLoading: isChannelsLoad,
    data: channels,
    isError: error,
  } = useGetChannelsQuery();
  const {
    isLoading: isMessagesLoad,
    data: messages,
    isError: e,
  } = useGetMessagesQuery();
  console.log(e, error, isMessagesLoad, isChannelsLoad, messages, channels);

  return isChannelsLoad || isMessagesLoad ? null : (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels />
        <Messages />
      </div>
    </div>
  );
};

export default ChatBox;
