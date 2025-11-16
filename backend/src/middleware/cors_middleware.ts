import cors from "cors";
import { RequestHandler } from "express";

const corsOptions = {
  origin: "*",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  optionsSuccessStatus: 200,
};

const corsMiddleware: RequestHandler = cors(corsOptions);

export default corsMiddleware;
