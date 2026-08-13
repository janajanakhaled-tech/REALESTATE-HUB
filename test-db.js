require("dotenv").config();

const { MongoClient } = require("mongodb");

const client = new MongoClient(process.env.MONGO_URI);

async function testConnection() {
  try {
    await client.connect();
    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.log("MongoDB connection error:", error);
  } finally {
    await client.close();
  }
}

testConnection();