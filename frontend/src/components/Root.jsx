import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { actions as authActions } from "../slices/authSlice";

const Root = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setAuth } = authActions;

  useEffect(() => {
    const authUser = localStorage.getItem("user");
    if (!authUser) {
      navigate("/login");
    } else {
      dispatch(setAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>Залогинился</div>
  );
};
export default Root;
