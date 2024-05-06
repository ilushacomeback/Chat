import {
  Routes,
  Route,
  Navigate,
  Outlet,
  BrowserRouter,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import selectors from "../selectors";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ErrorPage from "./ErrorPage";
import Navbar from "./Navbar";
import ChatBox from "./Chat/ChatBox";
import routes from "../routes";

const App = () => {
  const PrivateChat = () => {
    const token = useSelector(selectors.token);
    return token ? <Outlet /> : <Navigate to={routes.loginPage()} />;
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route exact path="/" element={<PrivateChat />}>
            <Route path="" element={<ChatBox />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <ToastContainer containerId="Parent" />
    </BrowserRouter>
  );
};

export default App;
