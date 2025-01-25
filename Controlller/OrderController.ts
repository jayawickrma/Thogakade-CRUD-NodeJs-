import {addOrder, deleteOrder} from "../Service/OrderService";

class OrderController{
    async saveOder(req:any,resp:any){
        console.log(req.body)
        try{
            await addOrder(req.body)
                resp.status(201).send("Order Placed...")
        }catch (err){
            resp.status(500).send(err)
        }
    }
    async deleteOrder(req:any,resp:any){
        const id =parseInt(req.query['id'])
        try{
            await deleteOrder(id)
            resp.status(200).send("Order Canceled...")
        }catch (err){
            resp.status(500).send(err)
        }
    }
    async updateOrder(req:any,resp:any){}
    async getAllOrders(req:any,resp:any ){}
}
export default OrderController;