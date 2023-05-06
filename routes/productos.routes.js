import Router from 'express';
import {check} from 'express-validator';
import {validarJWT, validarCampos, esAdminRole} from '../middlewares/index.js';
import { obtenerProductos,obtenerProducto,crearProducto,actualizarProducto,borrarProducto } from '../controllers/productos.controller.js';
import { existeCategoriaPorId, existeProductoPorId } from '../helpers/db-validators.js';

const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerProductos)

// obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id de mongo válido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
]
,obtenerProducto);

// Crear una categoria - privado - cualquier persona con  un token valido
router.post('/', 

  [ validarJWT, 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
    check('categoria', 'No es un id de mongo').isMongoId(), 
    check('categoria').custom(existeCategoriaPorId), 
    validarCampos
  ], crearProducto
);

// actualizar - privado - cualquier con token valido
router.put('/:id', [
    validarJWT,
  //  check('categoria', 'No es un id de mongo').isMongoId(), 
    check('id').custom( existeProductoPorId )
],actualizarProducto);

// borrar categoria  - privado - admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo válido').isMongoId(),
    check('id').custom( existeProductoPorId ),
    validarCampos
], borrarProducto);

export {router};
