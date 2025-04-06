import mongoose from 'mongoose'

const MONGODB_URI = 'mongodb://127.0.0.1:27017/med'

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable')
}

let cached = (global as any).mongoose || { conn: null, promise: null }

export async function connectToDB() {
  if (cached.conn) return cached.conn

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      dbName: 'med',
      bufferCommands: false,
    }).then((mongoose) => {
      console.log('✅ MongoDB connected locally')
      return mongoose
    })
  }

  cached.conn = await cached.promise
  return cached.conn
}
