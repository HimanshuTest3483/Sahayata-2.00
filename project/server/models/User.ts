import mongoose, { Schema } from 'mongoose';

export interface IUser {
  email: string;
  passwordHash: string;
  fullName?: string;
  role: 'caretaker' | 'patient';
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  fullName: { type: String },
  role: { type: String, enum: ['caretaker', 'patient'], default: 'caretaker' },
}, { timestamps: true });

export const UserModel = mongoose.model<IUser>('User', UserSchema);






