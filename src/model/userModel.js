import { Schema, Query, model, Types } from "mongoose";

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      min: 3,
      max: 255,
      trim: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      immutable: true,
      lowercase: true,
      unique: true,
      unique: true,
      trim: true,
      match: [
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        "Invalid password, Try again",
      ],
    },
    movieWishlist: [
      {
        type: Types.ObjectId,
        ref: "Movie",
      },
    ],
    firstname: {
      type:String,
      trim:true
    },
    lastname: {
      type:String,
      trim:true
    },
    fullname: String,
  },

  {
    timestamps: true,
  }
);

export { UserSchema };

UserSchema.pre(/^find/, function (next) {
  if (this instanceof Query) {
    this.where({ isDeleted: { $ne: true } });
  }
  next();
});

UserSchema.pre("save", function (next) {
  this.fullname = this.firstname + " " + this.lastname;
  next();
});

export default model("User", UserSchema);
