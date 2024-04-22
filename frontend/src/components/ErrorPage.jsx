import { Link } from "react-router-dom";
const ErrorPage = () => {
  return (
    <div id="error-page">
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <Link to="/">Go Home</Link>
      </p>
    </div>
  );
};
export default ErrorPage;
