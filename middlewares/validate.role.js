//24.1 Middleware para garantizar borrado solo por camper con ADMIN
const isAdminRole = ( req, res, next ) => {

     if ( !req.camper ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        });
    } 

    const { rol, nombre } = req.camper;
    
    if ( rol !== 'gerenteRol' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }
    if ( rol !== 'trainerRol' ) {
        return res.status(401).json({
            msg: `${ nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}


module.exports = {
    isAdminRole
}