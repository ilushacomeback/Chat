import { useFormik } from "formik";
import { Form, Button, InputGroup } from "react-bootstrap";

const FormSendMessage = () => {
  const formik = useFormik({
    initialValues: {
      body: "",
    },
    onSubmit: (values) => {
      console.log(values);
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
          className="btn btn-group-vertical"
          disabled={formik.values.body.length < 0}
        >
          <span className="visually-hidden">Отправить</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default FormSendMessage;
