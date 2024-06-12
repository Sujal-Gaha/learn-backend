import bookModel from "../../models/book.model";
import { Request, Response } from "express";

const getAllBooks = async (req: Request, res: Response) => {
  try {
    const book = await bookModel.find();

    if (!book.length) {
      throw new Error("There are no books in the system!");
    }

    res.status(200).json({
      data: book,
      message: "Fetched all the books in the system!",
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

const getBookById = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const bookExist = await bookModel.findById(bookId);

    if (!bookExist) {
      throw new Error(`Book with the id: ${bookId} doesnot exist!`);
    }

    res.status(200).json({
      data: bookExist,
      message: `Fetched the todo with id: ${bookId} successfully!`,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      message: error.message || "Internal server error",
      success: false,
    });
  }
};

export default { getAllBooks, getBookById };
