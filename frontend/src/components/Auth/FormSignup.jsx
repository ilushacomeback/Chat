import axios from "axios";
import * as yup from "yup";
import cn from "classnames";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../slices/index";

const getValidateSchema = () => {
  return yup.object().shape({
    username: yup
      .string()
      .required("Обязательное поле")
      .trim()
      .min(3, "От 3 до 20 символов")
      .max(20, "От 3 до 20 символов"),
    password: yup
      .string()
      .required("Обязательно поле")
      .trim()
      .min(6, "Не менее 6 символов"),
    validPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Пароли должны совпадать"),
  });
};

const FormSignup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setAuth } = actions;
  const [error, setError] = useState(false);
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      validPassword: "",
    },
    validationSchema: getValidateSchema(),
    validateOnChange: false,
    onSubmit: ({ username, password }) => {
      axios
        .post("/api/v1/signup", { username, password })
        .then((response) => {
          dispatch(setAuth(response.data));
          navigate("/");
        })
        .catch((e) => {
          console.log(e.response.status);
          if (e.response.status === 409) {
            setError(true);
          }
        });
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit} className="w-50" noValidate>
      <h1 className="text-center mb-4">Войти</h1>

      <Form.Floating className="mb-3">
        <Form.Control
          className={cn({
            "is-invalid": (formik.touched.username && formik.errors.username) || error,
          })}
          type="text"
          name="username"
          id="username"
          placeholder="Имя пользователя"
          onChange={formik.handleChange}
          value={formik.values.username}
          required
        />
        <Form.Label htmlFor="username">Ваш ник</Form.Label>
        <div className="invalid-tooltip">
          {formik.touched.username && formik.errors.username}
        </div>
      </Form.Floating>
      <Form.Floating className="mb-4">
        <Form.Control
          className={cn({
            "is-invalid": (formik.touched.password && formik.errors.password || error),
          })}
          type="password"
          name="password"
          id="password"
          placeholder="Пароль"
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />
        <Form.Label htmlFor="password">Пароль</Form.Label>
        <div className="invalid-tooltip">
          {formik.touched.password && formik.errors.password}
        </div>
      </Form.Floating>
      <Form.Floating className="mb-4">
        <Form.Control
          className={cn({
            "is-invalid":
              (formik.touched.validPassword && formik.errors.validPassword) || error
          })}
          type="password"
          name="validPassword"
          id="validPassword"
          placeholder="Подвердите пароль"
          onChange={formik.handleChange}
          value={formik.values.validPassword}
          required
        />
        {error && (
          <div className="invalid-tooltip">
            Такой пользователь уже существует
          </div>
        )}
        <Form.Label htmlFor="validPassword">Подвердите пароль</Form.Label>
        <div className="invalid-tooltip">
          {formik.touched.validPassword && formik.errors.validPassword}
        </div>
      </Form.Floating>
      <Button type="submit" className="w-100 mb-3" variant="outline-primary">
        Войти
      </Button>
    </Form>
  );
};

export default FormSignup;
