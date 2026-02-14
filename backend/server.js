import "./env.js";
import express from "express";
import { connectToMongoose } from "./src/config/mongoose.config.js";
import { noteRouter } from "./src/routes/note.route.js";
import { swaggerUi, swaggerSpec } from "./src/config/swagger.js";
import cors from "cors";

const server = express();
const PORT = process.env.PORT;

server.use(cors());
server.use(express.json());
server.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
server.use("/api/notes", noteRouter);
server.use((err, req, res, next) => {
  console.log(err);

  if (err instanceof ApplicationError) {
    return res.status(err.code).send(err.message);
  }
  res.status(503).send("Something went wrong,please try later");
  next();
});
server.use("/", (req, res) => {
  res.send("Welcome to Summify App");
});

server.listen(PORT, () => {
  connectToMongoose();
  console.log("Server is listenning to port 3000");
});
