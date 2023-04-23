import {response, request} from 'express';
import {modelSchema as Usuario} from '../models/usuario.js';

import bcryptjs from 'bcryptjs';

const usuariosGet = async (req = request, res = response) => {
  //const {q, nombre = 'No name', apikey, page = 1, limit= 10} = req.query;
  const {limite = 5, desde = 0} = req.query;

  // const query = {estado:true};
//   const usuarios = await Usuario.find({estado:true})
//         .skip(Number(desde))
//         .limit(Number(limite))
//         ;
//   const total = await Usuario.countDocuments({estado:true});

  const [ total,usuarios ] = await Promise.all([
    Usuario.countDocuments({estado:true}),
    Usuario.find({estado:true})
        .skip(Number(desde))
        .limit(Number(limite))
  ]);

  res.json({
        total,
        usuarios
    });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto} = req.body;
  //TODO validar contra base de datos

  if (password) {
    // encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const usuario = await Usuario.findByIdAndUpdate(id,resto);

  res.status(200).json({
    ok: true,
    msg: 'put API - controlador',
    usuario
  });
};

const usuariosPost = async (req, res = response) => {
  const {nombre, correo, password, rol} = req.body;
  const usuario = new Usuario({nombre, correo, password, rol});

  // encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //guardar en DB
  try {
    await usuario.save();
  } catch (error) {
    console.log(error);
  }

  res.status(201).json({
    ok: true,
    msg: 'post API - controlador',
    usuario,
  });
};

const usuariosDelete = async (req, res = response) => {

  const {id} = req.params;
  // borrar fisicamente
  // await Usuario.findBIdAndDelete(id);
  await Usuario.findByIdAndUpdate(id, {estado:false});
  

  const mensaje = 'Id eliminado correctamente'  
  res.json({
    id,
    mensaje
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    ok: true,
    msg: 'patch API - controlador',
  });
};

export {usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch};
