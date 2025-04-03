import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const client = await clientPromise;
    const db = client.db("med-app");

    const collections = await db.listCollections().toArray();

    return res
      .status(200)
      .json({ message: "Connected to MongoDB", collections });
  } catch (error) {
    return res.status(500).json({
      error: "MongoDB connection failed",
      details: (error as Error).message,
    });
  }
}
