import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database: ${mongoose.connection.host}`);
  } catch (error) {
    console.error("Database Connection Error:", error.message);
    process.exit(1); 
  }
};

export default connectDb;

