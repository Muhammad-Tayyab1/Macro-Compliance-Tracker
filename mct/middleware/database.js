import { MongoClient } from 'mongodb';
import nextConnect from 'next-connect';
import dotenv from 'dotenv';
dotenv.config();
const client = new MongoClient('mongodb://ShoesDb:12345@cluster0-shard-00-00.le9zi.mongodb.net:27017,cluster0-shard-00-01.le9zi.mongodb.net:27017,cluster0-shard-00-02.le9zi.mongodb.net:27017/test?ssl=true&replicaSet=atlas-7owskh-shard-0&authSource=admin&retryWrites=true&w=majority', {
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