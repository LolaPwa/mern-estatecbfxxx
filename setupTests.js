import mongoose  from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
let mongod;

beforeAll(async() => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
   
    // set the MongoDb URI to use the in-memory server during  tests
    process.env.MONGODB_URI = uri;

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });


afterAll(async () => {
    await mongoose.disconnect();
    // stop the MongoDb memory server
    if (mongod) {
      await mongod.stop();
    }
});