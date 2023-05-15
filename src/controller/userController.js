import {
  userValidator,
  loginUserValidator,
} from "./../validators/userValidator.js";
import User from "./../model/userModel.js";
import Movie from "./../model/movieModel.js";

import { mongoIdValidator } from "../validators/mongoIdValidator.js";
import { NotfoundError, BadUserRequestError } from "../error/error.js";
import bcrypt from "bcrypt";

export default class UserControllers {
  static async createUser(req, res, next) {
    const { error } = userValidator.validate(req.body);
    if (error) throw error;

    const emailExists = await User.find({ email: req.body.email });
    if (emailExists.length > 0)
      throw new BadUserRequestError("A user with that email alraedy exists");

    const usernameExists = await User.find({ email: req.body.username });
    if (usernameExists.length > 0)
      throw new BadUserRequestError("A user with that email alraedy exists");
    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(req.body.password, saltRounds);

    const user = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    };
    const newUser = await User.create(user);
    res.status(201).json({
      status: "Success",
      message: "Account creation successful",
      data: {
        user: newUser,
      },
    });
  }

  static async findUser(req, res) {
    const { id } = req.query;
    const { error } = mongoIdValidator.validate(req.query);
    if (error) throw error;
    const user = User.findById(id);
    if (!user) throw new NotfoundError(`User with Id ${id} not found`);

    res.status(200).json({
      status: "success",
      message: "User found",
      data: {
        user,
      },
    });
  }
  static async addMovieToWishlist(req, res, next) {
    const { id } = req.query;
    // const { err } = mongoIdValidator.validate(req.query);
    // if (err) throw err;

    const movieInCollection = await Movie.find({
      _id: req.body.selectedMovieId,
    });
    if (!movieInCollection)
      throw new NotfoundError("Please input a valid movie ID");

    // const movieInWishlist = await User.find({
    //   "movieWishlist[0]._id": "req.body.selectedMovieId",
    // });
    // if (movieInWishlist) {
    //   throw new BadUserRequestError(
    //     "This movie already exists in your wishlist"
    //   );
    // }
    const user = await User.updateOne(
      {
        _id: id,
      },
      { $push: { movieWishlist: req.body.selectedMovieId } }
    );
    res.status(200).json({
      status: "success",
      message: " Movie wishlist updated",
      data: {
        user,
      },
    });
  }

  static async loginUser(req, res) {
    const { error } = loginUserValidator.validate(req.body);
    if (error) throw error;

    if (!req.body?.username && !req.body?.email)
      throw new BadUserRequestError("Input a username or email");

    const user = await User.findOne({
      $or: [{ email: req.body?.email }, { username: req.body?.username }],
    }).populate([{ path: "movieWishlist", strictPopulate: true }]);

    const hash = bcrypt.compareSync(req.body.password, user.password);
    if (!hash)
      throw new BadUserRequestError("Incorrect username, email or password");

    res.status(200).json({
      message: "Login succesful",
      status: "success",
      data: {
        user,
      },
    });
  }
}
