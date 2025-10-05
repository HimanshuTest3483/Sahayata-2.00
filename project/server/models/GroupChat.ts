import mongoose, { Schema } from 'mongoose';

export interface IGroupMessage {
  groupId: string;
  userId: string;
  message: string;
  createdAt: Date;
}

const GroupMessageSchema = new Schema<IGroupMessage>({
  groupId: { type: String, required: true, index: true },
  userId: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: () => new Date() },
}, { timestamps: false });

export const GroupMessageModel = mongoose.model<IGroupMessage>('GroupMessage', GroupMessageSchema);






