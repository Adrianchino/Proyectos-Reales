import { Router } from "express";
import { check } from "express-validator";

import { isDate } from "../Helpers/isDate.js";
import { validarCampos } from "../Middlewares/validar-campos.js"
import { validarjwt } from "../Middlewares/validar-jwt.js";
import { getEventos, crearEvento, actualizarEvento, borrarEvento } from "../Controllers/events.js";

const router = Router();

// Todas tienen que pasar por la validacion del JWT
router.use( validarjwt );

// Obtener eventos
router.get('/', getEventos)

// Obtener eventos
router.post(
	'/',
	[
			check('title', 'El titulo es obligatorio').not().isEmpty(),
			check('start', 'Fecha de inicio es obligatorio').custom(isDate),
			check('end', 'Fecha de Finalizacion es obligatorio').custom(isDate),
			validarCampos
	],
	crearEvento)

// Actualizar eventos
router.put('/:id', actualizarEvento)

// Borrar evento
router.delete('/:id', borrarEvento)

export {
	router
};
