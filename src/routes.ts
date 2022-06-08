import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticatorUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AccountUserController } from "./controllers/AccountUserController";
import { SearchProductsController } from "./controllers/SearchProductsController";
import { RecoveryPasswordController } from "./controllers/RecoveryPasswordController";
import { ResetPassowordController } from "./controllers/ResetPasswordController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const accountUserController = new AccountUserController();
const searchProductsController = new SearchProductsController();
const recoveryPasswordController = new RecoveryPasswordController();
const resetPassowordController = new ResetPassowordController();

router.post("/users", createUserController.handle);
router.post("/login", authenticateUserController.handle)
router.post("/results", searchProductsController.handle)
router.post("/forgot_password", recoveryPasswordController.handle)
router.post("/reset_password", resetPassowordController.handle)

router.get("/logged", ensureAuthenticated, accountUserController.handle)



export { router };