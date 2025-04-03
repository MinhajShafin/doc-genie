import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("med-app"); // Ensure this is the correct database name

    // List collections
    const collections = await db.listCollections().toArray();

    res.status(200).json({
      message: "Connected to MongoDB",
      collections: collections.map((col) => col.name),
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    res.status(500).json({ error: "Failed to connect to MongoDB" });
  }
}
