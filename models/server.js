const express = require('express')
const cors = require('cors')
const fileUpload = require('express-fileupload')

const {conexion} = require('../database/config')

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            calificacion: '/api/calificacion',
            categorias: '/api/categorias',
            productos: '/api/productos',
            registros: '/api/registros',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'         
        }


        this.conexionBD();

        //Middlewares
        this.middlewares();
        //rutas de la app
        this.routes();
    }

    async conexionBD() {
        await conexion()
    }

    middlewares() {
        //cors
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use(express.json());
        //directorio publico
        this.app.use(express.static('public'));
        //carga de archivos fileUpload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }
    routes () {
        this.app.use(this.paths.auth , require('../routes/auth.routes'));
        this.app.use(this.paths.calificacion , require('../routes/calificacion.routes'));
        this.app.use(this.paths.categorias , require('../routes/categorias.routes'));
        this.app.use(this.paths.productos , require('../routes/productos.routes'));
        this.app.use(this.paths.registros , require('../routes/registros.routes'));
        this.app.use(this.paths.usuarios , require('../routes/usuarios.routes'));
        this.app.use(this.paths.uploads , require('../routes/uploads.routes'));
    }
    listen () {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en: http://localhost:${this.port}`)
        });
    }
}

module.exports = Server;