import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { routerAuth,routerBuscar,routerCategoria,routerProductos,routerUsuario } from '../routes/index.routes.js';

import { dbConnection } from '../database/config.js';

dotenv.config();

class Server {

    constructor(){

        this.app  = express();
        this.port = process.env.PORT
        this.paths = {
            auth:       '/api/auth',
            usuarios:   '/api/usuarios',
            categorias: '/api/categorias',
            productos: '/api/productos'
        }
        // this.usuariosRoutesPath = '/api/usuarios'
        // this.authPath = '/api/auth'
        // this.categoriasPath = '/api/categorias'
        //conectar a la base de datos
        


        //Middlewares
        this.middlewares();

        //Rutas de la app
        this.routes();

    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares(){

        // cors midlde ware
        this.app.use(cors());

        //Lecutra y parseo del body
        this.app.use(express.json())

        //Directorio publico
        this.app.use(express.static('public'))
    }

    routes() {

       this.app.use(this.paths.auth, routerAuth)
       this.app.use(this.paths.usuarios, routerUsuario)
       this.app.use(this.paths.categorias, routerCategoria)
       this.app.use(this.paths.productos, routerProductos)
       this.app.use(this.paths.productos, routerBuscar)

    }
    
    listen(){

        this.app.listen(this.port, () => {
            console.log(`Listening on http://localhost:${this.port}`)
        })

    }
}

export default Server