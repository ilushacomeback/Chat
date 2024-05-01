import * as yup from "yup";
import cn from "classnames";
import { Modal, Button, Form } from "react-bootstrap";
import { useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { selectors } from "../../selectors";
import { actions } from "../../slices/index";
import {
  useAddChannelMutation,
  useGetChannelsQuery,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} from "../../services/channelsApi";

const getValidateSchema = (channels, t) =>
  yup.object().shape({
    name: yup
      .string()
      .required(t("errors.required"))
      .trim()
      .min(3, t("errors.minMax"))
      .max(20, t("errors.minMax"))
      .notOneOf(channels, t("errors.notUniqNamesChannels")),
  });

const ModalChannel = ({ toggleModalChannel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const input = useRef();
  const { setActive } = actions;
  const [addChannel] = useAddChannelMutation();
  const { data: channels } = useGetChannelsQuery();
  const names = channels.map(({ name }) => name);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: getValidateSchema(names, t),
    validateOnChange: false,
    onSubmit: async ({ name }, { resetForm }) => {
      const response = await addChannel({ name });
      dispatch(setActive(response.data.id));
      dispatch(toggleModalChannel({ isOpen: false, type: "modalChannel" }));
      resetForm();
    },
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t("modals.addChannel")}</Modal.Title>
        <Button
          as="button"
          aria-label="Close"
          className="btn btn-close"
          onClick={() =>
            dispatch(
              toggleModalChannel({ isOpen: false, type: "modalChannel" })
            )
          }
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            as="input"
            id="name"
            className={cn("mb-2", {
              "is-invalid": formik.errors.name && formik.touched.name,
            })}
            value={formik.values.name}
            ref={input}
            onChange={formik.handleChange}
          />
          <Form.Label className="visually-hidden" htmlFor="name">
            {t("modals.nameChannel")}
          </Form.Label>
          <div className="invalid-feedback">
            {formik.touched.name && formik.errors.name}
          </div>
          <div className="d-flex justify-content-end">
            <Button
              as="button"
              className="me-2 btn btn-secondary"
              onClick={() =>
                dispatch(
                  toggleModalChannel({ isOpen: false, type: "modalChannel" })
                )
              }
            >
              {t("modals.cancel")}
            </Button>
            <Button type="submit" className="btn btn-primary">
              {t("send")}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

const ModalRemoveChannel = ({ toggleModalChannel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [removeChannel] = useRemoveChannelMutation();
  const idTouchChannel = useSelector(selectors.idTouchChannel);

  const closeModal = () => {
    dispatch(toggleModalChannel({ isOpen: false, type: "modalRemoveChannel" }));
  };

  const handleRemove = () => {
    removeChannel(idTouchChannel);
    closeModal();
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t("modals.removeChannel")}</Modal.Title>
        <Button
          as="button"
          aria-label="Close"
          className="btn btn-close"
          onClick={closeModal}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t("modals.sure")}</p>
        <div className="d-flex justify-content-end">
          <Button
            as="button"
            className="me-2 btn btn-secondary"
            onClick={closeModal}
          >
            {t("modals.cancel")}
          </Button>
          <Button
            type="submit"
            className="btn btn-danger"
            onClick={handleRemove}
          >
            {t("modals.delete")}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

const ModalRenameChannel = ({ toggleModalChannel }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const input = useRef();
  const idTouchChannel = useSelector(selectors.idTouchChannel);
  const [renameChannel] = useRenameChannelMutation();
  const { data: channels } = useGetChannelsQuery();
  const names = channels.map(({ name }) => name);
  const currentChannel = channels.find(({ id }) => id === idTouchChannel);

  const сloseModal = () => {
    dispatch(toggleModalChannel({ isOpen: false, type: "modalRenameChannel" }));
  };

  const formik = useFormik({
    initialValues: {
      name: currentChannel.name,
      id: idTouchChannel,
    },
    validationSchema: getValidateSchema(names, t),
    validateOnChange: false,
    onSubmit: async ({ name, id }, { resetForm }) => {
      await renameChannel({ name, id });
      сloseModal();
      resetForm();
    },
  });

  useEffect(() => {
    input.current.select();
  }, []);

  return (
    <>
      <Modal.Header>
        <Modal.Title>{t("modals.renameChannel")}</Modal.Title>
        <Button
          as="button"
          aria-label="Close"
          className="btn btn-close"
          onClick={сloseModal}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            as="input"
            id="name"
            className={cn("mb-2", {
              "is-invalid": formik.errors.name && formik.touched.name,
            })}
            value={formik.values.name}
            ref={input}
            onChange={formik.handleChange}
          />
          <Form.Label className="visually-hidden" htmlFor="name">
            {t("modals.nameChannel")}
          </Form.Label>
          <div className="invalid-feedback">
            {formik.errors.name && formik.touched.name
              ? formik.errors.name
              : null}
          </div>
          <div className="d-flex justify-content-end">
            <Button
              as="button"
              className="me-2 btn btn-secondary"
              onClick={сloseModal}
            >
              {t("modals.cancel")}
            </Button>
            <Button type="submit" className="btn btn-primary">
              {t("send")}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

const mappingModals = {
  modalChannel: ModalChannel,
  modalRemoveChannel: ModalRemoveChannel,
  modalRenameChannel: ModalRenameChannel,
};

const Modals = () => {
  const typeModal = useSelector(selectors.currentModal);
  const isOpen = useSelector(selectors.isOpen);
  const { toggleModalChannel } = actions;

  const CurrentModal = mappingModals[typeModal];

  return (
    <Modal show={isOpen}>
      {CurrentModal && <CurrentModal toggleModalChannel={toggleModalChannel} />}
    </Modal>
  );
};

export default Modals;
