import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import clientPromise from "../../../lib/mongodb";
import { User } from "../../../types/user";
import { MongoClient, Document } from "mongodb";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const db = client.db("med-app");
        const user = await db
          .collection("users")
          .findOne({ email: credentials?.email });

        if (!user) {
          console.log("No user found with this email");
          throw new Error("No user found with this email");
        }

        console.log("Stored password in DB:", user.password);
        console.log("Entered password:", credentials?.password);

        if (!credentials) {
          throw new Error("Credentials are missing");
        }
        const isValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        console.log("Password match:", isValid);

        if (!isValid) {
          throw new Error("Incorrect password");
        }

        return { email: user.email, role: user.role, id: user._id.toString() };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "doctor" | "patient";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
  },
});
