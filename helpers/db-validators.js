import { roleModel } from '../models/role.js';
import { modelSchema } from '../models/usuario.js';


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

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await modelSchema.findById(id);
    if( !existeUsuario ){
        throw new Error (`El id ${id} no es un id valido.`)
    }
}

export {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId
}