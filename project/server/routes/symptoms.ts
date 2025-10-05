import { Router } from 'express';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { SymptomModel } from '../models/Symptom';

const router = Router();

router.get('/', requireAuth, async (req: AuthRequest, res) => {
  const items = await SymptomModel.find({ userId: req.userId! }).sort({ date: -1 }).lean();
  res.json(items);
});

router.post('/', requireAuth, async (req: AuthRequest, res) => {
  const { date, symptom, severity, notes } = req.body || {};
  if (!date || !symptom || !severity) return res.status(400).json({ error: 'date, symptom, severity required' });
  const created = await SymptomModel.create({ userId: req.userId!, date, symptom, severity, notes });
  res.status(201).json(created);
});

export default router;






