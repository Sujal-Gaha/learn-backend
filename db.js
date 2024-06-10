import mongoose from "mongoose";

const setupDb = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    console.log("Connecting...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to the Database!");
  } catch (error) {
    console.log("Database connection error ", error.message);
  }
};

export default setupDb;
