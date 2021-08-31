// MODULES - start  //
import express from "express";
import http from "http";
import fs from "fs/promises";
import path from "path";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
// import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express"
import swaggerDocs from "./swagger.js"
// -- end //

// CUSTOM MODULES - start //
import postgres from "./modules/postgres.js";
import routes from "./routes/routes.js";
// -- end //

async function main() {
  let db = await postgres();

  let __dirname = path.resolve(path.dirname(""));

  let settings = await fs.readFile(path.join(__dirname, "settings.json"), "utf8");
  settings = JSON.parse(settings);

  const app = express();
  const server = http.createServer(app);
  server.listen(3300, () => console.log(`SERVER READY`));

  app.use(cors());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());
  app.use(express.static("public"));
  app.use(async (req, res, next) => {
    req.postgres = db;
    req.settings = settings;
    next();
  });
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
  routes(app);
}

main();
