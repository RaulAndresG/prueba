const Role = require ('../models/Role.js');
const Camper = require('../models/Camper.js');
const Centro = require('../models/Centro.js');
const Level = require('../models/Level.js');
const Ruta = require('../models/Ruta.js');


const isValidRole = async(rol= '')=>{
    const existeRol = await Role.findOne({rol});
    if(!existeRol){
            throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}


 const emailExiste = async( email = '' ) => {
    const existeEmail = await Camper.findOne({email});
    if(existeEmail){
        throw new Error(`El email: ${ email }, ya está registrado`);
    }
 }

 const campExistsById = async( id ) => {

    const campExists = await Camper.findById(id);
    if ( !campExists ) {
        throw new Error(`El id (Camper) no existe ${ id }`);
    }
}

const findCamperById = async( id ) => {

    const findCamper = await Camper.findById(id);
    if ( !findCamper ) {
        throw new Error(`El id del Camper no existe ${ id }`);
    }
}

module.exports = {
    isValidRole,
    emailExiste,
    campExistsById,
    findCamperById,
}