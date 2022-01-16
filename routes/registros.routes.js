const { Router } = require('express');
const { check } = require('express-validator');


const router = Router();

const {
    crearRegistro,
    obtenerRegistro,
    actualizarRegistro
} = require('../controllers/registros.controller');
const { validarJWT, validarCampos } = require('../middlewares');

router.get('/', obtenerRegistro)

router.post('/',[
    validarJWT,
    check('usuario','No es id de Mongo válido').isMongoId(),
    check('producto','No es id de Mongo válido').isMongoId(),
    validarCampos
], crearRegistro)

router.put('/:id',[
    validarJWT,
    validarCampos
], actualizarRegistro)



module.exports = router