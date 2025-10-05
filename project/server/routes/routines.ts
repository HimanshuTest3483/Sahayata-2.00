import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { RoutineModel } from '../models/Routine';

const router = Router();

router.get('/', requireAuth, async (req: AuthRequest, res) => {
  const items = await RoutineModel.find({ userId: req.userId! }).sort({ time: 1 }).lean();
  res.json(items);
});

router.post('/', requireAuth, async (req: AuthRequest, res) => {
  const { time, task, category } = req.body || {};
  if (!time || !task) return res.status(400).json({ error: 'time and task required' });
  const created = await RoutineModel.create({ userId: req.userId!, time, task, category });
  res.status(201).json(created);
});

router.delete('/:id', requireAuth, async (req: AuthRequest, res) => {
  const { id } = req.params;
  await RoutineModel.deleteOne({ _id: id, userId: req.userId! });
  res.status(204).end();
});

export default router;






