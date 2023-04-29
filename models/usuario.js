import { Schema, model } from "mongoose";


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
        required: [true,'El rol es obligatorio'],
        default:'USER_ROLE',
        emun: ['ADMIN_ROLE','USER_ROLE'],
        
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

usuarioSchema.methods.toJSON = function (){
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario;
}


const modelSchema = model('Usuario',usuarioSchema)

export {modelSchema};