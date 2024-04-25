import { Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Form } from "react-bootstrap";
import { useFormik } from "formik";
import { selectors } from "../../selectors";
import { actions } from "../../slices/index";
import { useAddChannelMutation } from "../../services/channelsApi";

const ModalChannel = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.modalChannel);
  const { toggleModalChannel, setActive } = actions;
  const [addChannel] = useAddChannelMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
    },
    onSubmit: async ({ name }, { resetForm }) => {
      const response = await addChannel({ name });
      dispatch(setActive(response.data.id))
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
