import dotenv from "dotenv";
import setupDb from "./db.js";
import express from "express";
import productRoute from "./routes/product.route.js";
dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json()); //middleware

setupDb()
  .then(() => {
    app.listen(PORT, () => console.log("Server started at port " + PORT));
  })
  .catch((error) => console.log("Error ", error.message));

//routes

app.use("/api/v1/products", productRoute);
