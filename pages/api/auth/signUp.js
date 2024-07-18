import {
  connectToMongoDbDatabase,
  existingEmail,
  insertDataInDatabase,
} from "../../../helpers/mongoDbConnection";
import { hashPassword } from "../../../helpers/hashedPasword";

export async function handler(req, res) {
  if (req.method === "POST") {
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;
    const repeatePassword = req.body.repeatePassword;

    console.log(email, password, name, repeatePassword);

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 6 ||
      !repeatePassword ||
      repeatePassword.trim().length < 6 ||
      !name ||
      name.trim().length <= 3
    ) {
      res.status(422).json({
        message: "Invalid Input - check your password or email",
        status: 422,
      });
      return;
    }

    if (password.trim() !== repeatePassword.trim()) {
      res.status(422).json({
        message: "Password and repeate pasword are not same!",
        status: 422,
      });
      return;
    }

    let client;

    try {
      client = await connectToMongoDbDatabase();
    } catch (error) {
      res.status(500).json({
        message: "Connecting to the database failed! Try again later.",
        status: 500,
      });
      return;
    }

    try {
      const doesItExist = await existingEmail(client, "Users", {
        email: email,
      });
      if (doesItExist !== null) {
        console.log("postoji");

        res.status(422).json({
          message: "There is already account with this email.",
          status: 422,
        });
        client.close();
        return;
      } //console.log(doesItExist, "dalipostoji");
    } catch (error) {
      res.status(500).json({
        message: "Checking user email failed! Try again later.",
        status: 500,
      });
      //console.log(error, "greska");
      return;
    }

    const hashedPassword = await hashPassword(password);

    try {
      await insertDataInDatabase(client, "Users", {
        email: email,
        password: hashedPassword,
        name: name,
      });
      client.close();
    } catch (error) {
      res.status(500).json({
        message: "Creating user failed! Try again later.",
        status: 500,
      });
      client.close();
      return;
    }
    res
      .status(201)
      .json({ message: "Account succesfuly created!", status: 201 });
  }
}

export default handler;
