import { response } from "express";
import { Usuario } from "../Models/Usuario.js";
import bcrypt from "bcryptjs";
import { generarJWT } from "../Helpers/jwt.js";



const crearUsuario = async(req, res = response) => {
	const { name, email, password } = req.body;


	try {		

		let usuario = await Usuario.findOne({ email })
		if ( usuario ) {
			return res.status(400).json({
				ok:false,
				msg: 'Un usuario existe con ese correo'
			});
		}

		
		usuario = new Usuario( req.body )

		//Encriptar contraseña
		const salt = bcrypt.genSaltSync();
		usuario.password = bcrypt.hashSync(password, salt)
	
		await usuario.save();

		//Generar JWT
		const token = await generarJWT(usuario.id, usuario.name)
	
		res.status(201).json({
			ok:true,
			uid: usuario.id,
			name: usuario.name,
			token
			
		})

	} catch (error) {
		res.status(500).json({
			ok:false,
			msg:'Porfavor Hable con el Administrador'
		})
	}
}

const loginUsuario =  async(req, res = response) => {
	
	const { email, password } = (req.body);

	try {

		let usuario = await Usuario.findOne({ email })
		if (! usuario ) {
			return res.status(400).json({
				ok:false,
				msg: 'El usuario no existe con ese email'
			});
		}

		// Confirmar los password
		const validPassword = bcrypt.compareSync( password, usuario.password )

		if( !validPassword ) {
			return res.status(400).json({
				ok: false,
				msg: 'Password Incorrecto'
			});
		}

		//Generar JWT
		const token = await generarJWT(usuario.id, usuario.name)

		// Generar Nuestro JWT
		res.json({
			ok: true,
			uid: usuario.id,
			name: usuario.name,
			token
		})

		
	} catch (error) {
		res.status(500).json({
			ok:false,
			msg:'Porfavor Hable con el Administrador'
		})
	}
}

const revalidarToken = async(req, res = response) => {


	const uid = req.uid
	const name = req.name

	//Generar JWT
	const token = await generarJWT(uid, name)

	res.json({
		ok:true,
		uid,
		name,
		token

	})
}








export { crearUsuario, loginUsuario,  revalidarToken }