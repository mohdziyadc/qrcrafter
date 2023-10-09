import { PrismaClient } from "@prisma/client";
import "server-only";

declare global {
  var cachedPrisma: PrismaClient;
}

export let prismaClient: PrismaClient;

if (process.env.NODE_ENV == "production") {
  prismaClient = new PrismaClient();
} else {
  if (!global.cachedPrisma) {
    global.cachedPrisma = new PrismaClient();
  }
  prismaClient = global.cachedPrisma;
}
