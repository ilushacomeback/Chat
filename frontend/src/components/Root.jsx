import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Root = () => {
  return (
    <>
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Hexlet Chat
          </Link>
        </div>
      </nav>
      <Outlet />
    </>
  );
};
export default Root;
