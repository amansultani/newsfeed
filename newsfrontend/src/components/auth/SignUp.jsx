import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import {
  Link,
  useSubmit,
  useNavigation,
  useActionData,
} from "react-router-dom";
import { useState } from "react";
import LoadingIndicator2 from "../ui/LoadingIndicator2";

export default function SignUp() {
  const submit = useSubmit();
  const actionError = useActionData();
  const navigation = useNavigation();
  const [passwordError, setPasswordError] = useState("");
  const [retypePasswordError, setRetypePasswordError] = useState("");
  const [errors, setErrors] = useState({
    fullName: false,
    email: false,
    password: false,
    retypePassword: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formValues = {
      fullName: data.get("fullName"),
      email: data.get("email"),
      password: data.get("password"),
      retypePassword: data.get("retypePassword"),
    };

    const newErrors = {
      fullName: formValues.fullName.trim() === "",
      email: formValues.email.trim() === "",
      password: formValues.password.trim() === "",
      retypePassword: formValues.retypePassword.trim() === "",
    };

    if (formValues.password.length < 6) {
      newErrors.password = true;
      setPasswordError("Password should be at least 6 characters long.");
    } else {
      setPasswordError("");
    }

    if (formValues.password !== formValues.retypePassword) {
      newErrors.password = true;
      newErrors.retypePassword = true;
      setRetypePasswordError("Password and Retype Password do not Match");
    } else {
      setRetypePasswordError("");
    }

    setErrors(newErrors);

    if (Object.values(newErrors).some((error) => error)) {
      return;
    }

    submit(
      {
        name: formValues.fullName,
        email: formValues.email,
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
      {navigation.state === "submitting" ? <LoadingIndicator2 /> : ""}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                error={errors.fullName}
                autoComplete="given-name"
                name="fullName"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.email}
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
            <Grid item xs={12}>
              <TextField
                error={errors.retypePassword}
                helperText={errors.retypePassword ? retypePasswordError : ""}
                required
                fullWidth
                name="retypePassword"
                label="Retype Password"
                type="password"
                id="retypePassword"
                autoComplete="new-password"
              />
            </Grid>
          </Grid>
          {actionError && <Alert severity="error">{actionError.message}</Alert>}
          <Button
            disabled={navigation.state === "submitting" ? true : false}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {navigation.state === "submitting" ? "Loading.." : "Sign Up"}
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link to="/login">Already have an account? Sign in</Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
