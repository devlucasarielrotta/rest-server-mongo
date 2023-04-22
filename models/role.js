import {Schema,model} from 'mongoose';

const roleSchema = Schema({
    rol:{
        type:String,
        required:[true, 'El rol es obligatorio']
    }
})

const roleModel = model('Role',roleSchema)

export {roleModel};