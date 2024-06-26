import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 4,
      maxLength: 40,
    },
    description: {
      type: String,
      required: true,
      minLength: 8,
      maxLength: 100,
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

const todoModel = mongoose.model("todo", todoSchema);

export default todoModel;
