import {addOrder} from "../Service/OrderService";

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
    async deleteOrder(req:any,resp:any){}
    async updateOrder(req:any,resp:any){}
    async getAllOrders(req:any,resp:any ){}
}
export default OrderController;