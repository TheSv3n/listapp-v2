import path from "path";
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import morgan from "morgan";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import http from "http";
import https from "https";

//const http = require("http");
//const https = require("https");

import userRoutes from "./routes/userRoutes.js";
import listRoutes from "./routes/listRoutes.js";
import listItemRoutes from "./routes/listItemRoutes.js";
import shareRequestRoutes from "./routes/shareRequestRoutes.js";
import friendRequestRoutes from "./routes/friendRequestRoutes.js";

//Certificate
const privateKey = fs.readFileSync(
  "/etc/letsencrypt/live/thesv3n.ddns.net/privkey.pem",
  "utf8"
);
const certificate = fs.readFileSync(
  "/etc/letsencrypt/live/thesv3n.ddns.net/cert.pem",
  "utf8"
);
const ca = fs.readFileSync(
  "/etc/letsencrypt/live/thesv3n.ddns.net/chain.pem",
  "utf8"
);

const credentials = {
  key: privateKey,
  cert: certificate,
  ca: ca,
};

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/listitems", listItemRoutes);
app.use("/api/sharerequests", shareRequestRoutes);
app.use("/api/friendrequests", friendRequestRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);

const httpsServer = https.createServer(credentials, app);

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}`.yellow.bold
  )
);
