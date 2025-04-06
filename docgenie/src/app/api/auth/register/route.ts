import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDB } from '@/lib/mongodb'
import User from '../../../models/User'
import { signToken } from '@/lib/auth'

export async function POST(req: Request) {
  const { name, email, password, role } = await req.json()

  await connectToDB()

  const existingUser = await User.findOne({ email })
  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
  })

  const token = signToken({ id: user._id, name: user.name, email: user.email, role: user.role })

  return NextResponse.json({ token })
}
