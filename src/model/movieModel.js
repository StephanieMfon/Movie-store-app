import { Schema, model, Types, Query } from "mongoose";

const MovieModelSchema = Schema(
  {
    movieGenreId: {
      type: Types.ObjectId,
    },
    genre: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      enum: ["started", "in-progress", "completed"],
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 10,
    },
    movieLength: {
      type: String,
      required: true,
    },
    yearReleased: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

MovieModelSchema.pre(/^find/, function (next) {
  if (this instanceof Query) {
    this.where({ isDeleted: { $ne: true } });
  }
  next();
});
export default model("Movie", MovieModelSchema);
