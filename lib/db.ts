import mongoose from "mongoose";

export default async function initDB() {
  await mongoose.connect(
    process.env.MONGODB_URI || "mongodb://localhost/matches"
  );
}
