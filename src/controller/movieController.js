import Movie from "./../model/movieModel.js";
import { addNewMovieValidator } from "./../validators/movieValidator.js";
import { BadUserRequestError, NotfoundError } from "../error/error.js";
import { mongoIdValidator } from "../validators/mongoIdValidator.js";

export default class MovieController {
  static async addNewMovie(req, res) {
    const { error } = addNewMovieValidator.validate(req.body);
    if (error) throw error;
    const movieInCollection = await Movie.find({ title: req.body.title });
    console.log(movieInCollection);
    if (movieInCollection.length > 0) {
      return res.status(400).json({
        status: "success",
        message: "Movie already exists, use a different title",
        data: {
          movieInCollection,
        },
      });
    }

    const newMovie = await Movie.create(req.body);
    res.status(201).json({
      status: "success",
      message: "Movie added succesfully",
      data: {
        newMovie,
      },
    });
  }

  static async findAll(req, res, next) {
    const movies = await Movie.find();

    res.status(200).json({
      status: "success",
      result: movies.length,
      data: {
        movies,
      },
    });
  }
}
