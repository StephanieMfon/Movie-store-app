import express from "express";
import UserControllers from "../controller/userController.js";
import { tryCatchFunction } from "../utils/tryCatchHandler.js";

const router = express.Router();

router.post("/create", tryCatchFunction(UserControllers.createUser));
router.patch(
  "/add-to-wishlist",
  tryCatchFunction(UserControllers.addMovieToWishlist)
);
router.get("/login", tryCatchFunction(UserControllers.loginUser));
router.get("/find", tryCatchFunction(UserControllers.findUser));

export { router };
