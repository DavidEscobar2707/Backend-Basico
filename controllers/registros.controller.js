const { response, request } = require("express");
const { Registro, Producto } =require('../models');



const crearRegistro = async(req, res = response) => {

    let {fechaFinal, fechaInicial,...body} = req.body
    let fecha = Math.floor(Date.now());
    fechaInicial = fecha
    fechaFinal = fecha
    const registro = new Registro({
        ...body,
        fechaInicial,
        fechaFinal
    });

    await registro.save();

    res.status(201).json(registro);

}



const obtenerRegistro = async(req = request, res = response) => {

    
    const registros = await Registro.find()
                                        .populate('usuario','nombre')
                                        .populate('producto','usuario',)
 
    
    res.json({
        registros
    })
}

const actualizarRegistro = async(req = request, res = response) => {

    const {id} = req.params;
    const { usuario, producto, ...data} = req.body;

    data.nombre = req.producto
    data.usuario = req.usuario._id

    const registro = await Registro.findByIdAndUpdate(id, data)

    return res.status(201).json(registro)
}
const borrarCategoria = async(req = request, res = response) => {

    const {id} = req.params
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json( categoriaBorrada )
}

module.exports = {
    crearRegistro,
    obtenerRegistro,
    actualizarRegistro
}