import {request,response} from 'express';
import mongoose from 'mongoose';
import {categoriaModel,productoModel,usuarioModel} from '../models/index.js'

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'productos-categoria',
    'roles',
    'usuarios',
]

const buscarUsuarios = async (termino = '', res = response) => {
    
    const mongoID = mongoose.isValidObjectId( termino );
    if( mongoID ){
        
        const usuario = await usuarioModel.findById(termino);
        return res.json({results: [usuario]})
    }
    
    const regex = new RegExp(termino,'i');

    const usuarios = await usuarioModel.find({
        $or: [{nombre: regex},{correo:regex}],
        $and: [{estado:true}]
    })

    return res.json({results: [usuarios]})
   

}

const buscarCategorias = async (termino = '', res = response) => {
    
    const mongoID = mongoose.isValidObjectId( termino );
    if( mongoID ){
        
        const categoria = await categoriaModel.findById(termino);
        return res.json({results: [categoria]})
    }
    
    const regex = new RegExp(termino,'i');

    const categorias = await categoriaModel.find({nombre:regex,estado:true})

    return res.json({results: [categorias]})
   

}

const buscarProductos = async (termino = '', res = response) => {
    
    const mongoID = mongoose.isValidObjectId( termino );
    if( mongoID ){
        
        const producto = await productoModel.findById(termino).populate('categoria','nombre');
        return res.json({results: [producto]})
    }
    
    const regex = new RegExp(termino,'i');


    const productos = await productoModel.find({nombre:regex,estado:true})
                            .populate('categoria','nombre')
    

    return res.json({results: [productos]})
   

}

const buscarProductosPorCategoria = async (termino = '', res = response) => {
    
    const mongoID = mongoose.isValidObjectId( termino );
    if( mongoID ){
        
        const producto = await productoModel.findById(termino).populate('categoria','nombre');
        return res.json({results: [producto]})
    }
    
    const regex = new RegExp(termino,'i');

    const categorias = await categoriaModel.find({nombre:regex,estado:true});


    if(!categorias.length){
        return res.status('400').json({
            msg:`No hay resultados para ${termino}`
        })
    }
    
    const {_id} = categorias[0];

    const productos = await productoModel.find({
        categoria: _id
    })


    return res.json({results: [productos]})
   

}

const buscar = (req,res) => {

    const {coleccion,termino} = req.params;
    
    if( !coleccionesPermitidas.includes(coleccion) ){
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion){
        case 'usuarios':
            buscarUsuarios(termino,res)
            break;

        case 'categorias':
            buscarCategorias(termino,res)
            break;

        case 'productos':
            buscarProductos(termino,res)
            break;

        case 'productos-categoria':
            buscarProductosPorCategoria(termino,res)
            break;

        default:
            res.status(500).json({
                msg:'Se le olvido de hacer esta búsqueda'
            })
    }

}

export {buscar}