import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectors } from "../selectors";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ErrorPage from "./ErrorPage";
import Navbar from "./Navbar";
import ChatBox from "./Chat/ChatBox";

const App = () => {
  const PrivateChat = () => {
    const token = useSelector(selectors.token);
    return token ? <Outlet /> : <Navigate to="/login" />;
  };

  return (
    <div className="d-flex flex-column h-100">
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route exact path="/" element={<PrivateChat />}>
          <Route path="" element={<ChatBox />} />
        </Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
