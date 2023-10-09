import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import { prismaClient } from "./db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      qrCode: string | null;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    qrCode: string | null;
  }
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ token }) => {
      const db_user = await prismaClient.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (db_user) {
        token.id = db_user.id;
        token.qrCode = db_user.qrCode;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.qrCode = token.qrCode;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
};

export function getAuthSession() {
  return getServerSession(authOptions);
}
