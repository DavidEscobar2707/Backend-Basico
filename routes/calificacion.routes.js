const { Router } = require('express');
const { check } = require('express-validator');
const { crearCalificacion, 
        calificacionGet, 
        categoriasGetByID,
        actualizarCategoria, 
        borrarCategoria} = require('../controllers/calificacion.controller');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const router = Router();


router.get('/', calificacionGet)

router.get('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], categoriasGetByID)


router.post('/:coleccion/:id',[
    validarJWT,
    check('id', 'El id debe ser de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
    check('estrellas','estrellas son menores a 5').isNumeric(),
    validarCampos,
],crearCalificacion)

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un id válido').isMongoId(),
    validarCampos,
],borrarCategoria)

module.exports = router