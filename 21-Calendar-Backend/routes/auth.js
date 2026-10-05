
/* 
	Rutas de Usuarios / Auth
	host * /api/auth

*/

import { Router } from "express";
import { check } from "express-validator";
import { crearUsuario, loginUsuario,  revalidarToken } from "../Controllers/auth.js";
import { validarCampos } from "../Middlewares/validar-campos.js";
import { validarjwt } from "../Middlewares/validar-jwt.js";



const router = Router();


router.post(
	"/new",
	 [ // middlewares
			check('name', 'El nombre es obligatorio').not().isEmpty(),
			check('email', 'El email es obligatorio').isEmail(),
			check('password', 'El password debe contener 6 caracteres').isLength({min:6}),
			validarCampos
	 ],
		crearUsuario);

router.post(
	"/",
	[ // middlewares
		check('email', 'El email introducido es incorrecto').isEmail(),
		check('password', 'El password introducido es incorrecto').isLength({min:6}),
		validarCampos
	],
	loginUsuario);

router.get("/renew", validarjwt, revalidarToken);


// module.exports = router;
export { router };