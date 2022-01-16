const { response, request } = require("express");
const { Registro, Producto } =require('../models');



const crearRegistro = async(req, res = response) => {

    const {...body} = req.body

    const registro = new Registro({
        ...body
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

const actualizarCategoria = async(req = request, res = response) => {

    const {id} = req.params;
    const {pr, usuario, ...data} = req.body;

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true })

    return res.json(categoria)
}
const borrarCategoria = async(req = request, res = response) => {

    const {id} = req.params
    const categoriaBorrada = await Categoria.findByIdAndUpdate(id, {estado: false}, {new: true});

    res.json( categoriaBorrada )
}

module.exports = {
    crearRegistro,
    obtenerRegistro
}