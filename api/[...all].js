import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import dbConnect from './_lib/db.js';

// Import existing routers from server (CommonJS modules)
import usersRouter from '../server/src/routes/users.js';
import notificationsRouter from '../server/src/routes/notifications.js';
import contactsRouter from '../server/src/routes/contacts.js';
import testsRouter from '../server/src/routes/tests.js';
import resultsRouter from '../server/src/routes/results.js';

const app = express();

// Security & parsing
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(morgan('dev'));

// Rate limit (light)
const limiter = rateLimit({ windowMs: 60 * 1000, max: 200 });
app.use(limiter);

// Ensure DB connection per invocation (cached across warm invocations)
app.use(async (req, res, next) => {
  try { await dbConnect(); } catch (e) { /* ignore */ }
  next();
});

// Routes (mounted with /api prefix to match client calls)
app.get(['/health','/api/health'], (req, res) => res.json({ ok: true, uptime: process.uptime() }));
app.use(['/user','/api/user'], usersRouter); // legacy POST
app.use(['/users','/api/users'], usersRouter);
app.use(['/notifications','/api/notifications'], notificationsRouter);
app.use(['/contacts','/api/contacts'], contactsRouter);
app.use(['/tests','/api/tests'], testsRouter);
app.use(['/results','/api/results'], resultsRouter);
app.post(['/login','/api/login'], (req, res) => res.json({ ok: true }));
app.post(['/visit','/api/visit'], (req, res) => res.json({ ok: true }));

export default function handler(req, res) {
  return app(req, res);
}
