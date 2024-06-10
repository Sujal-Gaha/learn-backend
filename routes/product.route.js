import express from "express";
import productControllers from "../controllers/products/mutation.js";

const router = express.Router();

const { createProduct } = productControllers;

router.post("/create", createProduct);

export default router;
