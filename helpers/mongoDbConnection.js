import { MongoClient } from "mongodb";

export async function connectToMongoDbDatabase() {
  const client = await MongoClient.connect(
    "ENTER YOUR MONGODB CREDENTIALS TO CONECT TO YOUR DATABASE"
  );

  return client;
}

export async function insertDataInDatabase(client, collection, data) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(data);
  return result;
}
