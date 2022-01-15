
const  validarCampos  = require ('../middlewares/validar-campos');
const  validarJWT  = require ('../middlewares/validar-jwt')
const  validaRol  = require('../middlewares/validar-roles')
const  validarArchivo = require('../middlewares/validar-archivo')

module.exports = {
    ...validarCampos,
    ...validarJWT,
    ...validaRol,
    ...validarArchivo
}