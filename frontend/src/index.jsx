import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals.js";
import "react-toastify/dist/ReactToastify.css";
import "./assets/App.scss";
import init from "./init.js";

const app = async () => {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  const vdom = await init();
  root.render(vdom);
};

app();

reportWebVitals();
