const { Router } = require('express');
const { check } = require('express-validator');

const { validateDocuments} = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js');

const { findCamperById,emailExiste, isValidRole , } = require('../helpers/db.validators.js');

const { postCampers, getCampers, putCamper, delCamper ,     } = require('../controllers/camper.controllers.js');

const router = Router();


router.post('/', [ 
   validateJWT, 
    check('típoIdentificacion',' típoIdentificacion solo es permitida T.I y C.C').not().isEmpty(),
    check('NroIdentificacion',' NroIdentificacion 10 caracteres').not().isLength({min:10, max:10}),
    check('nombre','El nombre debe estar lleno').not().isEmpty(),
    check('nombre','El nombre debe estar lleno').not().isLength({min:8}),
    check('email', 'El email no es valido').isEmail(),
    check('email').custom(emailExiste),
    check('rol').custom(isValidRole),


    validateDocuments
], postCampers );

router.get('/',/*  [
       check( 'paguinado de 10  a 10 ').not().isEmpty(), 
       check( 'nesesaio el level ').not().isEmpty(),
       validateDocuments,
  ], */getCampers );



router.put('/:id',[
      validateJWT,
      isAdminRole,
      check('id', 'No es un id de Mongo válido, "a quien borras').isMongoId(),
      check('id').custom( findCamperById ),
      validateDocuments
  ], putCamper );

  

router.delete('/:id',[
      validateJWT,
      isAdminRole,
      check('id', 'No es un id de Mongo válido , "a quien borras"').isMongoId(),
      check('id').custom( findCamperById ),
      validateDocuments,
  ], delCamper);


module.exports = router;