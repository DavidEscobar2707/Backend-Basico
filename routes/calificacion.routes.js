const {Router} = require('express');
const { check } = require('express-validator');
const { validarCampos} = require('../middlewares');

const {crear, borrar} = require('../controllers/calificacion.controller')

const router = Router();

router.post('/:coleccion/:id',crear)
router.delete('/:coleccion/:id', borrar)

module.exports = router