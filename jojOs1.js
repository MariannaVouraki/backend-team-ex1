const Joi = require("joi");
const express = require("express");
const app = express();

app.use(express.json());               //Middleware. Το χρησιμοποιούμε για να 
                                       //μετατρέψουμε σε json τα δεδομένα που μας στέλνουν

const movies = [
    { id: 1, title: "John Wick" },
    { id: 2, title: "Knives out" },
    { id: 3, title: "Saw" }
];
const genres = [
    {id: 1, genre: "Action" },
    {id: 2, genre: "Adventure" },
    {id: 3, genre: "Comedy" },
    {id: 4, genre: "Crime" },
    {id: 5, genre: "Drama" },
    {id: 6, genre: "horror" },
    {id: 7, genre: "Musical" }
 ];  

app.get("/movies", (request, response) => {         //Στέλνουμε ως απάντηση ολο τον πινακα..      
    response.send(movies);           
});

//Στελνουμε ως απαντηση μια ταινια με συγκεκριμένο ID
app.get("/movies/:id", (request, response) => {
    const movie = movies.find(c => c.id === parserInt(request.params.id));             // Ψαχνω για την ταινια 
    if (!movie) return result.status(404).send("The movie with the given ID was not found");   // Αν δεν υπαρχει , επιστρεφει 404 
    response.send(movie);
});
app.post("/movies", (request, response) => {
    const { error } = validateMovie(request.body);  //result.error 
    //Αν ειναι ακυρη τοτε επιστρεφω 400 - Bad request
    if (error) return result.status(400).send(error.details[0].messege); 

    const movie = {
        id: movies.length + 1,   //Βάζουμε ως id το μέγεθος του πίνακα + 1
        title: request.body.title  //Παίρνουμε τον τίτλο από το σώμα της αίτησης HTTP
    };

  //Έλεγχος αν μας έστειλαν τον τίτλο της ταινίας στο σώμα της αίτησης
  //Αν όχι, επιστρέφουμε κωδικό 400 (Bad request), και μήνυμα λάθους
    if (!request.body.title || request.body.title.length < 4) {
        return response.status(400).send("Title is required and should de minimum 5 characters.");
  } 
  
  //Προσθέτουμε τη νέα ταινία στον πίνακα και την επιστρέφουμε στην απάντηση
    movies.push(movie);
    response.send(movie);
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});

app.put("/movies/:id", (request, response) => {
    const movie = movies.find(c => c.id === parserInt(request.params.id));             // Ψαχνω για την ταινια 
    if (!movie) return result.status(404).send("The movie with the given ID was not found");   // Αν δεν υπαρχει , επιστρεφει 404 

    const { error } = validateMovie(request.body);  //result.error 
    //Αν ειναι ακυρη τοτε επιστρεφω 400 - Bad request
    if (error) return response.status(400).send(error.details[0].messege); 

    movie.title = request.body.title;//Ενημερώνω τον πινακα με τις ταινιες 
    response.send(movie); //Επιστρεφω την νεα  ταινια 

});

app.delete("/movies/:id", (request, response) => {
    const movie = movies.find(c => c.id === parserInt(request.params.id));             // Ψαχνω για την ταινια 
    if (!movie) return result.status(404).send("The movie with the given ID was not found");   // Αν δεν υπαρχει , επιστρεφει 404 

    const index = movies.indexOf(movie);     //Αλλιως, διαγραφω την ταινια 
    movies.splice(index, 1);

    response.send(movie);//Επιστρεφω την ταινια 
});


function validateMovie(movie){
    const schema = {
        name: Joi.string().min(5).required()
    };

    return Joi.validate(movie, schema);
}
// !!Εδω εφαρμόζουμε τις ίδιες μεθόδους CRUD για το πινακα genres!!

app.get("/genres", (request, result) => {
    result.send(genres);    //Στέλνουμε στην απάντηση όλο τον πίνακα με τα ειδη των ταινιών
    });

app.get("/genres/:id", (request, result) => {
    const genre = genres.find(c => c.id === parserInt(request.params.id));             // Ψαχνω για  ειδος 
    if (!genre) return result.status(404).send("The movie with the given ID was not found");   // Αν δεν υπαρχει , επιστρεφει 404 
    result.send(genre);//Αλλιως επιστρεφει το ειδος
});
app.post("/genres", (request, result) => {
    const { error } = validateGerne(request.body);  //result.error 
    //Αν ειναι ακυρη τοτε επιστρεφω 400 - Bad request
    if (error) return result.status(400).send(error.details[0].messege); 

    const gerne = {
        id: genres.length + 1,   //Βάζουμε ως id το μέγεθος του πίνακα + 1
        title: request.body.title  //Παίρνουμε τον τίτλο από το σώμα της αίτησης HTTP
    };

  //Έλεγχος αν μας έστειλαν τον τίτλο της ταινίας στο σώμα της αίτησης
  //Αν όχι, επιστρέφουμε κωδικό 400 (Bad request), και μήνυμα λάθους
    if (!request.body.title || request.body.title.length < 4) {
        return result.status(400).send("Title is required and should de minimum 5 characters.");
  } 
  
  //Προσθέτουμε τη νέα ταινία στον πίνακα και την επιστρέφουμε στην απάντηση
    genres.push(gerne);
    result.send(genre);
});
app.put("/genres/:id", (request, response) => {
    const genre = genres.find(c => c.id === parserInt(request.params.id));             // Ψαχνω για την ταινια 
    if (!genre) return result.status(404).send("The movie with the given ID was not found");   // Αν δεν υπαρχει , επιστρεφει 404 

    const { error } = validateGerne(request.body);  //result.error 
    //Αν ειναι ακυρη τοτε επιστρεφω 400 - Bad request
    if (error) return result.status(400).send(error.details[0].messege); 

    genre.genre = request.body.title;//Ενημερώνω τον πινακα με τις ταινιες 
    response.send(genre); //Επιστρεφω την νεα  ταινια 

});
app.delete("/genres/:id", (Request, response) => {
    const gerne = genres.find(c => c.id === parserInt(request.params.id));             // Ψαχνω για την ταινια 
    if (!genre) return result.status(404).send("The genre with the given ID was not found");   // Αν δεν υπαρχει , επιστρεφει 404 

    const index = genres.indexOf(genre);     //Αλλιως, διαγραφω το ειδος 
    genres.splice(index, 1);

    response.send(genre);//Επιστρεφω το ειδος 
});
// Εδω για καποιο λογο δεν δεχεται το ονομα της συναρτησης..
function validateGenre(genre){
    const schema = {
        name: Joi.string().min(5).required()
    };

    return Joi.validate(genre, schema);
}
