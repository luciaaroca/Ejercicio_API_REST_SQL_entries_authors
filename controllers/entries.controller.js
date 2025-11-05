const entry = require('../models/entries.model'); // Importar el modelo de la BBDD

//GET getallEntries --> http://localhost:3000/api/entries
//GET getEntriesbyEmail ---> http://localhost:3000/api/entries?email=hola@gmail.com 
const getEntries = async (req, res) => { 
    try{
    let entries;
    if (req.query.email) {//req(datos que envia el cliente)-si la request query tiene email
        entries = await entry.getEntriesByEmail(req.query.email);
    }
    else {//si no tiene email la req del cliente--> se envian todas las entries
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); // [] con las entries encontradas
    }catch(error){
       console.error('Error al buscar entry:', error);
       res.status(500).json({ error: 'Error interno del servidor' }); 
    }
    
}
//PUT editEntry--> http://localhost:3000/api/entries
/*Ejemplo de objeto (el old title hay que cambiarlo):
{
  "title": "noticia actualizada desde Thunder",
  "content": "Este es el nuevo contenido actualizado desde Thunder Client",
  "category": "actualidad",
  "oldTitle": "Amanece Madrid lleno de arena"
}*/ 

const editEntry = async(req,res) =>{
    try {
        const {  title, content, category,oldTitle } = req.body;
        const result = await entry.editEntry({ title, content, category,oldTitle});
         if (result > 0) {
            res.status(200).json({ message: `Se ha modificado la entry ${title}` });
        } else {
            res.status(404).json({ message: 'No se encontró ninguna entry con ese título' });
        }
    }catch(error){
        console.error('Error al actualizar entry:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
//DELETE deleteEntry (por title) --->http://localhost:3000/api/entries/:title
const deleteEntry = async(req,res) =>{
    // console.log(req.params.title);
    try {
        const  title  = req.params.title;
        if (!title) {//si no hay title
            return res.status(400).json({ message: "Debe especificar un título en la query /title" });  
        }
        const result = await entry.deleteEntry(title);
        if (result > 0) { //si result es mayor que 0 (te asegura que las filas borradas son +0)
            res.status(200).json({ message: `Se ha borrado la entry ${title}` });
        }
        else {//si las filas borradas (result) son -0 te dice que no se ha encontrado ese title
          res.status(404).json({ message: "No se encontró ninguna entry con ese título" });
        }
    }catch(error){
        console.error('Error al borrar entry:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

module.exports = {
    getEntries, 
    editEntry,
    deleteEntry
}