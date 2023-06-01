import jwt from "jsonwebtoken";
import express from "express";
const APP_SECRET = "GraphQL-is-aw3some";

function getTokenPayload(token: string) {
  return jwt.verify(token, APP_SECRET);
}

function getUid(req?: express.Request, authToken?: string) {
  if (req) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer ", "");
      if (!token) {
        throw new Error("No token found");
      }
      const { uid }: any = getTokenPayload(token);
      return uid;
    }
  } else if (authToken) {
    const { uid }: any = getTokenPayload(authToken);
    return uid;
  }

  throw new Error("Not authenticated");
}

export { APP_SECRET, getUid };
