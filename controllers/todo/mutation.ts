import todoModel from "../../models/todo.model";
import TErrorResponse from "../../type/TErrorResponse";
import { Request, Response } from "express";

const addTodo = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    const errorResponse: TErrorResponse = {
      data: null,
      message: error.message || "Internal server error",
      success: false,
    };

    res.status(500).json(errorResponse);
  }
};

const deleteTodo = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    const errorResponse: TErrorResponse = {
      data: null,
      message: error.message || "Internal server error",
      success: false,
    };

    res.status(500).json(errorResponse);
  }
};

const updateTodo = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    const errorResponse: TErrorResponse = {
      data: null,
      message: error.message || "Internal server error",
      success: false,
    };

    res.status(500).json(errorResponse);
  }
};

const toggleTodoCompletion = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    const errorResponse: TErrorResponse = {
      data: null,
      message: error.message || "Internal server error",
      success: false,
    };

    res.status(500).json(errorResponse);
  }
};

const deleteAll = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    const errorResponse: TErrorResponse = {
      data: null,
      message: error.message || "Internal server error",
      success: false,
    };

    res.status(500).json(errorResponse);
  }
};

export default {
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodoCompletion,
  deleteAll,
};
