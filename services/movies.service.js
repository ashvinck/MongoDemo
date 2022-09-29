import { client } from '../index.js';

export async function updateMovies(id, data) {
    return await client
        .db("exMongo")
        .collection("movies")
        .updateOne({ id: id }, { $set: data });
}
export async function deleteMovies(id) {
    return await client
        .db("exMongo")
        .collection("movies")
        .deleteOne({ id: id });
}
export async function createMovies(data) {
    return await client
        .db("exMongo")
        .collection("movies")
        .insertOne(data);
}
export async function getMoviesById(id) {
    return await client
        .db("exMongo")
        .collection("movies")
        .findOne({ id: id });
}
export async function getAllMovies() {
    return await client
        .db("exMongo")
        .collection("movies")
        .find({})
        .toArray();
}
