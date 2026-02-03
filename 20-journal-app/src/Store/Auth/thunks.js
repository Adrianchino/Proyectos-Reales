import { loginWithEmailPassword, logoutFireBase, registerUserWithEmailPassword, singInWithGoogle } from "../../Firebase/providers";
import { clearNotesLogout } from "../Journal";
import { checkingCredentials, login, logout } from "./";

export const checkingAuthentication = (email, password) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await singInWithGoogle();

    if ( !result.ok ) return dispatch( logout( result.errorMessage ) );

		dispatch( login( result ) )
  };
};


export const starCreatingUserWithEmailPassword = ({ email, password, displayName }) => {
  return async ( dispatch ) => {

    dispatch( checkingCredentials() );

    const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({ email, password, displayName });
   
    if ( !ok ) return dispatch( logout({errorMessage}) )

    dispatch( login( { uid, displayName, email, photoURL } ) )
  }
}


export const starLoginWithEmailPassword = ({ email, password }) => {
  return async ( dispatch ) => {
    dispatch( checkingCredentials() );

    const result = await loginWithEmailPassword({ email, password })
    console.log(result);

    if ( !result.ok ) return dispatch( logout( result ) );

		dispatch( login( result ) ) 
  }
}


export const startLogout = () => {

  return async(dispatch) => {

    await logoutFireBase();
    dispatch( clearNotesLogout() )
    dispatch( logout() );

  }

}