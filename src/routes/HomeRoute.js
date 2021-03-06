import express from "express";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

router.use(AuthMiddleware);

router.get("/", (req, res) => res.send("salom"));

export default {
  path: "/",
  router: router,
};
