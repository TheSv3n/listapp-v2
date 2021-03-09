import path from "path";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

import userRoutes from "./routes/userRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import listItemRoutes from "./routes/listItemRoutes.js";
import shareRequestRoutes from "./routes/shareRequestRoutes.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/listitems", listItemRoutes);
app.use("/api/sharerequests", shareRequestRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
