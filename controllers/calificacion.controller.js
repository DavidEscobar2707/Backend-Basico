const { response } = require("express");

const {Usuario, Producto} = require('../models');
const usuario = require("../models/usuario");

const coleccionesPermitidas = [
    'usuarios',
    'productos'
];


const crear = async (req, res= response) => {

    const { id, coleccion } = req.params;
    const {comentario, estrella, usuario} = req.body

    if(!coleccionesPermitidas.includes( coleccion )){
        return res.status(400).json({
            msg: `las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    let modelo
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            
            if(estrella <= 5) {
                modelo.calificacion.push({
                    comentario: comentario,
                    estrella: estrella,
                    usuario: usuario
                })
            }
            await modelo.save()
            
            res.json(modelo)
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            if(estrella <= 5) {
                modelo.calificacion.push({
                    comentario: comentario,
                    estrella: estrella,
                    usuario: usuario
                })
            }
            await modelo.save()
            res.json(modelo)
            break;

    
        default:
            res.status(500).json({
                msg: 'Olvide hacer esta busqueda'
            })
            break;
    }
}
const borrar = async (req, res= response) => {

    const { id, coleccion } = req.params;
    const {comentario, estrella, usuario} = req.body

    if(!coleccionesPermitidas.includes( coleccion )){
        return res.status(400).json({
            msg: `las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    let modelo
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            
            if(estrella <= 5) {
                modelo.calificacion.push({
                    comentario: comentario,
                    estrella: estrella,
                    usuario: usuario
                })
            }
            await modelo.save()
            
            res.json(modelo)
            break;

        case 'productos':
            modelo = await Producto.findByIdAndDelete(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }
            if(estrella <= 5) {
                modelo.calificacion.push({
                    comentario: comentario,
                    estrella: estrella,
                    usuario: usuario
                })
            }
            await modelo.save()
            res.json(modelo)
            break;

    
        default:
            res.status(500).json({
                msg: 'Olvide hacer esta busqueda'
            })
            break;
    }
}

module.exports ={
    crear,
    borrar
}