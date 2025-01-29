import {addCustomer, deleteCustomer, getAllCustomers, updateCustomer} from "../Service/CustomerService";
import {CustomerDTO} from "../DTO/CustomerDTO";
import {suite} from "node:test";

class CustomerController{
    async saveCustomer(req:any,resp:any){
        try{
           const saveCustomer = await addCustomer(req.body)
            resp.status(201).send("Customer Saved...")
                if (saveCustomer===resp.ok){
                    return saveCustomer;
                }
        }catch (err){
            resp.status(500).send(err)
        }
    }
    async deleteCustomer(req:any,resp:any){
        const id =parseInt(req.query['id'])
        console.log(id)
        try{
            await deleteCustomer(id)
                resp.status(200).json(id + " deleted successfully...")
        }catch (err){
            resp.status(500).send(err)
        }
    }
    async updateCustomer(req:any,resp:any){
        const id =parseInt(req.query['id'])
        const customer:CustomerDTO =req.body
        try{
            await updateCustomer(id,customer)
                resp.status(200).send("Updated...")
        }catch (err){
            resp.status(500).send(err)
        }
    }
    async getAllCustomers(req:any,resp:any){
        try {
            const all =await getAllCustomers();
                    resp.status(200).json(all)
        }catch (err){
            resp.status(500).send(err)
        }
    }
}
export default CustomerController;