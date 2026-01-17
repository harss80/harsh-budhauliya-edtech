import mongoose from 'mongoose';

let cached = globalThis._mongooseConn;
if (!cached) {
  cached = globalThis._mongooseConn = { conn: null, promise: null };
}

export default async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    const env = (globalThis.process && globalThis.process.env) || {};
    const uri = env.MONGODB_URI;
    const dbName = env.DB_NAME || 'digimentors';
    if (!uri) throw new Error('MONGODB_URI not set');
    console.log('[db] Connecting to MongoDB...');
    cached.promise = mongoose
      .connect(uri, { dbName })
      .then((m) => {
        console.log(`[db] MongoDB connected (db=${dbName})`);
        return m;
      })
      .catch((err) => {
        console.error('[db] MongoDB connection error:', err?.message || err);
        throw err;
      });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
