const { Router } = require('express');
const { check } = require('express-validator');


const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js');

const { 
        getCentros, getCheese, postCheese, putCheese, deleteCheese} = require('../controllers/centro.controllers.js');

const { findCategoryById, findCheeseById } = require('../helpers/db.validators.js');


const router = Router();



 router.get('/:id',[
    check('id', 'No es un id de Mongo válido').isMongoId(),
    validateDocuments,
], getCentros ); 

/*  router.post('/', [ 
    validateJWT,
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('categoria','No es un id de Mongo').isMongoId(),
    check('categoria').custom( findCategoryById ),
    validateDocuments
], postCheese ); 

 router.put('/:id',[
    validateJWT,
    check('id').custom( findCheeseById ),
    validateDocuments
], putCheese ); 

 router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un id de Mongo válido').isMongoId(),
    check('id').custom( findCheeseById ),
    validateDocuments,
], deleteCheese); 
 */

module.exports = router;