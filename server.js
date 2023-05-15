import app from "./app";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
const DB = process.env.DATABASE_URL.replace(
  "<password>",
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Application securely connected to database"))
  .catch((err) => console.log(err.message));

const port = Number(process.env.port) || 4000;

app.listen(port, () => {
  console.log(`Server currently running on port ${port}`);
});
