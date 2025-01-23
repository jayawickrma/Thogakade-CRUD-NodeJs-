import prisma from "../prisma/Client";
import {OrderDTO} from "../DTO/OrderDTO";
import e from "express";
import {connect} from "net";

export async function addOrder(orderDto:OrderDTO){
    try{
        await prisma.order.create({
            data:{
                OrderDate:new Date(),
                CustomerID:orderDto.customerId.id,
                OrderDetails:{
                    connect:
                }
            }
        })
    }catch (err){
        console.log(err)
    }
}
export async function cancelOrder(id:number){
    try{

    }catch (err){
        console.log(err)
    }
}
export async function viewAllOrders(){
    try{

    }catch (err){
        console.log(err)
    }
}
export async function updateOrder(id:number,order:OrderDTO){
    try{

    }catch (err){
        console.log(err)
    }
}