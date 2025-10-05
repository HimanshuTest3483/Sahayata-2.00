import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { AppointmentModel } from '../models/Appointment';

const router = Router();

router.get('/', requireAuth, async (req: AuthRequest, res) => {
  const { limit } = req.query;
  const query = AppointmentModel.find({ userId: req.userId! }).sort({ date: 1, time: 1 });
  if (limit) query.limit(Number(limit));
  const items = await query.lean();
  res.json(items);
});

router.post('/', requireAuth, async (req: AuthRequest, res) => {
  const { title, date, time, location } = req.body || {};
  if (!title || !date || !time) return res.status(400).json({ error: 'title, date, time required' });
  const created = await AppointmentModel.create({ userId: req.userId!, title, date, time, location });
  res.status(201).json(created);
});

export default router;






