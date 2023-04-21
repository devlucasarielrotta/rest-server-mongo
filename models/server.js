import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import {router} from '../routes/usuarios.routes.js'
import { dbConnection } from '../database/config.js';

dotenv.config();

class Server {

    constructor(){

        this.app  = express();
        this.port = process.env.PORT
        this.usuariosRoutesPath = '/api/usuarios'
        
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

       this.app.use(this.usuariosRoutesPath, router)

    }
    
    listen(){

        this.app.listen(this.port, () => {
            console.log(`Listening on http://localhost:${this.port}`)
        })

    }
}

export default Server