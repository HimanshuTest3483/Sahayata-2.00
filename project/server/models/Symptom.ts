import mongoose, { Schema } from 'mongoose';

export interface ISymptomLog {
  userId: string;
  date: string;
  symptom: string;
  severity: 1 | 2 | 3 | 4 | 5;
  notes?: string;
}

const SymptomSchema = new Schema<ISymptomLog>({
  userId: { type: String, required: true, index: true },
  date: { type: String, required: true },
  symptom: { type: String, required: true },
  severity: { type: Number, min: 1, max: 5, required: true },
  notes: { type: String },
}, { timestamps: true });

export const SymptomModel = mongoose.model<ISymptomLog>('SymptomLog', SymptomSchema);






