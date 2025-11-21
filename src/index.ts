import { startServer } from "./Config/databaseConfig";
import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

startServer(app);
