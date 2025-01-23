import {addItem, deleteItem, getAllItems, updateItem} from "../Service/ItemService";
import {ItemDTO} from "../DTO/ItemDTO";

class ItemController{
    async saveItem(req:any,resp:any){
        try{
          const save=  await addItem(req.body)
                resp.status(201).json(save)
        }catch (err){
            resp.send(err).status(500)
        }
    }
    async deleteItem(req:any,resp:any){
        const id =parseInt(req.query['id'])
        try{
           await deleteItem(id)
                resp.status(200).send(id+" deleted...")

        }catch (err){
            resp.status(500).send(err)
        }
    }
    async updateItem(req:any,resp:any){
        const id =parseInt(req.query['id'])
        const item:ItemDTO =req.body
        try{
            await updateItem(id,item)
            resp.status(200).send("updated...")
        }catch (err){
            resp.status(500).send(err)
        }
    }
    async getAllItems(req:any,resp:any){
        try{
            const all =await getAllItems();
        }catch (err){
            resp.status(500).send(err)
        }
    }
}
export default ItemController;