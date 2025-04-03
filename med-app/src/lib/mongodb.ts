import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI; // Your connection string
const MONGODB_DB = "med-app"; // Your database name

if (!MONGODB_URI) {
  throw new Error("❌ MONGODB_URI is not defined in .env.local");
}

let clientPromise: Promise<MongoClient>;

const client = new MongoClient(MONGODB_URI);
clientPromise = client.connect();

export default clientPromise;
