import Router from "express";
import MovieController from "../controller/movieController.js";
import { tryCatchFunction } from "../utils/tryCatchHandler.js";

const router = Router();

router.post("/create", tryCatchFunction(MovieController.addNewMovie));
router.get("/find", tryCatchFunction(MovieController.findAll));

export { router };
