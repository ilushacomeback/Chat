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

const Root = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuth } = authActions;
  const { addChannels } = channelsActions
  const { addMessages } = messagesActions

  useEffect(() => {
    const someDo = async () => {
      const authUser = localStorage.getItem("user");
      if (!authUser) {
        navigate("/login");
      } else {
        const token = JSON.parse(authUser).token
        const channels = await getChannels(axios, token);
        const messages = await getMessages(axios, token)
        console.log(messages)
        dispatch(setAuth({ token }));
        dispatch(addChannels(channels))
        dispatch(addMessages(messages))
      }
    };
    someDo()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return useSelector((state) => state.authReducer.token) ? <Chat /> : null;
};
export default Root;
