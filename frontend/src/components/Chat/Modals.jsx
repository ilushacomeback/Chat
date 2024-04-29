import * as yup from "yup";
import cn from "classnames";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import { selectors } from "../../selectors";
import { actions } from "../../slices/index";
import {
  useAddChannelMutation,
  useGetChannelsQuery,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} from "../../services/channelsApi";

const getValidateSchema = (channels) =>
  yup.object().shape({
    name: yup
      .string()
      .required()
      .trim()
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов")
      .notOneOf(channels, "Должно быть уникальным"),
  });

const ModalChannel = ({ toggleModalChannel }) => {
  const dispatch = useDispatch();
  const { setActive } = actions;
  const [addChannel] = useAddChannelMutation();
  const { data: channels } = useGetChannelsQuery();
  const names = channels.map(({ name }) => name);

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: getValidateSchema(names),
    validateOnChange: false,
    onSubmit: async ({ name }, { resetForm }) => {
      const response = await addChannel({ name });
      dispatch(setActive(response.data.id));
      dispatch(toggleModalChannel({ isOpen: false, type: "modalChannel" }));
      resetForm();
    },
  });

  return (
    <>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
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
            onChange={formik.handleChange}
          />
          <Form.Label className="visually-hidden" htmlFor="name">
            Имя канала
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
              onClick={() =>
                dispatch(
                  toggleModalChannel({ isOpen: false, type: "modalChannel" })
                )
              }
            >
              Отменить
            </Button>
            <Button type="submit" className="btn btn-primary">
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

const ModalRemoveChannel = ({ toggleModalChannel }) => {
  const dispatch = useDispatch();
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
        <Modal.Title>Удалить канал</Modal.Title>
        <Button
          as="button"
          aria-label="Close"
          className="btn btn-close"
          onClick={closeModal}
        />
      </Modal.Header>
      <Modal.Body>
        <p className="lead">Уверены?</p>
        <div className="d-flex justify-content-end">
          <Button
            as="button"
            className="me-2 btn btn-secondary"
            onClick={closeModal}
          >
            Отменить
          </Button>
          <Button
            type="submit"
            className="btn btn-danger"
            onClick={handleRemove}
          >
            Удалить
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

const ModalRenameChannel = ({ toggleModalChannel }) => {
  const dispatch = useDispatch();
  const idTouchChannel = useSelector(selectors.idTouchChannel);
  const [renameChannel] = useRenameChannelMutation();
  const { data: channels } = useGetChannelsQuery();
  const names = channels.map(({ name }) => name);

  const сloseModal = () => {
    dispatch(toggleModalChannel({ isOpen: false, type: "modalRenameChannel" }));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      id: idTouchChannel,
    },
    validationSchema: getValidateSchema(names),
    validateOnChange: false,
    onSubmit: async ({ name, id }, { resetForm }) => {
      await renameChannel({ name, id });
      сloseModal();
      resetForm();
    },
  });

  return (
    <>
      <Modal.Header>
        <Modal.Title>Переименовать канал</Modal.Title>
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
            onChange={formik.handleChange}
          />
          <Form.Label className="visually-hidden" htmlFor="name">
            Имя канала
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
              Отменить
            </Button>
            <Button type="submit" className="btn btn-primary">
              Отправить
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
