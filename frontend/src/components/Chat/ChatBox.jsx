import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { actions } from '../../slices/index';
import { useGetChannelsQuery } from '../../services/channelsApi';
import { useGetMessagesQuery } from '../../services/messagesApi';
import Channels from './Channels';
import Messages from './Messages';
import routes from '../../routes';

const ChatBox = () => {
  const { removeAuth } = actions;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { isLoading: isChannelsLoad, error: errorChannels } = useGetChannelsQuery();
  const { isLoading: isMessagesLoad, error: errorMessages } = useGetMessagesQuery();

  useEffect(() => {
    if (errorChannels?.status === 401 && errorMessages?.status === 401) {
      dispatch(removeAuth());
      navigate(routes.loginPage());
    }
  });

  return isChannelsLoad || isMessagesLoad ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{t('loading')}</span>
      </Spinner>
    </div>
  ) : (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        {!errorChannels && <Channels />}
        {!errorMessages && <Messages />}
      </div>
    </div>
  );
};

export default ChatBox;
