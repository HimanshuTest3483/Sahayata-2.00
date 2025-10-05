import mongoose, { Schema } from 'mongoose';

export interface INotification {
  userId: string;
  type: 'chat' | 'appointment' | 'routine';
  title: string;
  message: string;
  data?: Record<string, unknown>;
  read: boolean;
  createdAt: Date;
}

const NotificationSchema = new Schema<INotification>({
  userId: { type: String, required: true, index: true },
  type: { type: String, enum: ['chat', 'appointment', 'routine'], required: true },
  title: { type: String, required: true },
  message: { type: String, required: true },
  data: { type: Schema.Types.Mixed },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: () => new Date() },
});

export const NotificationModel = mongoose.model<INotification>('Notification', NotificationSchema);






