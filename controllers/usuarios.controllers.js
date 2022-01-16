//Logica de las rutas

const { response, request } = require ('express')
const Usuario = require('../models/usuario')
const bcryptjs = require('bcryptjs');


const usuariosGet = async(req = request, res = response) => {
    
    //paginacion del get
    const total = await Usuario.countDocuments();

    const { limite = total, desde = 0} = req.query
    const usuarios = await Usuario.find({estado: true})
    .skip(Number(desde))
    .limit(Number(limite))
    
    res.json({
        total,
        usuarios
    })
}


const usuariosPost = async (req, res = response) => {
   
    const {nombre, nombreCompleto, pais, ciudad, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, nombreCompleto, pais, ciudad, correo, password, rol})
    
    //validacion de correos
    
    //encriptacion y verificacion contraseñas
    const salt = bcryptjs.genSaltSync()
    usuario.password = bcryptjs.hashSync( password , salt)

    await usuario.save()
        res.json({
            usuario
        })
}

const usuariosPut = async(req, res = response) => {
    const id = req.params.id;
    const {_id, password, pais, correo, ...resto} = req.body;
    
    
    if ( password ) {
        const salt = bcryptjs.genSaltSync()
        resto.password = bcryptjs.hashSync( password , salt)
    }

    
    const usuario = await Usuario.findByIdAndUpdate( id, resto)

    res.json(usuario)
}

const usuariosDelete = async(req, res = response) => {

    const  {id} = req.params;
    
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false})
    
    res.json(usuario)
}


module.exports = {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}