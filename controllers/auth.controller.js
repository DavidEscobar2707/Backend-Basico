const { response } = require("express");
const bcryptjs = require('bcryptjs')

const Usuario = require('../models/usuario')
const {generarJWT} = require('../helpers/generar-jwt')

const login = async (req, res = response) => {

    const {correo, password} = req.body;

    try {

        //verificiacion de email
        const usuario = await Usuario.findOne({correo})
        if ( !usuario ){{
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            })
        }}

        //verificacion de estado
        if ( !usuario.estado ){{
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            })
        }}
        //verificacion password
        const contraseñaValida = bcryptjs.compareSync(password, usuario.password)
        if ( !contraseñaValida ) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            })
        }
        //generacion JWT
        const token = await generarJWT (usuario.id)

        return res.json({
            usuario,
            token
        })

    }catch (error) {
        console.log(error)
        return res.status(500).json({
            msg: 'Investigue con el administrador'
        })
    }


    
}


module.exports = {
    login 
}