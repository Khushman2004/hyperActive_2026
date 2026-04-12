import mongoose from "mongoose";

import dotenv from "dotenv";
dotenv.config();

mongoose.set("strictQuery", true);

async function connectDB() {
    try {
        // console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI);
    family: 4,
    console.log("✅ MongoDB Connected:", conn.connection.host);
    } catch (error) {
    console.error("❌ DB Connection Error:", error.message);
    process.exit(1);
    }
};

export default connectDB;