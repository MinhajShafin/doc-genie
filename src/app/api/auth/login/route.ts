import { NextResponse } from 'next/server'
import connectDB from '@/lib/mongodb'
import User from '../../../models/User'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

export async function POST(req: Request) {
  await connectDB()
  const { email, password } = await req.json()

  const user = await User.findOne({ email })
  if (!user) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) {
    return NextResponse.json({ message: 'Invalid credentials' }, { status: 401 })
  }

  const token = jwt.sign(
    { id: user._id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET!,
    { expiresIn: '7d' }
  )

  return NextResponse.json({ token, role: user.role }, { status: 200 })
}