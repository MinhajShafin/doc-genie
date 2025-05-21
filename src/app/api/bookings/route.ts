import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Booking from '@/models/Booking';

export async function POST(req: Request) {
  try {
    const bookingData = await req.json();
    await connectDB();

    const booking = await Booking.create(bookingData);

    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(req: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');

    let query = {};
    if (date) {
      query = { date: { $gte: date } };
    }

    const bookings = await Booking.find(query).sort({ date: 1, time: 1 });

    return NextResponse.json(bookings);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}