import todoModel from "../../models/todo.model.js";

const getAllTodo = async (req, res) => {
  try {
    const todos = await todoModel.find();

    if (!todos.length) {
      throw new Error("There is no todo!");
    }

    res.status(200).json({
      data: todos,
      message: "Fetched all todos successfully!",
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

const getTodoByid = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todoExist = await todoModel.findById(todoId);

    if (!todoExist) {
      throw new Error(`Todo with the id: ${todoId} doesnot exist!`);
    }

    res.status(200).json({
      data: todoExist,
      message: `Fetched the todo with id: ${todoId} successfully!`,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      data: null,
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

export default { getAllTodo, getTodoByid };
