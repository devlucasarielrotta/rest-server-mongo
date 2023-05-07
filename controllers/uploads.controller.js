import {request, response} from 'express';
import dotenv from 'dotenv'
import {v2} from 'cloudinary';
import path from 'path';
import {__dirname} from '../utils.js';
import {subirArchivo} from '../helpers/subir-archivo.js';

import {usuarioModel, productoModel} from '../models/index.js';
import {existsSync, unlinkSync} from 'fs';
dotenv.config();
v2.config({
  cloud_name:process.env.CLOUDINARY_URL,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET
});
console.log(process.env.CLOUDINARY_URL,process.env.CLOUDINARY_API_KEY,process.env.CLOUDINARY_API_SECRET)
const cargarArchivo = async (req, res = response) => {
  try {
    const nombre = await subirArchivo(req.files, undefined, 'imgs');
    res.json({
      nombre,
    });
  } catch (error) {
    res.status(400).json({msg: 'Bad request'});
  }
};

const actualizarImagen = async (req, res = response) => {
  const {id, coleccion} = req.params;

  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await usuarioModel.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con id ${id}`,
        });
      }

      break;

    case 'productos':
      modelo = await productoModel.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({msg: 'Se me olvido validar esto'});
  }

  // limpiar imagenes previas

  try {
    if (modelo.img) {
      const pathImagen = path.join(__dirname, './uploads', coleccion, `${modelo.img}`);

      if (existsSync(pathImagen)) {
        //borramos la imagen
        unlinkSync(pathImagen);
      }
    }
  } catch (error) {
    return 'error', error;
  }

  const nombre = await subirArchivo(req.files, undefined, coleccion);
  modelo.img = nombre;
  await modelo.save();

  res.json(modelo);
};

const actualizarImagenCloudinary = async (req, res = response) => {
  const {id, coleccion} = req.params;

  let modelo;

  switch (coleccion) {
    case 'usuarios':
      modelo = await usuarioModel.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el usuario con id ${id}`,
        });
      }

      break;

    case 'productos':
      modelo = await productoModel.findById(id);
      if (!modelo) {
        return res.status(400).json({
          msg: `No existe el producto con id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({msg: 'Se me olvido validar esto'});
  }

  // limpiar imagenes previas
 
  try {

    if (modelo.img) {
      
      const nombreArr = modelo.img.split('/');
      const nombre = nombreArr[ nombreArr.length - 1 ];
      const [public_id] = nombre.split('.');    
      
      await v2.uploader.destroy(public_id);
    }
  } catch (error) {
    return 'error', error;
  }
 
 
  const {tempFilePath} = req.files.archivo;
  const {secure_url} = await v2.uploader.upload(tempFilePath)
  
  modelo.img = secure_url;
  await modelo.save();
   res.json({modelo})
 
};

const mostrarImagen = async (req, res = response) => {
  const {id, coleccion} = req.params;

  let modelo;
  switch (coleccion) {
    case 'usuarios':
      modelo = await usuarioModel.findById(id);

      if (!modelo) {
        // se puede retornar que la imagen no se pudo mostrar directamente aca
        return res.status(400).json({
          msg: `No existe el usuario con id ${id}`,
        });
      }

      break;

    case 'productos':
      modelo = await productoModel.findById(id);
      if (!modelo) {
        // se puede retornar que la imagen no se pudo mostrar directamente aca
        return res.status(400).json({
          msg: `No existe el producto con id ${id}`,
        });
      }
      break;

    default:
      return res.status(500).json({msg: 'Se me olvido validar esto'});
  }

  try {
    let pathImagen = path.join(__dirname, './uploads', coleccion, `${modelo.img}`);
    if (modelo.img) {
      if (existsSync(pathImagen)) {
        return res.sendFile(pathImagen);
      }
    } else {
      pathImagen = path.join(__dirname, './assets', 'noImage.png');
      return res.sendFile(pathImagen);
    }
  } catch (error) {
    return 'error', error;
  }

  res.json(modelo);
};

export {cargarArchivo, actualizarImagen, mostrarImagen, actualizarImagenCloudinary};
