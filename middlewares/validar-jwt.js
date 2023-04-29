import { request, response } from 'express';
import jwt from 'jsonwebtoken';
import { modelSchema } from '../models/usuario.js';

const validarJWT = async (req = request ,res = response, next) => {
    
    const token = req.header('x-token')
    if(!token){
        return res.status(401).json({
            msg:'No hay token en la peticion'
        })
    }

    try{

       // const payload = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);
        
        // leer el usuario que correspondeal uid;

        const usuario = await modelSchema.findById(uid);

        if( !usuario ) {


            return res.status(401).json({
                msg:'Token no válido - usuario inexistente'
            })
        }

        //verificar si el usuario esta habilitado
        if( !usuario.estado ){
            return res.status(401).json({
                msg:'Token no valido - usuario dado de baja'
            })
        }

        req.usuario = usuario;
        next();
        
    }catch(error){
        console.log(error);
        res.status(401).json({
            msg:'Token no valido'
        })
    }
}

export {
    validarJWT
}