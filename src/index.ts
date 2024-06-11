import dotenv from "dotenv";
import setupDb from "./db";
import express from "express";
import productRoute from "../routes/product.route";
import todoRoute from "../routes/todo.route";
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
app.use("/api/v1/product", productRoute);
app.use("/api/v1/todo", todoRoute);
