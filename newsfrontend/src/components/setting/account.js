import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import { useSubmit, useNavigation } from "react-router-dom";

import { useState } from "react";

export default function Account({ data, actionData }) {
  const submit = useSubmit();
  const navigation = useNavigation();
  const [errors, setErrors] = useState({
    firstName: false,
    email: false,
    cpassword: false,
    password: false,
    retypePassword: false,
  });

  const [passwordError, setPasswordError] = useState("");
  const [cpasswordError, setCPasswordError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formValues = {
      firstName: data.get("firstName"),
      email: data.get("email"),
      cpassword: data.get("cpassword"),
      password: data.get("password"),
      retypePassword: data.get("retypePassword"),
    };

    const newErrors = {
      firstName: formValues.firstName.trim() === "",

      cpassword: formValues.cpassword.trim() === "",
      password: formValues.password.trim() === "",
      retypePassword: formValues.retypePassword.trim() === "",
    };

    if (formValues.cpassword.length < 6) {
      newErrors.cpassword = true;
      setCPasswordError("Password should be at least 6 characters long.");
      console.log("error is set!");
    } else {
      setCPasswordError("");
    }

    if (formValues.password.length < 6) {
      newErrors.password = true;
      setPasswordError("Password should be at least 6 characters long.");
    } else {
      setPasswordError("");
    }

    if (formValues.password !== formValues.retypePassword) {
      newErrors.password = true;
      newErrors.retypePassword = true;
      setPasswordError("Password and Retype Password do not Match");
    } else {
      setPasswordError("");
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }
    submit(
      {
        name: formValues.firstName,
        cpassword: formValues.cpassword,
        password: formValues.password,
      },
      {
        method: "put",
        encType: "application/json",
      }
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Account Detail
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errors.firstName}
                defaultValue={data.name}
                autoComplete="given-name"
                name="firstName"
                required
                fullWidth
                id="firstName"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                name="email"
                autoComplete="email"
                disabled={true}
                value={data.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.cpassword}
                helperText={errors.cpassword ? cpasswordError : ""}
                required
                fullWidth
                name="cpassword"
                label="Current Password"
                type="password"
                id="cpassword"
                autoComplete="Current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.password}
                helperText={errors.password ? passwordError : ""}
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>

            {/* Retype Password Field */}
            <Grid item xs={12}>
              <TextField
                error={errors.retypePassword}
                required
                fullWidth
                name="retypePassword"
                label="Retype password"
                type="password"
                id="retypePassword"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {navigation.state === "submitting" ? "Submitting..." : "Update"}
          </Button>
          {actionData && actionData.success && (
            <Alert severity="success">{actionData.success.data.message}</Alert>
          )}
          {actionData && actionData.error && (
            <Alert severity="error">
              {actionData.error.response.data.error}
            </Alert>
          )}
        </Box>
      </Box>
    </Container>
  );
}
