const { response, request } = require("express");
const { Producto, Usuario, Calificacion } =require('../models');
const registro = require("../models/registro");

const calificacionGet = async(req, res = response) => {

    const query = {estado : true}

    const total = await Calificacion.countDocuments(query);
    const calificacion = await Calificacion.find(query)
                                        .populate('registro', ['usuario','producto'])
                                        
                                        
    res.json({
        total,
        calificacion
    })
}

const categoriasGetByID = async(req = request, res = response) => {

    const {id} = req.params
    const categoria = await Calificacion.findById( id )
                                        .populate('registro','producto')
                                        .populate('registro','usuario')

    res.json(categoria)
}


const crearCalificacion = async(req, res= response) => {

    const { id, coleccion } = req.params;
    const { ...body}= req.body

    const data = {
        ...body
    }

    let modelo;

    switch ( coleccion ) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${ id }`
                });
            }else {
                const calificacion = new Calificacion ( data )
            
                await calificacion.save()

                res.status(201).json(calificacion)
            }
        
        break;

        case 'productos':
            modelo = await Producto.findById(id);
            if ( !modelo ) {
                return res.status(400).json({
                    msg: `No existe un producto con el id ${ id }`
                });
            }else {
                const calificacion = new Calificacion ( data )
            
                await calificacion.save()

                res.status(201).json(calificacion)
            }
        
        break;
    
        default:
            return res.status(500).json({ msg: 'Se me olvidó validar esto'});
    }
}
const actualizarCategoria = async(req = request, res = response) => {

    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

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
    crearCalificacion,
    calificacionGet,
    categoriasGetByID,
    actualizarCategoria,
    borrarCategoria
}