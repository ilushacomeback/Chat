import Channels from "./Channels";
import Messages from "./Messages";
import { useGetChannelsQuery } from "../../services/channelsApi";
import { useGetMessagesQuery } from "../../services/messagesApi";

const ChatBox = () => {
  const { isLoading: isChannelsLoad } = useGetChannelsQuery();
  const { isLoading: isMessagesLoad } = useGetMessagesQuery();

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
