import { Router } from "express";
import { CreateUserController } from "./controllers/CreateUserController";
import { AuthenticateUserController } from "./controllers/AuthenticatorUserController";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AccountUserController } from "./controllers/AccountUserController";
import { SearchProductsController } from "./controllers/SearchProductsController";
import { RecoveryPasswordController } from "./controllers/RecoveryPasswordController";
import { ResetPassowordController } from "./controllers/ResetPasswordController";
import { DetailsProductController } from "./controllers/DetailsProductsController";
import { RegisterPartnerUserController } from "./controllers/RegisterPartnerUserController";
import { AddProductsAtMarketController } from "./controllers/AddProductsAtMarketController";
import { AccountPartnerController } from "./controllers/AccountPartnerController";
import { SearchForAllProductsController } from "./controllers/SearchForAllProductsController";
import { ProductsOfMarketController } from "./controllers/ProductsOfMarketController";
import { ShoppingCartController } from "./controllers/ShoppingCartController";
import { ProductsInCartController } from "./controllers/ProductsInCartController";
import { CustomerOrderController } from "./controllers/CustomerOrderController";
import { OrdersMadeCustomerController } from "./controllers/OrdersMadeCustomerController";

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const accountUserController = new AccountUserController();
const searchProductsController = new SearchProductsController();
const recoveryPasswordController = new RecoveryPasswordController();
const resetPassowordController = new ResetPassowordController();
const detailsProcutsController = new DetailsProductController();

const registerPartnerUserController = new RegisterPartnerUserController();
const accountPartnerController = new AccountPartnerController();

const searchForAllProductsController = new SearchForAllProductsController();
const addProductsAtMarketController = new AddProductsAtMarketController();
const productsOfMarketController = new ProductsOfMarketController();
const shoppingCartController = new ShoppingCartController();
const productsInCartController = new ProductsInCartController();
const customerOrderController = new CustomerOrderController();
const ordersMadeCustomerController = new OrdersMadeCustomerController();

/** Site Surveys */
router.post("/results", searchProductsController.handle)
router.post("/detailsproducts", detailsProcutsController.handle)

/** User Routes */
router.post("/login", authenticateUserController.handle)
router.post("/users", createUserController.handle);
router.post("/shoppingcart", ensureAuthenticated, shoppingCartController.handle)
router.get("/productsincart", ensureAuthenticated, productsInCartController.handle)
router.post("/customerOrder", ensureAuthenticated, customerOrderController.handle)
router.get("/userrequests", ensureAuthenticated, ordersMadeCustomerController.handle)

/** Register and login partner's */
router.post("/partner", registerPartnerUserController.handle)
router.get("/partnerlogged", ensureAuthenticated, accountPartnerController.handle)

/** New Password User or Partner */
router.post("/forgot_password", recoveryPasswordController.handle)
router.post("/reset_password", resetPassowordController.handle)

/** Add Itens partner */
router.get("/searchproducts", ensureAuthenticated, searchForAllProductsController.handle)
router.get("/productsmarket", ensureAuthenticated, productsOfMarketController.handle)
router.post("/addproducts", ensureAuthenticated, addProductsAtMarketController.handle)

router.get("/logged", ensureAuthenticated, accountUserController.handle)




export { router };