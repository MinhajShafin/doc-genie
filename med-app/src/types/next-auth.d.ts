import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: "doctor" | "patient";
    };
  }

  interface User extends DefaultUser {
    id: string;
    role: "doctor" | "patient";
  }

  interface JWT {
    id: string;
    role: "doctor" | "patient";
  }
}
