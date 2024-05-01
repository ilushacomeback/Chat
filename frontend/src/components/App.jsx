import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectors } from "../selectors";
// import { useGetAuthMutation } from "../services/authApi";
// import axios from "axios";
// import getAuth from "../utils/getAuth";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ErrorPage from "./ErrorPage";
import Navbar from "./Navbar";
import ChatBox from "./Chat/ChatBox";

const App = () => {
  // const checkAuthUser = async (token) => {
  //   try {
  //     const res = await getAuth(axios, token);
  //     console.log(res);
  //     return true;
  //   } catch (e) {
  //     console.log(e);
  //     return false;
  //   }
  // };

  const PrivateChat = () => {
    // const [func, { isLoading, data }] = useGetAuthMutation()
    // console.log(isLoading, data)
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
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
};

export default App;
