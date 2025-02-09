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
  useSubmit,
  useActionData,
  useNavigation,
  Link,
} from "react-router-dom";
import LoadingIndicator2 from "../ui/LoadingIndicator2";
import { useState } from "react";

const SignIn = () => {
  const submit = useSubmit();
  const errors = useActionData();
  const navigation = useNavigation();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email").trim();
    const password = data.get("password").trim();

    if (email === "") {
      setEmailError(true);
      return;
    }
    if (password === "") {
      setPasswordError(true);
      return;
    }

    submit(data, {
      method: "post",
      action: "/login",
    });
  };

  return (
    <>
      {navigation.state === "submitting" ? <LoadingIndicator2 /> : ""}
      <Container component="main" maxWidth="xs">
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
            Sign in
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value="test@example.com"
              autoFocus
              error={emailError}
              
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value="test12345"
              autoComplete="current-password"
              error={passwordError}
            />
            {errors && <Alert severity="error">{errors.message}</Alert>}
            <Button
              type="submit"
              fullWidth
              disabled={navigation.state === "submitting" ? true : false}
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {navigation.state === "submitting" ? "Loading.." : "Sign In"}
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </>
  );
};
export default SignIn;
