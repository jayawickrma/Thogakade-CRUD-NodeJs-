import {Router} from "express";
import ItemController from "../../Controlller/ItemCOntroller";

class ItemRoutes{
    router:Router
    itemController :ItemController

    constructor() {
        this.router =Router()
        this.itemController =new ItemController()
        this.initialRoutes()
    }
    initialRoutes():void{
        this.router.get('/getAllItems',this.itemController.getAllItems)
        this.router.post('/addItem',this.itemController.saveItem)
        this.router.put('/updateItem',this.itemController.updateItem)
        this.router.delete('/deleteItem',this.itemController.deleteItem)
    }

}
const itemRouter:ItemRoutes =new ItemRoutes()
export default itemRouter;