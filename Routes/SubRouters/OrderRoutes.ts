import {Router} from "express";
import OrderController from "../../Controlller/OrderController";

class OrderRoutes{
    router:Router
    orderController:OrderController

    constructor() {
        this.router =Router()
        this.orderController =new OrderController()
        this.initialRoutes();
    }
    initialRoutes():void{
        this.router.post('/addOrder',this.orderController.saveOder)
        this.router.put('/updateOrder',this.orderController.updateOrder)
        this.router.delete('/deleteOrder',this.orderController.deleteOrder)
        this.router.get('/getAllOrders',this.orderController.getAllOrders)
    }
}
const orderRoutes:OrderRoutes =new OrderRoutes()
export default orderRoutes;