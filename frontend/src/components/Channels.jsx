import { Nav } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { selectors as channelsSelectors } from "../slices/channelsSlice";
import { actions as chatActions } from "../slices/chatSlice";
import cn from "classnames";

const Channels = () => {
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);
  const activeChannelId = useSelector(
    (state) => state.chatReducer.activeChannelId
  );

  const handleActiveChannel = (id) => () => {
    dispatch(chatActions.setActive({ id }));
  };

  const renderChannel = (channel) => {
    return (
      <li className="nav-item w-100" key={channel.id}>
        <button
          className={cn("w-100", "rounded-0", "text-start", "btn", {
            "btn-secondary": channel.id === activeChannelId,
          })}
          type="button"
          onClick={handleActiveChannel(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
      </li>
    );
  };

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <button></button>
      </div>
      <Nav
        as="ul"
        id="channels-box"
        className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels.map(renderChannel)}
      </Nav>
    </div>
  );
};

export default Channels;
