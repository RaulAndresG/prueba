const {Schema, model} = require('mongoose');

const RutaSchema = Schema({
    nombre :{
        type:String,
        required: [true, 'rol is required']
    },
   centro :{
        type:String,
        required: true, 
    }
});

module.exports = model('Ruta', RutaSchema);
