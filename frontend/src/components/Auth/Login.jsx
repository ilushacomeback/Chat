import FormLogin from "./FormLogin";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="./images/avatar1.jpg" alt={t("login")} />
              </div>
              <FormLogin />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span className="m-1">{t("loginPage.notAcc")}</span>
                <a href="/signup">{t("registration")}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
