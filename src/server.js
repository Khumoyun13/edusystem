// MODULES - start  //
import express from "express";
import http from "http";
import fs from "fs";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// -- end //

// CUSTOM MODULES - start //
import postgres from "./modules/postgres.js";
import routes from "./routes/routes.js";
// -- end //

async function main() {
  let db = await postgres();

  let __dirname = path.resolve(path.dirname(""));

  const app = express();
  const server = http.createServer(app);
  server.listen(3300, () => console.log(`SERVER READY`));

  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(async (req, res, next) => {
    req.postgres = db;
    next();
  });

  routes(app);
}

main();
