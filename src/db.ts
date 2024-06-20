import mongoose from "mongoose";

const setupDb = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    if (!MONGO_URI) {
      throw new Error("MONGO_URI not found in .env");
    }
    console.log("Connecting...");
    await mongoose.connect(MONGO_URI);
    console.log("Connected to the Database!");
  } catch (error: any) {
    console.log("Database connection error ", error.message);
    process.exit(1);
  }
};

export default setupDb;
