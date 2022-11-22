const {Pool} = require('pg');
let URI = '';

const {config}  = require('./../config/config.js')
if(config.isProd){
        URI = config.dbUrl
}
else{
        const USER = encodeURIComponent(config.dbUser)
        const PASSWORD = encodeURIComponent(config.dbPassword)
        URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
}

const pool = new Pool({ connectionString: URI });

/* const pool = new Pool({
        host: 'localhost',
        port: 5432,
        user: 'nico',
        password: 'admin123',
        database : 'my_store'
}); */

module.exports = pool

