import { Schema, model } from "mongoose";

const MovieGenreSchema = new Schema(
  {
    movieGenreName: {
      type: String,
      required: true,
      min: 3,
    },
    description: {
      type: String,
      required: true,
      min: 10,
    },
  },
  {
    timestamps: true,
  }
);

export default model("movieGenre", MovieGenreSchema);
