import Router from 'express';
import {usuariosDelete,
        usuariosGet,
        usuariosPatch,
        usuariosPost,
        usuariosPut} from '../controllers/usuarios.controller.js'

export const router = Router();

router.get('/',usuariosGet)

router.put('/',usuariosPut)
router.put('/:id',usuariosPut)

router.post('/',usuariosPost)

router.delete('/',usuariosDelete)

router.patch('/',usuariosPatch)


