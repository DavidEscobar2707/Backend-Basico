const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const {Usuario, Producto} = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'productos'
];


const crear = async (req, res= response) => {

    const { id, coleccion } = req.params;
    const {comentario, estrella} = req.body

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
                modelo.comentario.push(comentario)
                modelo.estrella.push(estrella)
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
                modelo.comentario.push(comentario)
                modelo.estrella.push(estrella)
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
    const {comentario, estrella} = req.body

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
                modelo.comentario.pop(comentario)
                modelo.estrella.pop(estrella)
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
                modelo.comentario.pop(comentario)
                modelo.estrella.pop(estrella)
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