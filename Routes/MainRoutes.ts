import {Router} from "express";
import customerRouter from "./SubRouters/CustomerRouter";
import itemRoutes from "./SubRouters/ItemRoutes";
import orderRoutes from "./SubRouters/OrderRoutes";

class MainRoutes{
    router:Router;

    constructor() {
        this.router =Router();
        this.router.use('/customer',customerRouter.router)
        this.router.use('/item',itemRoutes.router)
        this.router.use('/order',orderRoutes.router)
    }

}
const mainRouter:MainRoutes =new MainRoutes()
export default mainRouter;