const { Pool } = require('pg');

require('dotenv').config()
// console.log(process.env);

// Datos de conexión
const pool = new Pool({ 
    host: process.env.DB_HOST, 
    user: process.env.DB_USER, 
    database: process.env.DB_DATABASE, 
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD
})


module.exports = pool; //exportando
