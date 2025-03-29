import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  name: string;
  email: string;
  password: string;
  role: 'patient' | 'doctor' | 'admin';
  createdAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: { 
    type: String, 
    required: true 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true 
  },
  password: { 
    type: String, 
    required: true 
  },
  role: { 
    type: String, 
    enum: ['patient', 'doctor', 'admin'], 
    default: 'patient' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

export const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);