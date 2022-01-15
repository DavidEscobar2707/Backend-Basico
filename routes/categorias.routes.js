const { Router } = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        categoriasGet, 
        categoriasGetByID,
        actualizarCategoria, 
        borrarCategoria} = require('../controllers/categorias.controller');
const { existeCategoriaPorId } = require('../helpers/db-validators');

const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');

const router = Router();


router.get('/', categoriasGet)

router.get('/:id',[
    check('id', 'No es un id válido').isMongoId(),
    validarCampos
], categoriasGetByID)

router.post('/' , [
    validarJWT,
    esAdminRol,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
] , crearCategoria)

router.put('/:id',[
    validarJWT,
    check('id', 'No es un id válido').isMongoId(),
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
],actualizarCategoria)

router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id', 'No es un id válido').isMongoId(),
    validarCampos,
],borrarCategoria)

module.exports = router