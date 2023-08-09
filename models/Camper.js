const { Schema, model } = require('mongoose');

const CamperSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    típoIdentificacion: {
        type: Boolean,
        default: true,
        required: [true, 'El nombre es obligatorio']
    },
    NroIdentificacion: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: Schema.Types.ObjectId,
        unique: true,
        required: [true, 'El email es obligatorio']
    },
    password :{
        type:String,
        required: [true, 'Password is required']
    },
    level:{
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true,
        default:'Level',

    },
    levelState:{
        type: String,
        required: [true, 'El levelState es obligatorio'],
        unique: true

    },
    estado :{
        type:Boolean,
        default: true
    },
    imagen :{
        type:String,
    },
      rol :{
        type:String,
        required: true,
        default: 'Role',
    }, 
    promedio:{
        type: String,
        required: true ,
        unique: true,
    }
});



module.exports = model('Camper',CamperSchema );
