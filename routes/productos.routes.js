const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos, validarJWT, existeProductoPorId} = require('../middlewares');

const { crearProducto, obtenerProductoById, obtenerProducto, actualizarProducto, borrarProducto } = require('../controllers/productos.controllers');

const router = Router();

router.get('/', obtenerProducto)

router.get('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], obtenerProductoById)

router.post('/' , [
    validarJWT,
    check('categoria', 'La categoria no es id de mongo').isMongoId(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('pais', 'El pais es obligatorio').not().isEmpty().isString(),
    check('ciudad', 'La ciudad es obligatoria').not().isEmpty().isString(),
    validarCampos
] , crearProducto )

router.put('/:id',[
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('pais', 'El pais es obligatorio').not().isEmpty().isString(),
    check('ciudad', 'La ciudad es obligatoria').not().isEmpty().isString(),
    check('categoria', 'La categoria no es id de mongo').isMongoId(),
    validarCampos
],actualizarProducto)

router.delete('/:id',[
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], borrarProducto)

module.exports = router