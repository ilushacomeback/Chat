import FormSignup from "./FormSignup";
import { useTranslation } from "react-i18next";

const Signup = () => {
  const { t } = useTranslation();
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src="./images/avatar2.jpg" alt={t("registration")} />
              </div>
              <FormSignup />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
