import { Schema, model } from "moongose";

const usuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    correo: {
        type:String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required:[true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE','USER_ROLE']
    },
    estado: {
        type:Boolean,
        default: true
    },
    google: {
        type:String,
        default: false
    }
})

const modelSchema = model('Usuario',usuarioSchema)

export {modelSchema};