import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticatorUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle)


export { router };