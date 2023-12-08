import { useRouteError } from "react-router-dom";
import Alert from "@mui/material/Alert";
const ErrorPage = () => {
  const error = useRouteError();

  let title = "An error occurred!";
  let message = "Something went Wrong";

  if (error.status === 500) {
    // message = JSON.parse(error.data).message;
    message = error.data.message;
  }

  if (error.status === 404) {
    title = "Page Not found";
    message = "Could not find resource or page.";
  }
  return (
    <>
      <Alert sx={{ alignContent: "center" }} severity="error">
        {title} — {message}
      </Alert>
    </>
  );
};

export default ErrorPage;
