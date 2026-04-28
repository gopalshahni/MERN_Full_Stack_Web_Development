import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./src/db/index.js";
dotenv.config({ path: "./.env" });

const PORT = process.env.PORT || 7000;

connectDB()
  .then(() => {
    app.listen(`${PORT}`, () => {
      console.log(`Server is running at at Port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MongoDB error", err);
  });
