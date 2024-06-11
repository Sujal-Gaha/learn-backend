import todoModel from "../../models/todo.model.js";

const addTodo = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || !description) {
      throw new Error("Please fill in all the fields properly!");
    }

    await todoModel.create({ title, description });

    res.status(200).json({
      data: req.body,
      message: "Added todo successfully!",
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

const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todoExist = await todoModel.findById(todoId);

    if (!todoExist) {
      throw new Error(`Todo with the id: ${todoId} doesnot exist!`);
    }

    await todoModel.findByIdAndDelete(todoId);

    res.status(200).json({
      data: todoExist,
      message: `Deleted the todo with id: ${todoId} successfully!`,
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

const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todoExist = await todoModel.findById(todoId);

    if (!todoExist) {
      throw new Error(`Todo with the id: ${todoId} doesnot exist!`);
    }

    await todoModel.findByIdAndUpdate(todoId, req.body);

    res.status(200).json({
      data: todoExist,
      message: "Updated todo successfully!",
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

const toggleTodoCompletion = async (req, res) => {
  try {
    const todoId = req.params.id;
    const todoExist = await todoModel.findById(todoId);

    if (!todoExist) {
      throw new Error(`Todo with the id: ${todoId} doesnot exist!`);
    }

    todoExist.completed = !todoExist.completed;
    await todoExist.save();

    res.status(200).json({
      data: todoExist,
      message: `Updated the todo with id: ${todoId} successfully!`,
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

const deleteAll = async (req, res) => {
  try {
    const todos = await todoModel.find();

    if (!todos.length) {
      throw new Error("No todos to delete!");
    }

    await todoModel.deleteMany({});

    res.status(200).json({
      data: [],
      message: "Deleted all the todo",
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

export default {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodoCompletion,
  deleteAll,
};
