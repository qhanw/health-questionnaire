import { PrismaClient } from "@prisma/client";
import { Request } from "express";
import { PubSub } from "apollo-server";

declare namespace RG {
  interface Content extends Request {
    pubsub: PubSub;
    prisma: PrismaClient;
    uid?: number;
  }
}
