const { Router } = require('express');
const { check } = require('express-validator');


const router = Router();

const {
    crearRegistro,
    obtenerRegistro,
    actualizarRegistro,
    obtenerRegistroById,
    borrarRegistro
} = require('../controllers/registros.controller');
const { validarJWT, validarCampos } = require('../middlewares');

router.get('/', obtenerRegistro)

router.get('/:id', obtenerRegistroById)

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

router.delete('/:id', borrarRegistro)



module.exports = router