import mongoose from 'mongoose';
import dns from 'dns';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

/**
 * Resolves mongodb+srv:// URIs to direct mongodb:// shard hostnames using Google DNS
 * to prevent Windows local DNS SRV lookup blocks (querySrv ECONNREFUSED).
 */
async function getResolvedUri(uri) {
  if (!uri.startsWith('mongodb+srv://')) return uri;

  try {
    const dnsPromises = dns.promises;
    dnsPromises.setServers(['8.8.8.8', '1.1.1.1']);

    const match = uri.match(/^mongodb\+srv:\/\/([^:]+):([^@]+)@([^/?]+)(\/[^?]+)?(\?.*)?$/);
    if (!match) return uri;

    const [, user, pass, host, dbPath = '/leaddesk-mini', query = ''] = match;
    const srvRecords = await dnsPromises.resolveSrv(`_mongodb._tcp.${host}`);
    
    if (!srvRecords || srvRecords.length === 0) return uri;

    const hosts = srvRecords.map((r) => `${r.name}:${r.port}`).join(',');
    const parsedQuery = query ? query.replace('?', '&') : '';

    return `mongodb://${user}:${pass}@${hosts}${dbPath}?ssl=true&authSource=admin${parsedQuery}`;
  } catch (err) {
    console.warn('SRV DNS fallback to original URI:', err.message);
    return uri;
  }
}

/**
 * Global caching connection across hot reloads in development.
 */
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = getResolvedUri(MONGODB_URI).then((targetUri) => {
      return mongoose.connect(targetUri, opts).then((mongoose) => {
        console.log('MongoDB connected successfully');
        return mongoose;
      });
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error('MongoDB connection error:', e);
    throw e;
  }

  return cached.conn;
}
