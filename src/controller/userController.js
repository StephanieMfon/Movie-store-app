import {
  createUserValidator,
  loginUserValidator,
} from "./../validators/userValidator.js";
import User from "../model/userModel.js";
import Movie from "./../model/movieModel.js";

import { mongoIdValidator } from "../validators/mongoIdValidator.js";
import { NotfoundError, BadUserRequestError } from "../error/error.js";
import bcrypt from "bcrypt";
// change the bcrypt to saving in a mongoose hook instead

export default class UserControllers {
  static async createUser(req, res, next) {
    const { error } = createUserValidator.validate(req.body);
    if (error) throw error;
    // Use the or mongodb operator to make this user.find email or username at once
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

    // fix up the things you need to fix up with JWT
    // return only username Id and movieWishList when user logs in
    res.status(200).json({
      status: "success",
      message: "User found",
      data: {
        user,
      },
    });
  }

  // return all the user details - the password.
  // Add the proper comments to all the code controllers and routes
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

    const { firstname, lastname, username, email } = user;

    res.status(200).json({
      message: "Login succesful",
      status: "success",
      data: {
        firstname,
        lastname,
        username,
        email,
      },
    });
  }
}
