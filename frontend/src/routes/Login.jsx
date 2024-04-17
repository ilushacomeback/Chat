import { Formik, Field, Form } from "formik";

const Login = () => {
  return (
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log("send", values);
      }}
    >
      {() => (
        <Form>
          <div className="form-floating mb-3">
            <label htmlFor="username">Ваш ник</label>
            <Field type="text" name="username" className='form-control' placeholder='Ваш ник' />
          </div>
          <div className="form-floating mb-4">
            <label htmlFor="password">Пароль</label>
            <Field type="password" name="password" className='form-control' placeholder='Пароль' />
          </div>
          <button type="submit">Войти</button>
        </Form>
      )}
    </Formik>
  );
};
export default Login;
