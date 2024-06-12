import { MongoClient } from "mongodb";

export async function connectToMongoDbDatabase() {
  const mongodbCredentials = process.env.MONGODBDATABASECREDENTIALS;
  //console.log(mongodbCredentials);
  const client = await MongoClient.connect(mongodbCredentials);

  return client;
}

export async function insertDataInDatabase(client, collection, data) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(data);
  return result;
}

export async function existingEmail(client, collection, data) {
  const db = client.db();

  const existingEmail = await db
    .collection(collection)
    .findOne({ email: data.email });

  //console.log(existingEmail, "mongodb");

  return existingEmail;
}
