import express from 'express';
import { Db } from 'mongodb';
import { getAllMovies, getMoviesById, createMovies, deleteMovies, updateMovies } from '../services/movies.service.js';
const router = express.Router();

//Movies
router.get("/", async function (request, response) {
    //db.movies.find({ name: 'The Avengers'})
    if (request.query.rating) {
        request.query.rating = +request.query.rating;
    }
    console.log(request.query);
    const allMovies = await getAllMovies();

    response.send(allMovies)
});




//Movie by ID
router.get("/:id", async function (request, response) {
    const { id } = request.params;
    // console.log(request.params, id);
    // const movie = movies.find((mv) => mv.id === id);
    // response.send(movie);

    const movie = await getMoviesById(id)

    console.log(movie);
    movie ?
        response.send(movie)
        : response.status(404).send({ msg: "Not Found" });
});

//create Movies

router.post("/", express.json(), async function (request, response) {
    const data = request.body;
    console.log(data);
    const result = await createMovies(data)
    response.send(result)
});



///delete Movies
router.delete("/:id", async function (request, response) {
    const { id } = request.params;
    // console.log(request.params, id);
    // db.movies.deleteOne

    const result = await deleteMovies(id)

    console.log(result);
    result.deletedCount > 0
        ? response.send({ msg: " Movie deleted successfully" })
        : response.status(404).send({ msg: "Not Found" });
});


// Put operation
router.put("/:id", async function (request, response) {
    const { id } = request.params;
    const data = request.body;
    // console.log(request.params, id);
    // const movie = movies.find((mv) => mv.id === id);
    // response.send(movie);

    const updatedresult = await updateMovies(id, data);

    console.log(updatedresult);
    updatedresult
        ? response.send({ updatedresult })
        : response.status(404).send({ msg: "Movie Not Found" });
});


export default router;
