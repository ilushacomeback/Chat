import { useState, useRef, useEffect, useContext } from 'react';
import cn from 'classnames';
import { useFormik } from 'formik';
import { Form, Button, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetAuthMutation } from '../../services/authApi';
import { useGetChannelsQuery } from '../../services/channelsApi';
import { useGetMessagesQuery } from '../../services/messagesApi';
import routes from '../../routes';
import AuthContext from '../../context/AuthContext';

const FormLogin = () => {
  const { logIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [getAuth] = useGetAuthMutation();
  const { refetch: refetchChannels } = useGetChannelsQuery();
  const { refetch: refetchMessages } = useGetMessagesQuery();
  const [error, setError] = useState(false);
  const input = useRef();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const response = await getAuth(values);
        if (response?.error) {
          if (response?.error?.status === 401) {
            throw new Error('invalidLogin');
          } else {
            throw new Error('disconnect');
          }
        }
        logIn(response.data);
        await refetchChannels();
        await refetchMessages();
        setError(false);
        navigate(routes.homePage());
      } catch (e) {
        console.log(e);
        if (e.message === 'invalidLogin') {
          setError(true);
        } else {
          toast.error(t('errors.networkError'), { containerId: 'Parent' });
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const classesForFormControl = cn({
    'is-invalid': error,
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  return formik.isSubmitting ? (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <Spinner animation="border" role="status" variant="primary">
        <span className="visually-hidden">{t('loading')}</span>
      </Spinner>
    </div>
  ) : (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="./images/avatar1.jpg" alt={t('login')} />
              </div>
              <Form
                onSubmit={formik.handleSubmit}
                className="col-12 col-md-6 mt-3 mt-mb-0"
              >
                <h1 className="text-center mb-4">{t('login')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    className={classesForFormControl}
                    type="text"
                    name="username"
                    id="username"
                    placeholder={t('loginPage.username')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={input}
                    required
                  />
                  <label htmlFor="username">{t('loginPage.username')}</label>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    className={classesForFormControl}
                    type="password"
                    name="password"
                    id="password"
                    placeholder={t('password')}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required
                  />
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  {error && (
                    <div className="invalid-tooltip">
                      {t('errors.invalidLogin')}
                    </div>
                  )}
                </Form.Floating>
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                  disabled={formik.isSubmitting}
                >
                  {t('login')}
                </Button>
              </Form>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span className="m-1">{t('loginPage.notAcc')}</span>
                <a href="/signup">{t('registration')}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FormLogin;
