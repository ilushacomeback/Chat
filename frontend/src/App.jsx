import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { actions as authActions } from "./slices/authSlice";
import Root from "./components/Root";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";
import ExitButton from "./components/ExitButton";

const App = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const isAuth = useSelector((state) => state.authReducer.auth);
  const { removeAuth } = authActions;

  const handleUseExit = () => {
    localStorage.removeItem("user");
    dispatch(removeAuth());
    navigate("/login");
  };

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <Link to="/" className="navbar-brand">
            Hexlet Chat
          </Link>
          {isAuth ? <ExitButton handleUseExit={handleUseExit} /> : null}
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
