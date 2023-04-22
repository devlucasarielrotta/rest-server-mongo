import Router from 'express';
import {check} from 'express-validator'
import {usuariosDelete,
        usuariosGet,
        usuariosPatch,
        usuariosPost,
        usuariosPut} from '../controllers/usuarios.controller.js'
import { validarCampos } from '../middlewares/validar-campos.js';
import { emailExiste, esRoleValido } from '../helpers/db-validators.js';


export const router = Router();

router.get('/',usuariosGet)

router.put('/',usuariosPut)
router.put('/:id',usuariosPut)

router.post('/',[
        check('nombre','El nombre es obligatorio').not().isEmpty(),
        check('password','El password es obligatorio y más de 6 letras').isLength({min:6}),
        check('correo', `El correo no es valido`).isEmail(),
        check('correo').custom(emailExiste),
        //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
        check('rol').custom( esRoleValido ),
        validarCampos

],usuariosPost)

router.delete('/',usuariosDelete)

router.patch('/',usuariosPatch)


