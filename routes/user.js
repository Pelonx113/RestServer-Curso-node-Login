const {Router} = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPut, usuariosPost, usuariosDelete, usuariosPatch } = require('../controllers/user');
const { esRolValido, emailExiste, existeUsuarioPorID } = require('../helpers/db-validators');

const {validarCampos, validarJWT, tieneRole, esAdminRole} = require('../middlewares');

const router = Router();

router.get('/', usuariosGet);

router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    check('rol').custom(esRolValido),
    validarCampos
], usuariosPut);

router.post('/',[
    check('nombre', 'Nombre obligatorio').not().isEmpty(),
    check('password', 'Constraseña debe ser de minimo 6 caracteres').isLength({min: 6}),
    //check('correo', 'Correo invalido').isEmail(),
    //check('rol', 'Rol invalido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('correo').custom(emailExiste),
    check('rol').custom((rol) => esRolValido(rol)),
    validarCampos
], usuariosPost);

router.patch('/:id', usuariosPatch);

router.delete('/:id', [
    validarJWT,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
  /*   esAdminRole, */
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(existeUsuarioPorID),
    validarCampos
], usuariosDelete);


module.exports = router;