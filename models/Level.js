const {Schema, model} = require('mongoose');

const LevelSchema = Schema({
    nombre :{
        type:String,
        required: [true, 'Name is required']
    },  

    ruta :{
        type:String,
        required: true,
        unique:true
    }, 
    duracion :{
        type:String,
        default: true
    }
});

module.exports = model('Level', LevelSchema);