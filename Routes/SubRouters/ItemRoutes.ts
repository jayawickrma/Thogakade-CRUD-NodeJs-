import {Router} from "express";
import ItemController from "../../Controlller/ItemCOntroller";
import {authenticateToken} from "../../Util/AuthenticateUser";

class ItemRoutes{
    router:Router
    itemController :ItemController

    constructor() {
        this.router =Router()
        this.itemController =new ItemController()
        this.initialRoutes()
    }
    initialRoutes():void{
        this.router.get('/getAllItems' ,authenticateToken,this.itemController.getAllItems)
        this.router.post('/addItem',authenticateToken,this.itemController.saveItem)
        this.router.put('/updateItem',authenticateToken,this.itemController.updateItem)
        this.router.delete('/deleteItem',authenticateToken,this.itemController.deleteItem)
    }

}
const itemRouter:ItemRoutes =new ItemRoutes()
export default itemRouter;