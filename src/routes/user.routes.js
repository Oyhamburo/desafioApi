import { Router } from "express";
import { userController } from "../controller/index.controller.js";
const router = Router();

// inicio usuario
router.post("/signin", userController.signIn);

// registro un nuevo usuario
router.post("/signup", userController.signUp);

// cambio la pass
router.put("/changepass/:email", userController.changePassword);

// Si utilizara algun tipo de libreria para mantener la session iniciada en el servidor como express session
// router.get("/logout", userController.logout);

export { router as userRouter };
