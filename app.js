import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import routes from "./src/routes/index.js";

// initialize express app
export const app = express();

// config
dotenv.config();

// middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
    allowedHeaders: "Content-Type,Authorization",
  })
);

app.options("*", cors());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(routes);
