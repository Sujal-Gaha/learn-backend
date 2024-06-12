import express from "express";
import bookMutation from "../controllers/bookManagementSystem/mutation";
import bookQuery from "../controllers/bookManagementSystem/query";

const router = express.Router();

const { getAllBooks, getBookById } = bookQuery;
router.get("/all", getAllBooks);
router.get("/:id", getBookById);

const { addOneBook, deleteBook, updateBook, deleteAllBooks } = bookMutation;
router.post("/create", addOneBook);
router.delete("/delete/:id", deleteBook);
router.put("/update/:id", updateBook);
router.delete("/destroy", deleteAllBooks);

export default router;
