import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { actions } from "../../slices/index";
import Channels from "./Channels";
import Messages from "./Messages";
import { useGetChannelsQuery } from "../../services/channelsApi";
import { useGetMessagesQuery } from "../../services/messagesApi";
import routes from "../../routes";

const ChatBox = () => {
  const { removeAuth } = actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading: isChannelsLoad, error: errorChannels } =
    useGetChannelsQuery();
  const { isLoading: isMessagesLoad, error: errorMessages } =
    useGetMessagesQuery();

  useEffect(() => {
    if (errorChannels?.status === 401 && errorMessages?.status === 401) {
      dispatch(removeAuth());
      navigate(routes.loginPage());
    }
  });

  return isChannelsLoad || isMessagesLoad ? null : (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        {!errorChannels && <Channels />}
        {!errorMessages && <Messages />}
      </div>
    </div>
  );
};

export default ChatBox;
