import {Router} from "express";
import CustomerController from "../../Controlller/CustomerController";
import {authenticateToken} from "../../Util/AuthenticateUser";
import auth from "./AuthRouter";

class CustomerRouter{
    router:Router
    customerController :CustomerController

    constructor() {
        this.router =Router()
        this.customerController =new CustomerController()
        this.initialRoutes();
    }
    initialRoutes():void{
        this.router.post('/addCustomer',authenticateToken,this.customerController.saveCustomer)
        this.router.delete('/deleteCustomer',authenticateToken,this.customerController.deleteCustomer)
        this.router.put('/updateCustomer',authenticateToken,this.customerController.updateCustomer)
        this.router.get('/getAllCustomers',authenticateToken,this.customerController.getAllCustomers)
    }
}
const customerRouter:CustomerRouter =new CustomerRouter()
export default customerRouter;