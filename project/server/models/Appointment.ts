import mongoose, { Schema } from 'mongoose';

export interface IAppointment {
  userId: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  reminderSent?: boolean;
}

const AppointmentSchema = new Schema<IAppointment>({
  userId: { type: String, required: true, index: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: String },
  reminderSent: { type: Boolean, default: false },
}, { timestamps: true });

export const AppointmentModel = mongoose.model<IAppointment>('Appointment', AppointmentSchema);


