import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { router as userRouter } from "./src/router/user.route.js";
import { router as movieRouter } from "./src/router/movie.route.js";
import mongoose from "mongoose";
import { globalErrorHandler } from "./src/utils/errorHandler.js";
const app = express();
dotenv.config();

const DB = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB)
  .then(() => console.log("Database securely connected"))
  .catch((err) => console.log(err.message));
const port = Number(process.env.PORT) || 4000;
app.use(express.json());
app.use(morgan("dev"));
app.use("/api/v1/user", userRouter);
app.use("/api/v1/movie", movieRouter);
app.use(globalErrorHandler);
app.listen(port, () => {
  console.log(`Application currently running on port ${port}`);
});
