import { useFormik } from "formik";
import { Form, Button, InputGroup } from "react-bootstrap";
import { ArrowRightSquare } from "react-bootstrap-icons";
import { useSelector } from "react-redux";
import { selectors } from "../../selectors";
import { useAddMessageMutation } from "../../services/messagesApi";

const FormSendMessage = () => {
  const [addMessage] = useAddMessageMutation();
  const channelId = useSelector(selectors.currentChannelId);
  const username = useSelector(selectors.username);
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    onSubmit: ({ body }, { resetForm }) => {
      const data = { body, channelId, username };
      addMessage(data);
      resetForm();
    },
  });

  return (
    <Form
      noValidate
      className="py-1 border rounded-2"
      onSubmit={formik.handleSubmit}
    >
      <InputGroup className="has-validation">
        <Form.Control
          name="body"
          aria-label="Новое сообщение"
          placeholder="Введите сообщение..."
          className="border-0 p-0 ps-2 form-control"
          onChange={formik.handleChange}
          value={formik.values.body}
        />
        <Button
          type="submit"
          variant="group-vertical"
          disabled={formik.values.body.length < 1}
        >
          <ArrowRightSquare size={20} />
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default FormSendMessage;