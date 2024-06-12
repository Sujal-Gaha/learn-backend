import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedDate: {
      type: Date,
      default: Date.now,
      immutable: true,
    },
    genre: {
      type: String,
      default: "Unknown",
    },
    summary: {
      type: String,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const bookModel = mongoose.model("book-management-system", bookSchema);

export default bookModel;
