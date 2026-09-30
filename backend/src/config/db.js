import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoMemoryInstance = null;

export const connectDB = async () => {
  const uri = process.env.MONGODB_URI;

  if (uri && uri.trim() !== '') {
    try {
      console.log('[Database] Connecting to configured MongoDB instance...');
      await mongoose.connect(uri);
      console.log('✅ Connected to MongoDB successfully.');
      return;
    } catch (err) {
      console.warn('⚠️ Failed to connect to MONGODB_URI. Falling back to in-memory instance:', err.message);
    }
  }

  // Graceful In-Memory fallback for instant testing / college evaluation
  try {
    console.log('[Database] Launching zero-config in-memory MongoDB server...');
    mongoMemoryInstance = await MongoMemoryServer.create();
    const memoryUri = mongoMemoryInstance.getUri();
    await mongoose.connect(memoryUri);
    console.log('✅ Connected to In-Memory MongoDB successfully.');
  } catch (err) {
    console.error('❌ Failed to initialize in-memory MongoDB:', err.message);
    throw err;
  }
};

export const closeDB = async () => {
  await mongoose.disconnect();
  if (mongoMemoryInstance) {
    await mongoMemoryInstance.stop();
  }
};
