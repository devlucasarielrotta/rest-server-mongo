import { roleModel } from '../models/role.js';
import { modelSchema } from '../models/usuario.js';
import {check} from 'express-validator'

const esRoleValido = async (rol= '') => {
    const existeRol = await roleModel.findOne({rol})
    if(!existeRol){
            throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async(correo = '') => {


    const existeEmail = await modelSchema.findOne({correo});
    if(existeEmail){
        throw new Error (`El email ${correo} ya esta registrado.`)
    }
}


export {
    esRoleValido,
    emailExiste
}