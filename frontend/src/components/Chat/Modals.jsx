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

const Modals = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectors.modalChannel);
  const { toggleModalChannel, setActive } = actions;
  const [addChannel] = useAddChannelMutation();
  const { data: channels } = useGetChannelsQuery();
  const names = channels.map(({ name }) => name)

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
    <Modal show={isOpen}>
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
            className={cn("mb-2", { "is-invalid": formik.errors.name && formik.touched.name })}
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
              onClick={() => dispatch(toggleModalChannel({ isOpen: false }))}
            >
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

export default Modals;
