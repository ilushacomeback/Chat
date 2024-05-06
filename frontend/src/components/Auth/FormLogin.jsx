import cn from "classnames";
import { useFormik } from "formik";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { actions } from "../../slices/index";
import { useGetAuthMutation } from "../../services/authApi";
import { useGetChannelsQuery } from "../../services/channelsApi";
import { useGetMessagesQuery } from "../../services/messagesApi";
import routes from "../../routes";

const FormLogin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [getAuth] = useGetAuthMutation();
  const { refetch: refetchChannels } = useGetChannelsQuery();
  const { refetch: refetchMessages } = useGetMessagesQuery();
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const input = useRef();
  const { setAuth } = actions;

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await getAuth(values);
        if (response?.error) {
          if (response?.error?.status === 401) {
            throw new Error("invalidLogin");
          } else {
            throw new Error("disconnect");
          }
        }
        dispatch(setAuth(response.data));
        await refetchChannels();
        await refetchMessages();
        setError(false);
        setLoading(false);
        navigate(routes.homePage());
      } catch (e) {
        console.log(e);
        if (e.message === "invalidLogin") {
          setError(true);
        } else {
          toast.error(t("errors.networkError"), { containerId: "Parent" });
        }
        setLoading(false);
      }
    },
  });

  const classesForFormControl = cn({
    "is-invalid": error,
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <Form
      onSubmit={formik.handleSubmit}
      className="col-12 col-md-6 mt-3 mt-mb-0"
    >
      <h1 className="text-center mb-4">{t("login")}</h1>
      <Form.Floating className="mb-3">
        <Form.Control
          className={classesForFormControl}
          type="text"
          name="username"
          id="username"
          placeholder={t("loginPage.username")}
          onChange={formik.handleChange}
          value={formik.values.username}
          ref={input}
          required
        />
        <label htmlFor="username">{t("loginPage.username")}</label>
      </Form.Floating>
      <Form.Floating className="mb-4">
        <Form.Control
          className={classesForFormControl}
          type="password"
          name="password"
          id="password"
          placeholder={t("password")}
          onChange={formik.handleChange}
          value={formik.values.password}
          required
        />
        <Form.Label htmlFor="password">{t("password")}</Form.Label>
        {error && (
          <div className="invalid-tooltip">{t("errors.invalidLogin")}</div>
        )}
      </Form.Floating>
      <Button
        type="submit"
        className="w-100 mb-3"
        variant="outline-primary"
        disabled={isLoading}
      >
        {t("login")}
      </Button>
    </Form>
  );
};
export default FormLogin;
