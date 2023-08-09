const { response } = require('express');
const Level  = require('../models/Level.js');  



const getlevel= async(req, res)=>{
    const { hasta, desde } = req.query;
    const query = { estado: true };
    const [ total, level ] = await Promise.all([
        Level.countDocuments(query),
        Level.find(query)
            .skip( Number( desde ) )
            .limit(Number( hasta ))
    ]);

    res.json({
        total,
        level
    });
}


const postlevel = async(req, res ) => {

    const nombre = req.body.nombre.toUpperCase();

    const levelDB = await Level.findOne({ nombre });

    if ( levelDB ) {
        return res.status(400).json({
            msg: `El Level ${ levelDB.nombre }, ya existe`
        });
    }
    const data = {
        nombre,
    }
    const level = new Level( data );
    await level.save();
    res.status(201).json(level);

}

const getLevel = async(req, res = response ) => {

    const { id } = req.params;
    const campers = await Camper.findById( id )
                            .populate('nombre');

    res.json( campers );

}

const putLevel = async( req, res = response ) => {

    const { id } = req.params;
    const { nombre ,descripcion, ...data } = req.body;

    data.nombre  = data.nombre.toUpperCase();

    const campers = await Camper.findByIdAndUpdate(id, data, { new: true });

    res.json( campers );

}

const delLevel = async(req, res =response ) => {

    const { id } = req.params;
    const camperEliminado = await Camper.findByIdAndUpdate( id, { nombre: false });

    res.json( camperEliminado );
}

module.exports = {
    postlevel,
    getlevel,
    getLevel,
    putLevel,
    delLevel
}

