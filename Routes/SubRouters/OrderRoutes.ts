import {Router} from "express";
import OrderController from "../../Controlller/OrderController";
import {authenticateToken} from "../../Util/AuthenticateUser";

class OrderRoutes{
    router:Router
    orderController:OrderController

    constructor() {
        this.router =Router()
        this.orderController =new OrderController()
        this.initialRoutes();
    }
    initialRoutes():void{
        this.router.post('/addOrder',authenticateToken,this.orderController.saveOder)
        this.router.put('/updateOrder',authenticateToken,this.orderController.updateOrder)
        this.router.delete('/deleteOrder',authenticateToken,this.orderController.deleteOrder)
        this.router.get('/getAllOrders',authenticateToken,this.orderController.getAllOrders)
    }
}
const orderRoutes:OrderRoutes =new OrderRoutes()
export default orderRoutes;