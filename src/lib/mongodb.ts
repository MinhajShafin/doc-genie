import mongoose from 'mongoose'

if (!process.env.MONGODB_URI) {
  throw new Error("Missing MONGODB_URI in environment");
}
const MONGODB_URI = process.env.MONGODB_URI;

let cached = (global as any).mongoose

if (!cached) {
  cached = (global as any).mongoose = { conn: null, promise: null }
}

async function connectDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'docgenie',
      bufferCommands: false,
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}

export default connectDB
