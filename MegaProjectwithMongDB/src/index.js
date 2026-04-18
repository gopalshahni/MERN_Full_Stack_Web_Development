import dotenv from "dotenv";
import app from './app.js';
import connectDB from './db/db.js'
dotenv.config({
    path : "./.env"
}); // no need for path if .env is in root
const port = process.env.PORT || 3000;

 
connectDB()
  .then(
    app.listen(port, () => {
      console.log(`listening at port http://localhost:${port}`);
    }),
  ) 
  .catch((err) => {
    console.error("error mongoDb connection:");
    process.exit(1);
  });  