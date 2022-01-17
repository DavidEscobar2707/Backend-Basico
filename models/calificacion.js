
const {Schema, model} = require('mongoose');

const CalificacionSchema = Schema({
    registro: {
        type: Schema.Types.ObjectId,
        ref: 'Registro',
        required: true
    },
    comentario: {
        type: String,
        default: true,
        required: true
    },
    estrellas: {
        type: Number,
        default: true,
        required: true
    }
})


CalificacionSchema.methods.toJSON = function() {
    const {__v, estado, ...data} = this.toObject();
    return data;
}



module.exports = model('Calificacion' , CalificacionSchema)