const author = require('../models/authors.model'); // Importar el modelo de la BBDD

//GET getAllAuthors --> http://localhost:3000/api/authors
//GET getAuthorsbyEmail ---> http://localhost:3000/api/authors?email=hola@gmail.com 
const getAuthors = async (req, res) => { 
    try{
    let authors;
    if (req.query.email) {//req(datos que envia el cliente)-si la request query tiene email
        authors = await author.getAuthorsbyEmail(req.query.email);
    }
    else {//si no tiene email la req del cliente--> se envian todas las authors
        authors = await author.getAllAuthors ();
    }
    res.status(200).json(authors); // [] con las authors encontradas
    }catch(error){
       console.error('Error al buscar Author:', error);
       res.status(500).json({ error: 'Error interno del servidor' }); 
    }
    
}

//PUT editAuthor --> http://localhost:3000/api/authors
/*Ejemplo de objeto (el old title hay que cambiarlo):
{
  "name": "Lucía",
  "surname": "Aroca",
  "email":"lucia@gmail.com",
  "image":"https://randomuser.me/api/portraits/thumb/men/34.jpg",
  "oldEmail": "birja@thebridgeschool.es"
}*/ 


const editAuthor = async(req,res) =>{
    try {
        const {name, surname, email,image,oldEmail} = req.body;
        const result = await author.editAuthor({name, surname, email,image,oldEmail});
         if (result > 0) {
            res.status(200).json({ message: `Author actualizado correctamente ${email}` });
        } else {
            res.status(404).json({ message: 'No se encontró ningun author con ese email' });
        }
    }catch(error){
        console.error('Error al actualizar este autor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

//DELETE deleteAuthor (por email) ---> http://localhost:3000/api/authors/email
const deleteAuthor = async(req,res) =>{
    // console.log(req.params.email);
    try {
        const  email  = req.params.email;
        if (!email) {//si no hay email
            return res.status(400).json({ message: "Debe especificar un email-> /email" });  
        }
        const result = await author.deleteAuthor(email);
        if (result > 0) { //si result es mayor que 0 (te asegura que las filas borradas son +0)
            res.status(200).json({ message: `Se ha borrado correctamente: ${email}`});
        }
        else {//si las filas borradas (result) son -0 te dice que no se ha encontrado ese title
          res.status(404).json({ message: "No se encontró ningún autor con ese email" });
        }
    }catch(error){
        console.error('Error al borrar autor:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}

/*!!!lo que vamos a tener que poner como query en pgAdmin para que nos
 deje borrar ya que id_authors es una clave foránea de entries y no permite borrarlo

 -- Elimina la restricción actual (que impide borrar autores)
ALTER TABLE entries
DROP CONSTRAINT entries_id_author_fkey;

-- Crea una nueva restricción que pone id_author en NULL
-- cuando se borra un autor
ALTER TABLE entries
ADD CONSTRAINT entries_id_author_fkey
FOREIGN KEY (id_author)
REFERENCES authors(id_author)
ON DELETE SET NULL;
 */

//POST createAuthor --> http://localhost:3000/api/authors
const createAuthor = async(req,res) =>{
    try {
        const {name, surname, email, image} = req.body;
        if (!name || !surname || !email || !image) {
            return res.status(400).json({
                message: "Faltan datos obligatorios (name, surname ,email o image)",
            });
        }
        const result = await author.createAuthor({name, surname, email, image});

         if (result > 0) {
            res.status(201).json({ message: `Author creado correctamente ${email}` });
        } else {
            res.status(404).json({ message: 'No se fue posible crear este author' });
        }
    }catch(error){
        console.error('Error al crear este author:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}




module.exports = {
  getAuthors,
  editAuthor,
  deleteAuthor,
  createAuthor
}