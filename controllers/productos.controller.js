import {request, response} from 'express';
import {productoModel} from '../models/index.js';

//obtenerCategorias - paginado - total - populate
const obtenerProductos = async (req, res = response) => {
  const {limite = 5, desde = 0} = req.query;
  const query = {estado: true};

  const [total, productos] = await Promise.all([productoModel.countDocuments(query), productoModel.find(query).populate('categoria', 'nombre').populate('usuario', 'nombre').skip(Number(desde)).limit(Number(limite))]);

  res.json({
    total,
    productos,
  });
};

//obtenerCateogria - populate {}
const obtenerProducto = async (req, res = response) => {
  const {id} = req.params;
  const producto = await productoModel.findById(id).populate('categoria', 'nombre').populate('usuario', 'nombre');
  res.json({producto});
};

const crearProducto = async (req, res = response) => {
  try {
    const {estado, usuario, ...body} = req.body;

    const productoDB = await productoModel.findOne({nombre: body.nombre});

    if (productoDB) {
      return res.status(400).json({
        msg: `El producto ${productoDB.nombre}, ya existe`,
      });
    }

    // Generar la data a guardar

    const data = {
      ...body,
      nombre: body.nombre.toUpperCase(),
      usuario: req.usuario._id,
    };

    const producto = new productoModel(data);

    //Guardar DB

    await producto.save();

    res.status(201).json({producto});
  } catch (error) {
    console.log(error);
  }
};

// actualizar categoria - nombre
const actualizarProducto = async (req = request, res = response) => {
  try {
  
    const {id} = req.params;
    
    const {estado, usuario, ...data} = req.body;
    if (data.nombre) {
      data.nombre = data.nombre.toUpperCase();
    }

    data.usuario = req.usuario._id;

    const producto = await productoModel.findByIdAndUpdate(id, data, {new: true});
    res.json(producto);
  } catch (error) {
    console.log('No se pudo actualizar el producto');
  }
};

// borrar categoria - estado : false;

const borrarProducto = async (req, res = response) => {
  const {id} = req.params;
  const productoBorrado = await productoModel.findByIdAndUpdate(id, {estado: false}, {new: true});
  res.json(productoBorrado);
};

export {obtenerProducto, actualizarProducto, borrarProducto, obtenerProductos, crearProducto};
