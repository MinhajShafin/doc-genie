import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  patient: {
    type: String,
    required: [true, 'Please provide patient name'],
  },
  date: {
    type: String,
    required: [true, 'Please provide appointment date'],
  },
  time: {
    type: String,
    required: [true, 'Please provide appointment time'],
  },
  type: {
    type: String,
    required: [true, 'Please provide appointment type'],
    default: 'Consultation',
  },
  status: {
    type: String,
    enum: ['Confirmed', 'Pending'],
    default: 'Pending',
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', bookingSchema);

export default Booking;