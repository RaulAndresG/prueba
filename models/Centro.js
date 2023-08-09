const {Schema, model} = require('mongoose');

const CentroSchema = Schema({
    nombre :{
        type:String,
        required: [true, 'Name is required']
    },  

    decripcion :{
        type:String,
        required: true,
        unique:true
    }, 
    estado :{
        type:String,
        default: true
    },
    cuidad :{
        type:String,
        default: true
    }
});

module.exports = model('Centro', CentroSchema);