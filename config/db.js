const mongoose = require("mongoose");

const DEFAULT_RETRY_DELAY_MS = Number(process.env.MONGO_RETRY_DELAY_MS || 5000);

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.error("MONGO_URI is not set. Skipping MongoDB connection.");
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    console.log(`Retrying MongoDB connection in ${DEFAULT_RETRY_DELAY_MS}ms...`);

    setTimeout(() => {
      connectDB();
    }, DEFAULT_RETRY_DELAY_MS);
  }
};

module.exports = connectDB;
