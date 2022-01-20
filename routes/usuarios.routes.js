//end points

const { Router } = require('express');
const { check } = require('express-validator');

const {
        validarCampos,
        validarJWT,
        tieneRol
} = require('../middlewares')

const { esRoleValido, correoExiste, existeUsuarioPorId, nombreUsuarioExiste } = require('../helpers/db-validators');

const { usuariosGet,
        obtenerUsuarioById,
        usuariosPut, 
        usuariosPost, 
        usuariosDelete} = require('../controllers/usuarios.controllers');

const router = Router();

router.get('/:id',[
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        validarCampos
], obtenerUsuarioById );

router.get('/', usuariosGet );


router.post('/', [
        validarJWT,
        check('nombreCompleto', 'El nombre completo es obligatorio').not().isEmpty(),
        check('pais', 'El pais es obligatorio').not().isEmpty().isString(),
        check('ciudad', 'La ciudad es obligatoria').not().isEmpty().isString(),
        check('password', 'El password es obligatorio y tiene que tener más de 6 caracteres').isLength({min: 6}),
        check('correo', 'El correo no es válido').isEmail(),
        check('rol').custom ( esRoleValido ),
        check('correo').custom ( correoExiste ),
        check('nombre', 'El nombre de usuario es obligatorio').not().isEmpty().custom( nombreUsuarioExiste ),
        validarCampos
],
 usuariosPost);

router.put('/:id',[
        validarJWT,
        check('nombre', 'El nombre de usuario es obligatorio').not().isEmpty().custom( nombreUsuarioExiste ),
        check('nombreCompleto', 'El nombre completo es obligatorio').not().isEmpty(),
        check('ciudad', 'La ciudad es obligatoria').not().isEmpty().isString(),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ),
        check('rol').custom ( esRoleValido ),
        validarCampos
], usuariosPut);

router.delete('/:id', [
        validarJWT,
        tieneRol('ADMIN_ROL'),
        check('id', 'No es un id válido').isMongoId(),
        check('id').custom( existeUsuarioPorId ), 
        validarCampos
], usuariosDelete);





module.exports = router