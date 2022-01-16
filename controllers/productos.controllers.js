const { response, request } = require("express");
const {Producto} = require('../models')

const obtenerProducto = async(req = request, res = response) => {

    const query = {estado : true}

    const total = await Producto.countDocuments(query);
    const productos = await Producto.find()
                                        .populate('usuario','nombre')
                                        .populate('categoria','nombre')
    
    res.json({
        total,
        productos
    })
}
const obtenerProductoById = async(req = request, res = response) => {

    const {id} = req.params
    const producto = await Producto.findById(id)
                                        .populate('usuario','nombre')
                                        .populate('categoria','nombre')

    res.json(producto)
} 

const crearProducto = async(req, res= response) => {
    const { estado, usuario, ...body}= req.body

    const data = {
        ...body,
        nombre: body.nombre,
        usuario: req.usuario._id,
    }

    const producto = new Producto ( data )

    await producto.save()

    res.status(201).json(producto)
   
}
const actualizarProducto = async(req = request, res = response) => {

    const {id} = req.params
    const {estado, usuario, ...data} = req.body;

    data.usuario = req.usuario._id;

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true })

    return res.json(producto)
}
const borrarProducto = async(req = request, res = response) => {

    const {id} = req.params
    const productoBorrado = await Producto.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json( productoBorrado )
}

module.exports = {
    obtenerProducto,
    obtenerProductoById,
    crearProducto,
    actualizarProducto,
    borrarProducto
}

