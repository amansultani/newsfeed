import * as React from "react";
import Alert from "@mui/material/Alert";

export default function Error(props) {
  return (
    <Alert severity="error">
      {props.error.response.status} - {props.error.response.statusText}
    </Alert>
  );
}
