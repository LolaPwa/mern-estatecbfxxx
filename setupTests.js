import mongoose  from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
let mongod;

export const setupbeforeAll= async() => {
  if(mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
   
    // set the MongoDb URI to use the in-memory server during  tests
    process.env.MONGODB_URI = process.env.NODE_ENV === 'test' ? uri:process.env.MONGO;

    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

if(!mongod.isRunning) {
  throw new Error('MongoDB in-memory server failed');
}

  };


export const setupafterAll=async () => {
    await mongoose.disconnect();
    // stop the MongoDb memory server
    if (mongod) {
      await mongod.stop();
    }
};