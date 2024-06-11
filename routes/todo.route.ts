import express from "express";
import todoMutation from "../controllers/todo/mutation";
import todoQuery from "../controllers/todo/query";

const router = express.Router();

const { addTodo, deleteTodo, updateTodo, toggleTodoCompletion, deleteAll } =
  todoMutation;

const { getAllTodo, getTodoByid } = todoQuery;

router.post("/add", addTodo);
router.get("/all", getAllTodo);
router.get("/getById/:id", getTodoByid);
router.delete("/delete/:id", deleteTodo);
router.put("/update/:id", updateTodo);
router.put("/toggleCompletion/:id", toggleTodoCompletion);
router.delete("/destroy", deleteAll);

export default router;
