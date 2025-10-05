import mongoose, { Schema } from 'mongoose';

export interface ISupportGroup {
  name: string;
  description: string;
  schedule: string;
  createdBy: string;
  members: string[];
}

const SupportGroupSchema = new Schema<ISupportGroup>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  schedule: { type: String, required: true },
  createdBy: { type: String, required: true },
  members: { type: [String], default: [] },
}, { timestamps: true });

export const SupportGroupModel = mongoose.model<ISupportGroup>('SupportGroup', SupportGroupSchema);






