
const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
    nombre: {
        type: String,
        required : [true, 'el nombre es obligatorio'],
        unique: true
    },
    direccion:{
        type: String,
        required : [true, 'La dirección es obligatoria']
    },
    pais:{
        type: String,
        required : [true, 'El pais es obligatorio']
    },
    ciudad:{
        type: String,
        required : [true, 'La ciudad es obligatoria']
    },
    telefono:{
        type: Number,
        required : [true, 'El telefono es obligatorio']
    },
    
    img: {
        type: String,
    },

    disponible:{
        type: Boolean,
        default: true
    },
    
    estado : {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    }
    

})


ProductoSchema.methods.toJSON = function() {
    const {__v, estado, ...data} = this.toObject();
    return data;
}



module.exports = model('Producto' , ProductoSchema)