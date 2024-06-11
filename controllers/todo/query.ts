import todoModel from "../../models/todo.model";
import TErrorResponse from "../../type/TErrorResponse";
import { Request, Response } from "express";

const getAllTodo = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    const errorResponse: TErrorResponse = {
      data: null,
      message: error.message || "Internal server error",
      success: false,
    };

    res.status(500).json(errorResponse);
  }
};

const getTodoByid = async (req: Request, res: Response) => {
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
  } catch (error: any) {
    const errorResponse: TErrorResponse = {
      data: null,
      message: error.message || "Internal server error",
      success: false,
    };

    res.status(500).json(errorResponse);
  }
};

export default { getAllTodo, getTodoByid };
