import { BrowserRouter, Routes, Route } from "react-router-dom";
import Root from "./components/Root";
import Login from "./components/Login";
import ErrorPage from "./components/ErrorPage";

const App = () => {
  return (
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route exact path="/" element={<Root />}>
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
