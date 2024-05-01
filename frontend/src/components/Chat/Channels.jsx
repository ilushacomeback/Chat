import cn from "classnames";
import { Nav, ButtonGroup, Dropdown } from "react-bootstrap";
import { PlusSquare } from "react-bootstrap-icons";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import { useGetChannelsQuery } from "../../services/channelsApi";
import { actions } from "../../slices/index";
import { selectors } from "../../selectors";
import Modals from "./Modals";

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const activeChannelId = useSelector(selectors.currentChannelId);
  const { setActive, toggleModalChannel } = actions;
  const { data: channels, isLoading } = useGetChannelsQuery();

  const handleActiveChannel = (id) => () => {
    dispatch(setActive(id));
  };

  const handleOpen = (id, type) => {
    dispatch(
      toggleModalChannel({
        isOpen: true,
        type,
        id,
      })
    );
  };

  const renderDefaultChannel = (channel) => {
    return (
      <li className="nav-item w-100" key={channel.id}>
        <button
          className={cn("w-100", "rounded-0", "text-start", "btn", {
            "btn-secondary": channel.id === activeChannelId,
          })}
          onClick={handleActiveChannel(channel.id)}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
      </li>
    );
  };

  const renderCustomChannel = (channel) => {
    return (
      <li className="nav-item w-100" key={channel.id}>
        <Dropdown as={ButtonGroup} className="d-flex">
          <button
            className={cn(
              "w-100",
              "rounded-0",
              "text-start",
              "text-truncate",
              "btn",
              {
                "btn-secondary": channel.id === activeChannelId,
              }
            )}
            onClick={handleActiveChannel(channel.id)}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
          <Dropdown.Toggle
            as={"button"}
            split
            className={cn("flex-grow-0", "btn", {
              "btn-secondary": channel.id === activeChannelId,
            })}
          >
            <span className="visually-hidden">
              {t("chatPage.controlChannel")}
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item
              role="button"
              href="#"
              onClick={() => handleOpen(channel.id, "modalRemoveChannel")}
            >
              {t("modals.delete")}
            </Dropdown.Item>
            <Dropdown.Item
              role="button"
              href="#"
              onClick={() => handleOpen(channel.id, "modalRenameChannel")}
            >
              {t("modals.rename")}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </li>
    );
  };

  return isLoading ? null : (
    <>
      <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <button
            as="button"
            className="p-0 text-primary btn btn-group-vertical"
            onClick={() => {
              dispatch(
                toggleModalChannel({ type: "modalChannel", isOpen: true })
              );
            }}
          >
            <PlusSquare size={20} />
            <span className="visually-hidden">+</span>
          </button>
        </div>
        <Nav
          as="ul"
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channels.map((channel) =>
            channel.removable
              ? renderCustomChannel(channel)
              : renderDefaultChannel(channel)
          )}
        </Nav>
      </div>
      <Modals />
    </>
  );
};

export default Channels;
