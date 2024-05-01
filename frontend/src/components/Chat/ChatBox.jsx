import { useNavigate } from "react-router-dom";
import { actions } from "../../slices/index";
import Channels from "./Channels";
import Messages from "./Messages";
import { useGetChannelsQuery } from "../../services/channelsApi";
import { useGetMessagesQuery } from "../../services/messagesApi";

const ChatBox = () => {
  const { removeAuth } = actions;
  const navigate = useNavigate();

  const handleRemoveAuth = () => {
    removeAuth();
    navigate("/signup");
  };

  const { isLoading: isChannelsLoad, isError: errorChannels } =
    useGetChannelsQuery();
  const { isLoading: isMessagesLoad, isError: errorMessages } =
    useGetMessagesQuery();

  if (isChannelsLoad || isMessagesLoad) {
    return null;
  } else if (errorChannels || errorMessages) {
    return (
      <div className="text-center">
        <h1 className="h4 text-muted">Видимо ваш аккаунт удален, простите</h1>
        <div className="d-flex justify-content-center">
          <button onClick={() => navigate("/")} className="btn btn-danger">
            Попробовать зайти снова
          </button>
          <button onClick={handleRemoveAuth} className="btn">
            Зарегистрироваться
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <Channels />
          <Messages />
        </div>
      </div>
    );
  }
};

export default ChatBox;
