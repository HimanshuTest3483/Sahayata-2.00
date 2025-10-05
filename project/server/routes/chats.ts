import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { GroupMessageModel } from '../models/GroupChat';
import { Server as SocketIOServer } from 'socket.io';
import { getIo } from '../socket';
import { SupportGroupModel } from '../models/SupportGroup';
import { NotificationModel } from '../models/Notification';

const router = Router();

router.get('/:groupId', requireAuth, async (req: AuthRequest, res) => {
  const { groupId } = req.params;
  const messages = await GroupMessageModel.find({ groupId }).sort({ createdAt: 1 }).lean();
  res.json(messages);
});

router.post('/:groupId', requireAuth, async (req: AuthRequest, res) => {
  const { groupId } = req.params;
  const { message } = req.body || {};
  if (!message || !message.trim()) return res.status(400).json({ error: 'message required' });
  const created = await GroupMessageModel.create({ groupId, userId: req.userId!, message: message.trim() });
  const io = getIo();
  io.to(`group:${groupId}`).emit('group-message', created);
  // notify other members
  const group = await SupportGroupModel.findById(groupId).lean();
  if (group) {
    const recipients = (group.members || []).filter((m) => m !== req.userId);
    await NotificationModel.insertMany(recipients.map((userId) => ({
      userId,
      type: 'chat',
      title: 'New group message',
      message: created.message,
      data: { groupId, messageId: created._id },
      read: false,
    })));
  }
  res.status(201).json(created);
});

export default router;


