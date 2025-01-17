// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

export const db = globalThis.prisma || new PrismaClient({
  log: ['query'],
});

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}