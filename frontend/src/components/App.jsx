import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { actions as authActions } from "../slices/authSlice";
import Root from "./Root";
import Login from "./Auth/Login";
import ErrorPage from "./ErrorPage";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { removeAuth } = authActions;

  const handleUseExit = () => {
    localStorage.removeItem("user");
    dispatch(removeAuth());
    navigate("/login");
  };

  const ExitButton = ({ handleUseExit }) => {
    return (
      <button onClick={handleUseExit} className="btn btn-primary">
        Выйти
      </button>
    );
  };

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Hexlet Chat
          </Link>
          { localStorage.getItem("user") && <ExitButton handleUseExit={handleUseExit} />}
        </div>
      </nav>
      <Routes>
        <Route exact path="/" element={<Root />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
