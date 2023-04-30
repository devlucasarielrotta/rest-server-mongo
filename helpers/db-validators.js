import { roleModel } from '../models/role.js';
import {usuarioModel , categoriaModel } from '../models/index.js';


const esRoleValido = async (rol= '') => {
    const existeRol = await roleModel.findOne({rol})
    if(!existeRol){
            throw new Error(`El rol ${rol} no está registrado en la BD`)
    }
}

const emailExiste = async(correo = '') => {


    const existeEmail = await usuarioModel.findOne({correo});
    if(existeEmail){
        throw new Error (`El email ${correo} ya esta registrado.`)
    }
}

const existeUsuarioPorId = async( id ) => {
    const existeUsuario = await usuarioModel.findById(id);
    if( !existeUsuario ){
        throw new Error (`El id ${id} no es un id valido.`)
    }
}

const existeCategoriaPorId = async ( id ) => {
    const category  = await categoriaModel.findById(id)
    if( !category ){
        throw new Error (`La categoria ${id} no existe`)
    }
}

export {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId
}