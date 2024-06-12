import bookModel from "../../models/book.model";
import { Request, Response } from "express";

const addOneBook = async (req: Request, res: Response) => {
  try {
    const { title, author, genre, summary, completed } = req.body;

    if (!title || !author) {
      throw new Error("Please enter all the fields properly!");
    }

    const book = await bookModel.create({
      title,
      author,
      genre,
      summary,
      completed,
    });

    res.status(200).json({
      data: book,
      message: "Added the book successfully!",
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

const deleteBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const bookExist = await bookModel.findById(bookId);

    if (!bookExist) {
      throw new Error(`Book with the id: ${bookId} doesnot exist!`);
    }

    await bookModel.findByIdAndDelete(bookId);

    res.status(200).json({
      data: bookExist,
      message: `Deleted the book with id: ${bookId} successfully!`,
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

const updateBook = async (req: Request, res: Response) => {
  try {
    const bookId = req.params.id;
    const book = await bookModel.findById(bookId);

    if (!book) {
      throw new Error(`Book with the id: ${bookId} doesnot exist!`);
    }

    await bookModel.findByIdAndUpdate(bookId, req.body);

    res.status(200).json({
      data: book,
      message: `Updated the book with id: ${bookId} successfully!`,
      success: true,
    });
  } catch (error: any) {
    res.status(500).json({
      data: null,
      message: error.message || "Internal server error",
    });
  }
};

const deleteAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookModel.find();

    if (!books.length) {
      throw new Error("There are no books in the system to delete!");
    }

    await bookModel.deleteMany({});

    res.status(200).json({
      data: [],
      message: "Deleted all the book from the system",
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

export default { addOneBook, deleteBook, updateBook, deleteAllBooks };
