import { response } from "express";
import bcryptjs from 'bcryptjs';

import { modelSchema as Usuario } from "../models/usuario.js";
import { generarJWT } from '../helpers/generar-jwt.js';


const login = async (req,res = response) => {

    const {correo,password}  = req.body;
    
    try {
        // verificar si el email existe
        const usuario = await Usuario.findOne({correo});
        if (!usuario){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - correo'
            })
        }

        //verificar si el usuario esta activo
        if (!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado:false'
            })
        }

        // verificar la contraseña
        const validarPassword = bcryptjs.compareSync(password,usuario.password)
        if(!validarPassword){
            return res.status(400).json({
                msg: 'Usuario / password no son correctos - estado:password'
            })
        }

        // generar el JWT
        
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })
        
    }catch(error){
        console.log(error)
        return res.status(500).json({
            msg:'Error al loguearse'
        })
    }
  
}

export {login}