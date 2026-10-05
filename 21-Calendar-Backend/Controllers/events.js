import { response } from "express";
import  { Usuario }  from "../Models/Evento.js"

export const getEventos = async (req, res = response) => {

  const eventos = await Usuario.find()
                               .populate("user", "name");


  res.json({
    ok: true,
    eventos
  });
};

export const crearEvento = async (req, res = response) => {

  // Verificar que tenga el evento
  const usuario = new Usuario( req.body );

  try {

    usuario.user = req.uid;
    
    const eventoDB =  await usuario.save()

    res.json({
      ok: true,
      evento: eventoDB,

    })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    })
  }
  
};

export const actualizarEvento = async (req, res = response) => {

  const eventoId = req.params.id;
  const uid = req.uid;

  try {

    const evento = await Usuario.findById( eventoId );

    if ( !evento ) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por Id"
      })
    }

    if ( evento.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permiso para editar este evento"
      })
    }

    const nuevoEvento = {
      ...req.body,
      user: uid
    }

    const eventoActualizado = await Usuario.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );

    res.json({
      ok: true,
      evento: eventoActualizado
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    })
  }
};

export const borrarEvento = async (req, res = response) => {

 const eventoId = req.params.id;
  const uid = req.uid;

  try {

    const evento = await Usuario.findById( eventoId );

    if ( !evento ) {
      return res.status(404).json({
        ok: false,
        msg: "Evento no existe por Id"
      })
    }

    if ( evento.user.toString() !== uid ) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene permiso para eliminar este evento"
      })
    }

   await Usuario.findByIdAndDelete( eventoId );

    res.json({
      ok: true,
    })
    
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador"
    })
  }
};