import { DefaultSession, NextAuthOptions, getServerSession } from "next-auth";
import { prismaClient } from "./db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import { sendVerificationRequest } from "@/lib/utils";
import Email from "next-auth/providers/email";
import { resend } from "./resend";
import MagicLinkEmail from "@/emails/MagicLinkEmail";

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
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    jwt: async ({ token }) => {
      const db_user = await prismaClient.user.findFirst({
        where: {
          email: token.email,
        },
      });
      if (db_user) {
        token.id = db_user.id;
      }
      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
  adapter: PrismaAdapter(prismaClient),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    {
      id: "email",
      type: "email",
      from: "asdf@asdf.ca",
      server: {},
      maxAge: 24 * 60 * 60,
      name: "Email",
      options: {},
      sendVerificationRequest,
    },
  ],
};

export function getAuthSession() {
  return getServerSession(authOptions);
}
