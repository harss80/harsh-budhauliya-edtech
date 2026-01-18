require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');

const usersRouter = require('./routes/users');
const notificationsRouter = require('./routes/notifications');
const contactsRouter = require('./routes/contacts');
const testsRouter = require('./routes/tests');
const resultsRouter = require('./routes/results');

const app = express();

// Middleware
app.use(helmet());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));
const origins = (process.env.CORS_ORIGIN || '*').split(',').map((s) => s.trim());
const corsOptions = origins.includes('*')
  ? {}
  : {
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (origins.includes(origin)) return callback(null, true);
        return callback(new Error('Not allowed by CORS'));
      },
    };
app.use(cors(corsOptions));

// Rate limiting (basic)
const limiter = rateLimit({ windowMs: 60 * 1000, max: 200 });
app.use(limiter);

// Routes
app.get('/api/health', (req, res) => res.json({ ok: true, uptime: process.uptime() }));
app.use('/api/user', usersRouter); // legacy single endpoint for current frontend
app.use('/api/users', usersRouter);
app.use('/api/notifications', notificationsRouter);
app.use('/api/contacts', contactsRouter);
app.use('/api/tests', testsRouter);
app.use('/api/results', resultsRouter);

// Compatibility endpoint for login logs (no-op store for now)
app.post('/api/login', (req, res) => {
  try {
    // Optionally, persist logs later
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'log failed' });
  }
});

// Compatibility endpoint for visit tracker
app.post('/api/visit', (req, res) => {
  try {
    // Optionally, persist visit logs later
    res.json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: 'visit log failed' });
  }
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Server error' });
});

const start = async () => {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME || 'digimentors';
  if (!uri) {
    console.error('MONGODB_URI is not set');
    process.exit(1);
  }
  try {
    await mongoose.connect(uri, { dbName });
    console.log('Connected to MongoDB');
    const port = process.env.PORT || 3001;
    app.listen(port, () => console.log(`API running on http://localhost:${port}`));
  } catch (e) {
    console.error('Mongo connection failed', e);
    process.exit(1);
  }
};

start();
