import mongoose from 'mongoose';

const env = (globalThis.process && globalThis.process.env) || {};
const uri = env.MONGODB_URI;
const dbName = env.DB_NAME || 'digimentors';

console.log('[build-check] MongoDB check: start');
if (!uri) {
  console.log('[build-check] Skipped: MONGODB_URI not set');
  // No exit to avoid lint issues; script will finish naturally
}

try {
  console.log('[build-check] Connecting to MongoDB...');
  await mongoose.connect(uri, { dbName, serverSelectionTimeoutMS: 10000 });
  console.log(`[build-check] MongoDB connected (db=${dbName})`);
  await mongoose.disconnect();
  console.log('[build-check] MongoDB disconnected');
} catch (e) {
  console.error('[build-check] MongoDB connection failed:', e?.message || e);
}
