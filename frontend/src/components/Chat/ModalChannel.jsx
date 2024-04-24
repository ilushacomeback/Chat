import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import { selectors } from "../../selectors";
import { actions as modalActions } from "../../slices/modalsSlice";
import postChannel from "../../utils/postChannel";

const ModalChannel = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.modalChannel);
  const token = useSelector(selectors.token);
  const { toggleModalChannel } = modalActions;

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async ({ name }, { resetForm }) => {
      await postChannel(axios, token, { name });
      dispatch(toggleModalChannel({ isOpen: false }));
      resetForm();
    },
  });

  return (
    <Modal show={isOpen}>
      <Modal.Header>
        <Modal.Title>Добавить канал</Modal.Title>
        <Button
          as="button"
          aria-label="Close"
          className="btn btn-close"
          onClick={() => dispatch(toggleModalChannel({ isOpen: false }))}
        />
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Control
            as="input"
            id="name"
            className="mb-2"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Form.Label className="visually-hidden" htmlFor="name">
            Имя канала
          </Form.Label>
          <div className="d-flex justify-content-end">
            <Button as="button" className="me-2 btn btn-secondary">
              Отменить
            </Button>
            <Button type="submit" className="btn btn-primary">
              Отправить
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ModalChannel;
