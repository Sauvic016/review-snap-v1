// lib/prisma.ts
import { Prisma, PrismaClient, ReviewType } from "@prisma/client";
import type { Question, Review, Template, User } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
const prisma = globalForPrisma.prisma || new PrismaClient();
export { Prisma };
export type { Question, Review, ReviewType, Template, User };
export default prisma;

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
