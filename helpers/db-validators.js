const Role = require('../models/role')
const {Usuario, Categoria, Producto} = require('../models')
const mongoose = require('mongoose');

const esRoleValido = async (rol = '')=> {
    //verificador de rol
    const existeRol = await Role.findOne({rol})
    if (!existeRol) {
            throw new Error(`El rol ${ rol } no está registrado en la base de datos`)
    }
}
const correoExiste = async(correo = '') => {
    // verificador de correo
    const existeCorreo = await Usuario.findOne({correo})
    if ( existeCorreo ) {
        throw new Error (`El correo ${ correo }, ya está registrado`)
    }
}

const existeUsuarioPorId = async(id ) => {
    // verificador de correo
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new Error(`no es un id valido de mongo`);
    }
    
    const existeUsuario = await Usuario.findById(id)
    if ( !existeUsuario ) {
        throw new Error (`El id ${ id }, no existe`)
    }
}

const nombreUsuarioExiste = async(nombre) => {
    // verificador de correo
    const existeUsuario = await Usuario.findOne({nombre})
    if ( existeUsuario ) {
        throw new Error (`El nombre de usuario: ${ nombre }, ya está registrado`)
    }
}

const existeCategoriaPorId = async( id ) => {
    
    // verificador de correo
    const existeCategoria = await Categoria.findOne(id)
    if ( !existeCategoria ) {
        throw new Error (`El id: ${ id }, no existe`)
    }
}
const existeProductoPorId = async( id ) => {
    
    // verificador de correo
    const existeProducto = await Producto.findOne(id)
    if ( !existeProducto ) {
        throw new Error (`El id: ${ id } del producto no existe`)
    }
}

const coleccionesPermitidas = (coleccion = '', colecciones = []) => {

    const incluida = colecciones.includes( coleccion );
    if (!incluida) {
        throw new Error(`La colección ${coleccion} no es permitida, ${colecciones} `)
    }
    return true;
}


module.exports = {
    esRoleValido,
    correoExiste,
    existeUsuarioPorId,
    existeCategoriaPorId,
    nombreUsuarioExiste,
    existeProductoPorId,
    coleccionesPermitidas
}