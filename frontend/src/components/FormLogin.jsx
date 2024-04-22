import axios from "axios";
import cn from "classnames";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions as authActions } from "../slices/authSlice";
import getAuth from "../utils/getAuth";
import InvalidLogin from "./InvalidLogin";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector((state) => state.authReducer.error);
  const { setAuth, setError, removeError } = authActions;

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      getAuth(axios, values)
        .then((data) => {
          localStorage.setItem("user", JSON.stringify(data));
          dispatch(removeError());
          dispatch(setAuth());
          return navigate("/");
        })
        .catch((e) => {
          console.log(e);
          dispatch(setError());
        });
    },
  });

  const classesForFormControl = cn({
    "is-invalid": error,
  });

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="col-12 col-md-6 mt-3 mt-mb-0"
      action="/login"
      method="post"
    >
      <h1 className="text-center mb-4">Войти</h1>

      <Form.Floating className="mb-3">
        <Form.Control
          className={classesForFormControl}
          type="text"
          name="username"
          id="username"
          placeholder="Ваш ник"
          onChange={formik.handleChange}
          value={formik.values.username}
          required
        />
        <label htmlFor="username">Ваш ник</label>
      </Form.Floating>
      <Form.Floating className="mb-4">
        <Form.Control
          className={classesForFormControl}
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />
        <Form.Label htmlFor="password">Пароль</Form.Label>
        {error ? <InvalidLogin /> : null}
      </Form.Floating>
      <Button type="submit" className="w-100 mb-3" variant="outline-primary">
        Войти
      </Button>
    </Form>
  );
};
export default FormLogin;
