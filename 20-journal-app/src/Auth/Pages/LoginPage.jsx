import { useMemo } from "react";
import { Google } from "@mui/icons-material";
import { Link as RouterLink } from "react-router";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Link,
  Alert,
} from "@mui/material";
import { AuthLayout } from "../Layout/AuthLayout";
import { useForm } from "../../Hooks";
import { useDispatch, useSelector } from "react-redux";
import {
  starLoginWithEmailPassword,
  startGoogleSignIn,
} from "../../Store/Auth";

const formData = {
  email: "",
  password: "",
};

export const LoginPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const { email, password, onInputChange } = useForm(formData);

  const isAuthenticating = useMemo(() => status === "checking", [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(starLoginWithEmailPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    console.log("onGoogleSignIn");
    dispatch(startGoogleSignIn());
  };

  return (
    <AuthLayout title="Login">
      <Box
        className="animate__animated animate__fadeIn animate__faster"
        onSubmit={onSubmit}
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column", // Column en móvil, fila en grande
          gap: 2, // Espaciado entre los campos
        }}
      >
        <TextField
          id="email"
          label="Email"
          type="email"
          placeholder="correo@gmail.com"
          size="medium"
          name="email"
          value={email}
          onChange={onInputChange}
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          placeholder="password"
          size="medium"
          name="password"
          value={password}
          onChange={onInputChange}
        />

        <Box
          component="section"
          sx={{
            gap: 2,
            mb: 2,
            mt: 2,
          }}
          display={!!errorMessage ? "" : "none"}
        >
          <Alert severity="error">{errorMessage}</Alert>
        </Box>

        <Box
          component="section"
          sx={{
            gap: 2,
            mb: 2,
            mt: 2,
          }}
        >
          <Box
            component="section"
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
            gap={2}
          >
            <Button
              variant="contained"
              size="medium"
              sx={{
                width: {
                  xs: "100%",
                  md: 120,
                },
              }}
              type="submit"
              disabled={isAuthenticating}
            >
              Login
            </Button>

            <Button
              variant="contained"
              size="medium"
              sx={{
                width: {
                  xs: "100%",
                  md: 120,
                },
              }}
              onClick={onGoogleSignIn}
              disabled={isAuthenticating}
            >
              <Google />
              <Typography sx={{ ml: 1 }}>Google</Typography>
            </Button>
          </Box>

          <Container
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
            <Link component={RouterLink} to="/auth/register" color="info">
              Crear una cuenta
            </Link>
          </Container>
        </Box>
      </Box>
    </AuthLayout>
  );
};
