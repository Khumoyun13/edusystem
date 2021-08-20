import express from "express";
import UserController from "../controllers/UserController.js";
import AuthMiddleware from "../middlewares/AuthMiddleware.js";

const router = express.Router();

// router.post("/check-phone", UserController.checkPhone);
// router.post("/check-email", UserController.checkEmail);
router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.post("/validate-code", UserController.validateCode);
router.post("/resend-code", UserController.sendNewCode);
router.post("/set-password", UserController.setPassword);
router.post("/edit", AuthMiddleware, UserController.editPersonalData);
router.get("/", AuthMiddleware, UserController.getData);

export default {
  path: "/users",
  router: router,
};
