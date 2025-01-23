import {Router} from "express";
import CustomerController from "../../Controlller/CustomerController";

class CustomerRouter{
    router:Router
    customerController :CustomerController

    constructor() {
        this.router =Router()
        this.customerController =new CustomerController()
        this.initialRoutes();
    }
    initialRoutes():void{
        this.router.post('/addCustomer',this.customerController.saveCustomer)
        this.router.delete('/deleteCustomer',this.customerController.deleteCustomer)
        this.router.put('/updateCustomer',this.customerController.updateCustomer)
        this.router.get('/getAllCustomers',this.customerController.getAllCustomers)
    }
}
const customerRouter:CustomerRouter =new CustomerRouter()
export default customerRouter;