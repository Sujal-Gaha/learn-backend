import express from "express";
import productMutation from "../controllers/product/mutation.js";
import productQuery from "../controllers/product/query.js";

const router = express.Router();

const { createProduct, deleteProduct, updateProduct } = productMutation;
const { getAllProducts, getProductById } = productQuery;

router.post("/create", createProduct);
router.get("/all", getAllProducts);
router.get("/:id", getProductById);
router.delete("/delete/:id", deleteProduct);
router.put("/update/:id", updateProduct);

export default router;
