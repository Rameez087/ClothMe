// lib/mongodb.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

const client = new MongoClient(uri);

export async function connectToDB() {
  await client.connect();
  return client.db(); // Return the database object
}
