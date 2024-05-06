import * as yup from 'yup';
import cn from 'classnames';
import { useFormik } from 'formik';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { actions } from '../../slices/index';
import { useSignupMutation } from '../../services/authApi';
import routes from '../../routes';

const getValidateSchema = (t) => yup.object().shape({
  username: yup
    .string()
    .required(t('errors.required'))
    .trim()
    .min(3, t('errors.minMax'))
    .max(20, t('errors.minMax')),
  password: yup
    .string()
    .required(t('errors.required'))
    .trim()
    .min(6, t('errors.minPassword')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], t('errors.mismatchPassword')),
});

const FormSignup = () => {
  const [signup] = useSignupMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { setAuth } = actions;
  const [error, setError] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const input = useRef();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: getValidateSchema(t),
    validateOnChange: false,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const response = await signup(values);
        if (response?.error) {
          if (response?.error?.status === 409) {
            throw new Error('notUniqUsername');
          } else {
            throw new Error('disconnect');
          }
        }
        dispatch(setAuth(response.data));
        setLoading(false);
        navigate(routes.homePage());
      } catch (e) {
        console.log(e);
        if (e.message === 'notUniqUsername') {
          setError(true);
        } else {
          toast.error(t('errors.networkError'), { containerId: 'Parent' });
        }
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    input.current.focus();
  }, []);

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="./images/avatar2.jpg" alt={t('registration')} />
              </div>
              <Form onSubmit={formik.handleSubmit} className="w-50" noValidate>
                <h1 className="text-center mb-4">{t('registration')}</h1>
                <Form.Floating className="mb-3">
                  <Form.Control
                    className={cn({
                      'is-invalid':
                        (formik.touched.username && formik.errors.username)
                        || error,
                    })}
                    type="text"
                    name="username"
                    id="username"
                    placeholder={t('registrationPage.username')}
                    onChange={formik.handleChange}
                    value={formik.values.username}
                    ref={input}
                    required
                  />
                  <Form.Label htmlFor="username">
                    {t('registrationPage.username')}
                  </Form.Label>
                  <div className="invalid-tooltip">
                    {formik.touched.username && formik.errors.username}
                  </div>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    className={cn({
                      'is-invalid':
                        (formik.touched.password && formik.errors.password)
                        || error,
                    })}
                    type="password"
                    name="password"
                    id="password"
                    placeholder={t('password')}
                    onChange={formik.handleChange}
                    value={formik.values.password}
                    required
                  />
                  <Form.Label htmlFor="password">{t('password')}</Form.Label>
                  <div className="invalid-tooltip">
                    {formik.touched.password && formik.errors.password}
                  </div>
                </Form.Floating>
                <Form.Floating className="mb-4">
                  <Form.Control
                    className={cn({
                      'is-invalid':
                        (formik.touched.confirmPassword
                          && formik.errors.confirmPassword)
                        || error,
                    })}
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    placeholder={t('registrationPage.confirmPassword')}
                    onChange={formik.handleChange}
                    value={formik.values.confirmPassword}
                    required
                  />
                  {error && (
                    <div className="invalid-tooltip">
                      {t('errors.notUniqUsername')}
                    </div>
                  )}
                  <Form.Label htmlFor="confirmPassword">
                    {t('registrationPage.confirmPassword')}
                  </Form.Label>
                  <div className="invalid-tooltip">
                    {formik.touched.confirmPassword
                      && formik.errors.confirmPassword}
                  </div>
                </Form.Floating>
                <Button
                  type="submit"
                  className="w-100 mb-3"
                  variant="outline-primary"
                  disabled={isLoading}
                >
                  {t('registrationPage.doRegistration')}
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSignup;
