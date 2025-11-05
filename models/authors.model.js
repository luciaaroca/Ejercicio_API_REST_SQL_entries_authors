const queries = require('../queries/author.queries.js') // Queries SQL
const pool = require('../config/db_pgsql.js')

//Funciones asincronas, node.js espera las respuestas de las bases de datos
//GET -> ALL
const getAllAuthors = async () => {
    let client, result; //declarar variables (client= conexión a la base de datos./ result =guardará el resultado final)
    try {
        //client: objeto que permite ejecutar las query 
        client = await pool.connect(); // pool(pool de conexiones de PostgreSQL) /connect()Espera a abrir conexion
        const data = await client.query(queries.getAllAuthors) //ejecuta la QUERY (definid en quieries.js)
        result = data.rows //array de objetos con filas de la tabla (datos limpios - "SELECT"-> guardado en result
    } catch (err) {
        console.log(err);
        throw err;
    } finally {//cerramos la conexión -> es muy util en bases de datos
        client.release();
    }
    return result
}
//GET -> BY EMAIL
const getAuthorsbyEmail = async (email) => { //metemos un email ya que es lo que nos pasará el usuario
    let client, result; 
    try {
        client = await pool.connect(); // Esperar conexión de base de datos (client)
        const data = await client.query(queries.getAuthorsbyEmail, [email]) //esto lanza la querie sql (la tenemos en quieries)
        result = data.rows //resultado limpio
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally { //cerramos la conexión -> es muy util en bases de datos
        client.release();
    }
    return result
}

// PUT -> EDITAR author por EMAIL
const editAuthor = async (author)=>{
const {name, surname, email,image,oldEmail} = author;
let client, result; 
try {
        client = await pool.connect(); // Esperar conexión de base de datos (client)
        const data = await client.query(queries.editAuthor, [name, surname, email,image,oldEmail]) //esto lanza la querie sql (la tenemos en quieries)
        result = data.rowCount //resultado limpio
        
    } catch (err) {
        console.log(err);
        throw err;
    } finally { //cerramos la conexión -> es muy util en bases de datos
        client.release();
    }
    return result
}

//DELETE -> BORRAR author por EMAIL
const deleteAuthor= async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera conexión con la base de datos
        const data = await client.query(queries.deleteAuthor, [email]); // Lanza la query DELETE
        result = data.rowCount; // rowCount = cuántas filas fueron borradas
    } catch (err) {
        console.error('Error al eliminar el autor:', err);
        throw err;
    } finally {
        client.release(); // Libera la conexión al pool
    }
    return result; // Devuelve 1 si se borró, 0 si no se encontró
};
//POST -> CREAR author por EMAIL
const createAuthor = async (author) =>{
    const { name, surname, email, image } = author;
    let client, result;
    try{
        client = await pool.connect(); // Espera conexión con la base de datos
        const data = await client.query(queries.createAuthor, [name, surname, email, image ]); // Lanza la query DELETE
        result = data.rowCount; // rowCount = cuántas filas fueron creadas (si es 1 ha sido exitoso)
    }catch(error){
        console.error('Error al crear el autor:', error);
        throw error;
    }finally {
        client.release(); // Libera la conexión al pool
    }
    return result; // Devuelve 1 si se borró, 0 si no se encontró

}
const entries = {
   getAuthorsbyEmail,
   getAllAuthors,
   editAuthor,
   deleteAuthor,
   createAuthor
}


module.exports = entries;