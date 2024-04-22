import { useFormik } from "formik";
import { Form, Button, FloatingLabel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import getAuth from "../utils/getAuth";
import { actions as authActions } from "../slices/authSlice";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { setAuth } = authActions

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      getAuth(axios, values)
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data))
          dispatch(setAuth())
          return navigate("/");
        })
        .catch((e) => {
          console.log(e);
        });
    },
  });
  
  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="col-12 col-md-6 mt-3 mt-mb-0"
      action="/login"
      method="post"
    >
      <h1 className="text-center mb-4">Войти</h1>
      <Form.Group className="form-floating mb-3">
        <FloatingLabel htmlFor="username" label="Ваш ник">
          <Form.Control
            type="text"
            name="username"
            className="form-control"
            placeholder="Ваш ник"
            onChange={formik.handleChange}
            value={formik.values.username}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="form-floating mb-4">
        <FloatingLabel htmlFor="password" label="Пароль">
          <Form.Control
            type="password"
            name="password"
            className="form-control"
            placeholder="Пароль"
            onChange={formik.handleChange}
            value={formik.values.password}
            required
          />
        </FloatingLabel>
      </Form.Group>
      <Button type="submit" className="w-100 mb-3" variant="outline-primary">
        Войти
      </Button>
    </Form>
  );
};
export default FormLogin;
