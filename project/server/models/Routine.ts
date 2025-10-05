import mongoose, { Schema } from 'mongoose';

export interface IRoutineTask {
  userId: string;
  time: string;
  task: string;
  category: 'medication' | 'exercise' | 'meal' | 'other';
}

const RoutineSchema = new Schema<IRoutineTask>({
  userId: { type: String, required: true, index: true },
  time: { type: String, required: true },
  task: { type: String, required: true },
  category: { type: String, enum: ['medication', 'exercise', 'meal', 'other'], default: 'other' },
}, { timestamps: true });

export const RoutineModel = mongoose.model<IRoutineTask>('RoutineTask', RoutineSchema);






