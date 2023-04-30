import Router from 'express';
import {check} from 'express-validator';
import {validarJWT, validarCampos, esAdminRole} from '../middlewares/index.js';
import { actualizarCategoria, borrarCategoria, crearCategoria, obtenerCategoria, obtenerCategorias } from '../controllers/categorias.controller.js';
import { existeCategoriaPorId } from '../helpers/db-validators.js';

const router = Router();

// Obtener todas las categorias - publico
router.get('/', obtenerCategorias)

// obtener una categoria por id - publico
router.get('/:id',[
    check('id','No es un id de mongo válido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
]
,obtenerCategoria);

// Crear una categoria - privado - cualquier persona con  un token valido
router.post('/', 

  [ validarJWT, 
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), 
    validarCampos
  ], crearCategoria
);

// actualizar - privado - cualquier con token valido
router.put('/:id', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('id','No es un id de mongo válido').isMongoId(),
],actualizarCategoria);

// borrar categoria  - privado - admin
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id','No es un id de mongo válido').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], borrarCategoria);

export {router};
