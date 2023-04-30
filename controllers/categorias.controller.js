import {request, response} from 'express';
import {categoriaModel} from '../models/index.js';

//obtenerCategorias - paginado - total - populate 
const obtenerCategorias = async (req,res = response) => {

    const { limite = 5 , desde = 0} = req.query;
    const query = {estado:true};

    const [total,categorias] = await Promise.all([
       categoriaModel.countDocuments(query),
       categoriaModel.find(query)
         .populate('usuario','nombre')
         .skip(Number( desde ))
         .limit(Number( limite ))
    ])

    res.json({
        total,
        categorias
    })
}

//obtenerCateogria - populate {} 
const obtenerCategoria = async ( req,res = response) => {
    const { id } = req.params;
    const categoria = await categoriaModel.findById( id ).populate('usuario','nombre');
    res.json( {categoria} )

}

const crearCategoria = async (req, res = response) => {
  try {
    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await categoriaModel.findOne({nombre});

    if ( categoriaDB ) {
      return res.status(400).json({
        msg: `La categoria ${nombre}, ya existe`,
      });
    }

    // Generar la data a guardar

    const data = {
      nombre,
      usuario: req.usuario._id,
    };

    console.log(data);

    const categoria = new categoriaModel(data);

    //Guardar DB

    await categoria.save();

    res.status(201).json({categoria})

  } catch (error) {
    console.log(error);
  }
};

// actualizar categoria - nombre 
const actualizarCategoria = async (req = request, res = response) => {

    const { id } = req.params;
   
    const { estado, usuario ,...data} = req.body;
    
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await categoriaModel.findByIdAndUpdate(id,data,{new: true});
    res.json(categoria);
};


// borrar categoria - estado : false;

const borrarCategoria = async ( req , res = response) => {
    const { id } = req.params;
    const categoriaBorrada = await categoriaModel.findByIdAndUpdate(id,{estado: false}, {new:true});
    res.json(categoriaBorrada);
}

export {crearCategoria,obtenerCategorias, obtenerCategoria,actualizarCategoria,borrarCategoria};
