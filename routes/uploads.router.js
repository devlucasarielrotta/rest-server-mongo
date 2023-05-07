import { Router } from 'express';
import {check} from 'express-validator';
import { actualizarImagen, cargarArchivo, mostrarImagen } from '../controllers/uploads.controller.js';
import { validarCampos, validarArchivoSubir } from '../middlewares/index.js';
import {coleccionesPermitidas} from '../helpers/db-validators.js';

const router = Router();

router.post('/',validarArchivoSubir,cargarArchivo)

router.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas( c, ['usuarios','productos'])),
    validarCampos
], actualizarImagen)

router.get('/:coleccion/:id',[
    check('id','El id debe ser de mongo').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
],mostrarImagen)

export { router  }