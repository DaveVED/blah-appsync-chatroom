import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";
import healthRoutes from "@/routes/health-routes.js";
import authRoutes from "@/routes/auth-routes.js"
export const createServer = (): Express => {
  const app = express();
  app
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors())
    .use(authRoutes)
    .use(healthRoutes);
    app.use(
      cors({
        origin: 'http://localhost:5173',
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
      })
    );
    
  return app;
};