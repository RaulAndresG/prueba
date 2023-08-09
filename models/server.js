const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const {dbConnection} = require('../database/config.js');

class Server {

    constructor(){
        this.app = express();
       
        this.port = process.env.PORT

        this.paths = {
            Camper:'/api/campers',
            Centro:'/api/centros',
            Level:'/api/levels',



        }
        this.connectDB();
        this.middlewares();
        this.routes();
    }

    async connectDB(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public'));

        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/'
        }));
    }

    routes(){
       this.app.use(this.paths.Camper, require('../routes/camper.routes.js'));
       this.app.use(this.paths.Centro, require('../routes/centro.routes.js'));
       this.app.use(this.paths.Level, require('../routes/level.routes.js'));



    }

    listen(){
        this.app.listen(this.port, ()=>{
            console.log(`SERVER RUNNING ON PORT: ${this.port}`);
        })
    }

}

module.exports = Server;