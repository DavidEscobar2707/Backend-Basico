const mongoose = require('mongoose');

const conexion = async() => {
        await mongoose.connect(process.env.MONGODB_CNN, {
          useNewUrlParser: true,
          useUnifiedTopology: true
      }, (err, resp) => {
          if (err) throw err;
          console.log('Base de datos ONLINE');
      });
}
module.exports = {
    conexion
}