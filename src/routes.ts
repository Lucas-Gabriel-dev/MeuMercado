import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticatorUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AccountUserController } from "./controllers/AccountUserController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const accountUserController = new AccountUserController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle)
router.get("/logged", ensureAuthenticated, accountUserController.handle)


export { router };