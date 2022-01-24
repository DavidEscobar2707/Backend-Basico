
const {Schema,model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    nombreCompleto: {
        type: String,
        required: [true, 'El nombre completo es obligatorio']
    },
    pais: {
        type: String,
        required: [true, 'El pais es obligatorio']
    },
    ciudad: {
        type: String,
        required: [true, 'la ciudad es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'El correo es obligatorio']
    },
    password: {
        type: String,
        required: [true, 'la contraseña es obligatorio']
    },
    img: {
        type: String
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROL', 'VIAJERO_ROL', 'POSADERO_ROL']
    },
    estado:{
        type: Boolean,
        default: true
    },
    comentario: [{
        type: String,
    }],
    estrella: [{
        type: Number
    }]
})
UsuarioSchema.methods.toJSON = function() {
    const {__v, password, _id, ...usuario} = this.toObject();
    usuario.uid = _id;
    return usuario
}

module.exports = model('Usuario', UsuarioSchema,'persona')
