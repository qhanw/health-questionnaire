import fs from "fs";
import path from "path";
import { ApolloServer, PubSub } from "apollo-server";
import { PrismaClient } from "@prisma/client";
import { getUid } from "./utils";

import resolvers from "./resolvers";

const pubsub = new PubSub();
const prisma = new PrismaClient({ errorFormat: "minimal" });

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf-8"),
  resolvers: resolvers as any,
  context: ({ req }) => ({
    ...req,
    prisma,
    pubsub,
    uid: req?.headers?.authorization ? getUid(req) : null,
  }),
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
