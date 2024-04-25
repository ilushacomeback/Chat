import { Navbar as BootNavbar, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectors } from "../selectors";
import { actions as authActions } from "../slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { removeAuth } = authActions
  const token = useSelector(selectors.token)
  const logout = () => dispatch(removeAuth())

  return (
    <BootNavbar bg="white" expand="lg" className="shadow-sm">
      <div className="container">
        <BootNavbar.Brand as={Link} to="/">
          Hexlet Chat
        </BootNavbar.Brand>
        {!!token && <Button onClick={logout}>Выйти</Button>}
      </div>
    </BootNavbar>
  );
};

export default Navbar;
