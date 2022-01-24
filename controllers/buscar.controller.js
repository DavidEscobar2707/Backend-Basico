const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const {Usuario, Producto} = require('../models')

const coleccionesPermitidas = [
    'usuarios',
    'productos'
];

const buscarUsuarios = async( termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const usuario = await Usuario.findById(termino)
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }
    
    const regex = new RegExp (termino, 'i');
    
    const usuarios = await Usuario.find({
        $or:[{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    })

    res.json({
        results: usuarios
    })
}   

const buscarProductos = async( termino = '', res = response) => {
    const esMongoID = ObjectId.isValid(termino);

    if(esMongoID){
        const producto = await Producto.findById(termino).populate('usuario','nombre')
        return res.json({
            results: (producto) ? [producto] : []
        })
    }
    
    const regex = new RegExp (termino, 'i');
    
    const productos = await Producto.find({nombre: regex, estado: true})

    res.json({
        results: productos
    })
}   


const buscar = (req, res= response) => {

    const {coleccion, termino} = req.params
    
    if(!coleccionesPermitidas.includes( coleccion )){
        return res.status(400).json({
            msg: `las colecciones permitidas son: ${coleccionesPermitidas}`
        })
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res)
            break;

        case 'productos':
            buscarProductos(termino, res)
            break;
    
        default:
            res.status(500).json({
                msg: 'Olvide hacer esta busqueda'
            })
            break;
    }
}


module.exports ={
    buscar
}