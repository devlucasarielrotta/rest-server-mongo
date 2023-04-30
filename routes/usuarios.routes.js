import Router from 'express';
import {check} from 'express-validator'

import {usuariosDelete,
        usuariosGet,
        usuariosPatch,
        usuariosPost,
        usuariosPut} from '../controllers/usuarios.controller.js'

import { emailExiste, esRoleValido, existeUsuarioPorId} from '../helpers/db-validators.js';

import {esAdminRole,tieneRole,validarJWT, validarCampos } from '../middlewares/index.js'

export const router = Router();

router.get('/',usuariosGet)


router.put('/',usuariosPut)
router.put('/:id',[
        check('id','no es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        check('rol').custom( esRoleValido ),
        validarCampos
],usuariosPut)

router.post('/',[
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio y más de 6 letras').isLength({min:6}),
        check('correo', `El correo no es valido`).isEmail(),
        check('correo').custom(emailExiste),
        //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( esRoleValido ),
        validarCampos

],usuariosPost)

router.delete('/:id',[
        validarJWT,
       // esAdminRole,
        tieneRole('ADMIN_ROLE','USER_ROLE','VENTAS_ROLE'),
        check('id','no es un ID valido').isMongoId(),
        check('id').custom(existeUsuarioPorId),
        validarCampos
],usuariosDelete)

router.patch('/',usuariosPatch)


