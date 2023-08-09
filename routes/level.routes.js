const {Router} = require('express');
const {check} = require('express-validator');
const { validateDocuments } = require('../middlewares/validate.documents.js');
const { validateJWT } = require('../middlewares/validate.jwt.js');
const { isAdminRole } = require('../middlewares/validate.role.js');
// 5. se importA validador de rol desde helpers
//10.  se importa validador de emailExiste
const { isValidRole, emailExiste,  } = require('../helpers/db.validators.js');
const { getlevel , postlevel , delLevel , putLevel } = require('../controllers/level.controllers.js');


        
const router = Router(); 

router.get("/", getlevel);


router.post("/",[
        check('nombre', 'Nombre no es valido').not().isEmpty(),
        check('password', 'Password debe ser de minimo 6 letras').isLength({min :6}),
        check('email', 'El email no es valido').isEmail(),
        check('email').custom(emailExiste ),
        
        check('rol').custom(isValidRole),
        validateDocuments
] ,postlevel);
router.delete("/:id", [
        validateJWT,
           isAdminRole,   
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(  ),
    validateDocuments
], delLevel );
router.put("/:id",
[
        check('id', 'No es un ObjectID MongoDB válido').isMongoId(),
        check('id').custom(  ),
        check('rol').custom(isValidRole),
       
        validateDocuments
    ], putLevel );

module.exports = router;