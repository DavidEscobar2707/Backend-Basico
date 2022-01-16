const { response, request } = require("express");
const { Categoria } =require('../models')

const categoriasGet = async(req, res = response) => {

    const query = {estado : true}

    const total = await Categoria.countDocuments(query);
    const categorias = await Categoria.find(query)
                                        .populate('usuario','nombre')
    
    res.json({
        total,
        categorias
    })
}

const categoriasGetByID = async(req = request, res = response) => {

    const {id} = req.params
    const categoria = await Categoria.findById( id ).populate('usuario','nombre')

    res.json(categoria)
}


const crearCategoria = async(req, res= response) => {

    const nombre = req.body.nombre.toUpperCase();
    const categoriaDB = await Categoria.findOne({ nombre      })

    if ( categoriaDB ) {
        return res.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre}, ya existe`
        })
    }

    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria ( data )

    await categoria.save()
   
}
const actualizarCategoria = async(req = request, res = response) => {

    const {id} = req.params;
    const {estado, usuario, ...data} = req.body;

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
    crearCategoria,
    categoriasGet,
    categoriasGetByID,
    actualizarCategoria,
    borrarCategoria
}