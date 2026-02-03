
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
import { useMemo, useState } from "react";
import { useFormState } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { starCreatingUserWithEmailPassword } from "../../Store/Auth";


const formData = {
  email: '',
  password: '',
  displayName: ''
}

const formValidations = {
  email: [ (value) => value.includes('@') , 'El correo debe de tener una @'],
  password: [ (value) => value.length >= 6 , 'El password debe de tener mas de 6 letras'],
  displayName: [ (value) => value.length >= 1 , 'El nombre es obligatorio'],
}


export const RegisterPage = () => {

  const dispatch = useDispatch();
  
  const [formSubmitted, setformSubmitted] = useState(false)

  const { status, errorMessage } = useSelector( state => state.auth )
  const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );
  
  const { displayName, email, password, onInputChange, formState, 
          isFormValid, displayNameValid, emailValid, passwordValid,
  } = useForm(formData, formValidations);

  const onSubmit = ( event ) => {
    event.preventDefault();
    setformSubmitted(true);

    if ( !isFormValid ) return;

    dispatch( starCreatingUserWithEmailPassword(formState) );
  }
  
  return (
    <AuthLayout title="Crear Cuenta">

    
      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column", // Column en móvil, fila en grande
          gap: 2, // Espaciado entre los campos
        }}
        onSubmit={ onSubmit }
        className="animate__animated animate__fadeIn animate__faster"
      >
        <TextField
          id="nombre"
          label="Nombre Completo"
          type="text"
          placeholder="Nombre"
          size="medium"
          name="displayName"
          value={ displayName }
          onChange={ onInputChange }
          error={ !!displayNameValid && formSubmitted }
          helperText={ displayNameValid }
        />

        <TextField
          id="email"
          label="Email"
          type="email"
          placeholder="correo@gmail.com"
          size="medium"
          name="email"
          value={ email }
          onChange={ onInputChange }
          error={ !!emailValid && formSubmitted }
          helperText={ emailValid }
        />

        <TextField
          id="password"
          label="Password"
          type="password"
          placeholder="password"
          size="medium"
          name="password"
          value={ password }
          onChange={ onInputChange }
          error={ !!passwordValid && formSubmitted }
          helperText={ passwordValid }
        />

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
              justifyContent: "center",
              mb: 3,
            }}
            gap={2}
            display={ !!errorMessage ? '' : 'none' }
            
          >
            <Alert severity= 'error'>
              { errorMessage }
            </Alert>
          </Box>
          
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
              disabled= { isCheckingAuthentication }
              variant="contained"
              size="medium"
              sx={{
                width: {
                  xs: "100%",
                  md: 150,
                },
              }}
              type="submit"
            >
              Crear Cuenta
            </Button>

          </Box>

          <Container
            sx={{
              display: "flex",
              justifyContent: "end",
            }}
          >
						<Typography sx={{ mr:1 }}>¿Ya tienes cuenta?</Typography>
            <Link component={RouterLink} to="/auth/login" color="info">
              Ingresar
            </Link>
          </Container>
        </Box>
      </Box>
    </AuthLayout>
  );
};
