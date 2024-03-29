import { MongoClient, ServerApiVersion } from 'mongodb';
import 'dotenv/config'

const CONNECTION_STRING = process.env.CONNECTION_STRING;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(CONNECTION_STRING, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

export async function connect(collection) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    const db = client.db("taskapp");
    // console.log(await db.collections());
    return db.collection(collection);
  } catch (err) {
    console.error("Error connecting to the database");
    console.error(err);

    // Ensures that the client will close when you finish/error
    await client.close();
  }
}