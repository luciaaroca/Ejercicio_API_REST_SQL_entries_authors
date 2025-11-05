//NODE UTILIANDO EXPRESS.js--> CON LOQ EU MONTAREMOS NUESTRAS APIS
//aqui se pone la configuración
const express = require('express')//importando express(lo hemos coopiado de su pagnia)
const app = express()//creando servidor
const port = 3000//puerto de pruebas

//Importamos Middlewares-error404
const error404 =require("./middlewares/error404");


//Importamos Middlewares-morgan
const morgan= require("./middlewares/morgan");
// Configuración del logger con Morgan
app.use(morgan(':method :url :status :param[id] - :response-time ms :body'));


//habilitar recepción de objetos de json por mi backend
//parsear el body entrante a json
app.use(express.json());




//HABILITAR RUTAS
const entriesRoutes = require("./routes/entries.routes"); //importamos los datos de entries.routes
app.use("/api/entries", entriesRoutes); //definimos la estructura de la url

const authorsRoutes = require("./routes/authors.routes");//importamos datos de authors.routes
app.use("/api/authors",authorsRoutes ); //definimos la estructura de la url

app.use(error404); //manejo de rutas no encontradas (middleware)


app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});