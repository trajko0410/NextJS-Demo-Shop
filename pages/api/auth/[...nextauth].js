import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import {
  connectToMongoDbDatabase,
  existingEmail,
} from "../../../helpers/mongoDbConnection";
import { verifyPassword } from "../../../helpers/hashedPasword";

export const authOptions = {
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const inputEmail = credentials.email;
        const inputPassword = credentials.password;

        //console.log(inputEmail, inputPassword, "input");

        if (
          !inputEmail ||
          !inputEmail.includes("@") ||
          !inputPassword ||
          inputPassword.trim().length < 6
        ) {
          throw new Error("Invalid Input - check your password or email");
        }

        const client = await connectToMongoDbDatabase();
        if (!client) {
          throw new Error("Connecting to the database failed!");
        }

        const user = await existingEmail(client, "Users", {
          email: inputEmail,
        });
        if (user === null) {
          throw new Error("User does not exist");
        }

        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );
        if (!isValid) {
          client.close();
          throw new Error("You entered wrong password");
        }

        client.close();

        //console.log("cred", credentials);
        //console.log(user);

        return {
          email: user.email,
          name: user.name,
          role: user.role ?? "user",
        };
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) token.role = user.role;
      return token;
    },
    session({ session, token }) {
      session.user.role = token.role;

      return session;
    },
  },
};

export default NextAuth(authOptions);
