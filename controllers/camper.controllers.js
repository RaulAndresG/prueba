const { response } = require('express');
const Camper  = require('../models/Camper.js');  


const getCampers = async(req, res = response ) => {

    const { hasta = 8, desde = 0 } = req.query;
    const query = { estado: true };

    const [ total, camper ] = await Promise.all([
        Camper.countDocuments(query),
        Camper.find(query)
            .populate('camper', ['nombre', 'email'])
            .skip( Number( desde ) )
            .limit(Number( hasta ))
    ]);

    res.json({
        total,
        camper
    });
}

const postCampers = async(req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const campersDB = await Camper.findOne({ nombre });

    if ( campersDB ) {
        return res.status(400).json({
            msg: `El Camper ${ campersDB.nombre }, ya existe`
        });
    }
    const data = {
        nombre,
    }
    const campers = new Camper( data );
    await campers.save();
    res.status(201).json(campers);

}

const getCamper = async(req, res = response ) => {

    const { id } = req.params;
    const campers = await Camper.findById( id )
                            .populate('nombre');

    res.json( campers );

}

const putCamper = async( req, res = response ) => {

    const { id } = req.params;
    const { nombre ,descripcion, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const campers = await Camper.findByIdAndUpdate(id, data, { new: true });

    res.json( campers );

}

const delCamper = async(req, res =response ) => {

    const { id } = req.params;
    const camperEliminado = await Camper.findByIdAndUpdate( id, { nombre: false });

    res.json( camperEliminado );
}

module.exports = {
    postCampers,
    getCampers,
    getCamper,
    putCamper,
    delCamper
}

