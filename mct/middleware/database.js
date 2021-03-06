import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';
import dotenv from 'dotenv';
dotenv.config();
const client = new MongoClient(process.env.VERCEL_ENV, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function database(req, res, next) {
  if (!client.isConnected()) await client.connect();
  req.dbClient = client;
  req.db = client.db('MCAPP');
  return next();
  
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;