const { response, request } = require("express");
const { Registro } =require('../models');



const crearRegistro = async(req, res = response) => {

    let {fechaFinal, fechaInicial,...data} = req.body
    let fecha = Math.floor(Date.now());
    fechaInicial = fecha
    fechaFinal = fecha

    const registro = new Registro({
        ...data,
        fechaInicial,
        fechaFinal
    });

    await registro.save();

    res.status(201).json(registro);

}

const obtenerRegistroById = async(req = request, res = response) => {

    const {id} = req.params
    const registro = await Registro.findById(id)
                                        .populate('usuario','nombre')
                                        .populate('producto','nombre')

    res.json(registro)
} 

const obtenerRegistro = async(req = request, res = response) => {

    const registros = await Registro.find()
                                        .populate('usuario','nombre')
                                        .populate('producto','usuario',)
 
    
    res.json(registros)
}

const actualizarRegistro = async(req = request, res = response) => {

    const {id} = req.params;
    const { usuario, producto, ...data} = req.body;

    data.nombre = req.producto
    data.usuario = req.usuario._id

    const registro = await Registro.findByIdAndUpdate(id, data)

    return res.status(201).json(registro)
}
const borrarRegistro = async(req = request, res = response) => {

    const {id} = req.params
    const registroBorrado = await Registro.findByIdAndUpdate(id, {disponible: false}, {new: true});

    res.json( registroBorrado )
}

module.exports = {
    crearRegistro,
    obtenerRegistro,
    actualizarRegistro,
    obtenerRegistroById,
    borrarRegistro
}