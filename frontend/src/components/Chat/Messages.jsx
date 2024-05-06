import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FormSendMessage from './FormSendMessage';
import { useGetMessagesQuery } from '../../services/messagesApi';
import { useGetChannelsQuery } from '../../services/channelsApi';
import selectors from '../../selectors';

const Messages = () => {
  const { t } = useTranslation();

  const { data: channels, isLoading: isLoadingChannels } = useGetChannelsQuery();
  const { data: allMessages, isLoading: isLoadingMessages } = useGetMessagesQuery();
  const activeChannelId = useSelector(selectors.currentChannelId);

  const currentChannel = channels.find((channel) => activeChannelId === channel.id);
  const messages = allMessages.filter(
    ({ channelId }) => channelId === activeChannelId,
  );

  const renderMessage = (message) => (
    <div className="text-break mb-2" key={message.id}>
      <b>{message.username}</b>
      :
      {message.body}
    </div>
  );

  return isLoadingChannels || isLoadingMessages ? null : (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {currentChannel && currentChannel.name}
            </b>
          </p>
          <span className="text-muted">
            {t('chatPage.messages', { count: messages.length })}
          </span>
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
