const { response } = require("express")


const esAdminRol = (req , res= response, next) => {

    if ( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token'
        })
    }
    const {rol, nombre} =  req.usuario

    if ( rol !== 'ADMIN_ROL' ){
        return res.status(401).json({
            msg:`${ nombre } no tiene rol de administrador, no puede realizar esa acción`
        });
    }
        

    next()

}

const tieneRol = ( ...roles ) => {
    return(req , res= response, next) => {
    
    if ( !req.usuario ){
        return res.status(500).json({
            msg:`se quiere verificar el rol sin validar el token primero`
        });
    }

    if ( !roles.includes ( req.usuario.rol ) ) {
        return res.status(401).json({
            msg:`EL servicio requiere uno de estos roles: ${ roles } `
        });
    }
        next()
    }
}




module.exports = {
    esAdminRol,
    tieneRol
}