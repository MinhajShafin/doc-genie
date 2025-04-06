import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDB } from '@/lib/mongodb'
import User from '../../../models/User'
import { signToken } from '@/lib/auth'

export async function POST(req: Request) {
  const { email, password } = await req.json()

  await connectToDB()

  const user = await User.findOne({ email })
  if (!user) return NextResponse.json({ error: 'User not found' }, { status: 400 })

  const isMatch = await bcrypt.compare(password, user.password)
  if (!isMatch) return NextResponse.json({ error: 'Incorrect password' }, { status: 400 })

  const token = signToken({ id: user._id, name: user.name, email: user.email, role: user.role })

  return NextResponse.json({ token })
}
