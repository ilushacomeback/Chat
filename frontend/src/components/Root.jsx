import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { actions as authActions } from "../slices/authSlice";
import { actions as channelsActions } from "../slices/channelsSlice";
import { actions as messagesActions } from "../slices/messagesSlice";
import getChannels from "../utils/getChannels";
import getMessages from "../utils/getMessages";
import Chat from "./Chat";
import socket from "../utils/socket-io";

const Root = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuth } = authActions;
  const { addChannels } = channelsActions;
  const { addMessages, addMessage } = messagesActions;

  useEffect(() => {
    const someDo = async () => {
      const authUser = localStorage.getItem("user");
      if (!authUser) {
        navigate("/login");
      } else {
        const token = JSON.parse(authUser).token;
        const channels = await getChannels(axios, token);
        const messages = await getMessages(axios, token);
        dispatch(setAuth({ token }));
        dispatch(addChannels(channels));
        dispatch(addMessages(messages));
        socket.on("connect", () => {
          console.log(socket.connected);
        });
        socket.on("connect_error", () => {
          console.log("connect-error");
        });
        socket.on("newMessage", (payload) => {
          dispatch(addMessage(payload));
        });
      }
    };
    someDo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useSelector((state) => state.authReducer.token) ? <Chat /> : null;
};
export default Root;
