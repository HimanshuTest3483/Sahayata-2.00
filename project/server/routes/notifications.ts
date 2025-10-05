import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { NotificationModel } from '../models/Notification';

const router = Router();

router.get('/', requireAuth, async (req: AuthRequest, res) => {
  const items = await NotificationModel.find({ userId: req.userId! }).sort({ createdAt: -1 }).lean();
  res.json(items);
});

router.post('/:id/read', requireAuth, async (req: AuthRequest, res) => {
  const { id } = req.params;
  await NotificationModel.updateOne({ _id: id, userId: req.userId! }, { $set: { read: true } });
  res.json({ ok: true });
});

router.post('/read-all', requireAuth, async (req: AuthRequest, res) => {
  await NotificationModel.updateMany({ userId: req.userId! }, { $set: { read: true } });
  res.json({ ok: true });
});

export default router;






