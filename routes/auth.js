import Router from 'express';
import {check} from 'express-validator'

import { validarCampos } from '../middlewares/validar-campos.js';

import { login } from '../controllers/auth.controller.js';


const router = Router();

router.post('/login',[
    check('correo','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login)

export {router};