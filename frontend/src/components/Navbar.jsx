import { Navbar as BootNavbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import selectors from "../selectors";
import { actions as authActions } from "../slices/authSlice";
import routes from "../routes";

const Navbar = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { removeAuth } = authActions;
  const token = useSelector(selectors.token);
  const logout = () => dispatch(removeAuth());

  return (
    <BootNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootNavbar.Brand as={Link} to={routes.homePage()}>
          {t("homePage")}
        </BootNavbar.Brand>
        {!!token && <Button onClick={logout}>{t("exit")}</Button>}
      </div>
    </BootNavbar>
  );
};

export default Navbar;
