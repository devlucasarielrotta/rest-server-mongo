import { roleModel } from '../models/role.js';
import {usuarioModel , categoriaModel, productoModel } from '../models/index.js';


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

const existeProductoPorId = async ( id ) => {
    const producto  = await productoModel.findById(id)
    if( !producto ){
        throw new Error (`El producto ${id} no existe`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {
    
    if (!colecciones.includes(coleccion)){
        throw new Error(`La coleccion ${coleccion} no esta permitida. Colecciones permitidas, ${colecciones}`)
    };

    return true;
}

export {
    esRoleValido,
    emailExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId,
    coleccionesPermitidas
}