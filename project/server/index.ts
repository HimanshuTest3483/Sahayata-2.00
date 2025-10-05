import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import mongoose from 'mongoose';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { setIo } from './socket';
import cron from 'node-cron';
import { AppointmentModel } from './models/Appointment';
import { NotificationModel } from './models/Notification';
import authRoutes from './routes/auth';
import profileRoutes from './routes/profiles';
import chatRoutes from './routes/chats';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/sahayata';
const PORT = process.env.PORT || 4001;

async function startServer() {
  await mongoose.connect(MONGO_URI);

  const app = express();
  const httpServer = http.createServer(app);
  const io = new SocketIOServer(httpServer, { cors: { origin: '*' } });
  setIo(io);
  app.use(cors());
  app.use(express.json());
  app.use(morgan('dev'));

  app.get('/health', (_req, res) => {
    res.json({ ok: true });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/profiles', profileRoutes);
  app.use('/api/chats', chatRoutes);
  app.use('/api/appointments', (await import('./routes/appointments')).default);
  app.use('/api/routines', (await import('./routes/routines')).default);
  app.use('/api/symptoms', (await import('./routes/symptoms')).default);
  app.use('/api/groups', (await import('./routes/groups')).default);
  app.use('/api/notifications', (await import('./routes/notifications')).default);

  io.on('connection', (socket) => {
    socket.on('join-group', (groupId: string) => {
      socket.join(`group:${groupId}`);
    });
  });

  // Every minute, create reminders for appointments within next 60 minutes
  cron.schedule('* * * * *', async () => {
    const now = new Date();
    const inOneHour = new Date(now.getTime() + 60 * 60000);
    const toISODate = (d: Date) => d.toISOString().slice(0, 10);
    const today = toISODate(now);
    const soon = toISODate(inOneHour);

    const candidates = await AppointmentModel.find({
      date: { $in: [today, soon] },
      reminderSent: false,
    }).lean();

    const shouldNotify = (appt: any) => {
      const when = new Date(`${appt.date}T${appt.time}:00`);
      const diffMin = (when.getTime() - now.getTime()) / 60000;
      return diffMin >= 0 && diffMin <= 60;
    };

    const toNotify = candidates.filter(shouldNotify);
    if (toNotify.length) {
      await NotificationModel.insertMany(toNotify.map((a) => ({
        userId: a.userId,
        type: 'appointment',
        title: 'Upcoming appointment',
        message: `${a.title} at ${a.time}${a.location ? ' (' + a.location + ')' : ''}`,
        data: { appointmentId: a._id },
        read: false,
      })));
      await AppointmentModel.updateMany({ _id: { $in: toNotify.map(a => a._id) } }, { $set: { reminderSent: true } });
    }
  });

  httpServer.listen(PORT, () => {
    console.log(`API listening on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server', err);
  process.exit(1);
});


