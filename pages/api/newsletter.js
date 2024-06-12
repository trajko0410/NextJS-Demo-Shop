import {
  connectToMongoDbDatabase,
  existingEmail,
  insertDataInDatabase,
} from "../../helpers/mongoDbConnection";

async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid email address.", status: 422 });
      return;
    }

    let client;

    try {
      client = await connectToMongoDbDatabase();
    } catch (error) {
      res
        .status(500)
        .json({ message: "Connecting to the database failed!", status: 500 });
      return;
    }

    try {
      const doesItExist = await existingEmail(client, "NewsLetter", {
        email: userEmail,
      });
      if (doesItExist === null) {
        console.log("nepostoji");
      } else {
        res
          .status(422)
          .json({ message: "You are already subscribed to our newsletter." });
        client.close();
        return;
      }

      //console.log(doesItExist, "dalipostoji");
    } catch (error) {
      res.status(500).json({ message: "Checking email failed!", status: 500 });
      //console.log(error, "greska");
      return;
    }

    try {
      await insertDataInDatabase(client, "NewsLetter", { email: userEmail });
      client.close();
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed!", status: 500 });
      return;
    }

    res.status(201).json({ message: "Signed up for newsletter", status: 201 });

    /*const response = await fetch(
      "https://shop-4e5c6-default-rtdb.europe-west1.firebasedatabase.app/NewsLetters.json",
      {
        method: "POST",
        body: JSON.stringify({
          userEmail: userEmail,
        }),
        headers: {
          "Content-Type": "application/js",
        },
      }
    );

    if (!response.ok) {
      res.status(500).json({ message: "Connecting to database failed!" });
    }

    res.status(201).json({ message: "Signed up for newsletter" });

    //console.log(userEmail);*/
  }
}

export default handler;
