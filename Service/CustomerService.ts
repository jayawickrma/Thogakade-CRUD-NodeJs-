import {CustomerDTO} from "../DTO/CustomerDTO";
import prisma from "../prisma/Client";
import exp from "constants";


export async function addCustomer(customerDto:CustomerDTO){
    console.log(customerDto)
    try{
        await prisma.customer.create({
            data:{
                Name:customerDto.name,
                Address:customerDto.address,
                Email:customerDto.email
            }
        })
    }catch (err){
        console.log(err)
    }
}
export async function deleteCustomer(id:number){
    console.log(id)
    try{
        await prisma.customer.delete({
            where:{CustomerID:id}
        })
    }catch (err){
        console.log(err)
    }
}

export async function getAllCustomers(){
    try{
        const getALl =await prisma.customer.findMany()
            if (getALl){
                return getALl;
            }
    }catch (err){
        console.log(err)
    }
}

export async function updateCustomer(id:number,customerDto:CustomerDTO){
    try{
        await prisma.customer.update({
            where:{CustomerID:id},
            data:{
                Name:customerDto.name,
                Address:customerDto.address,
                Email:customerDto.email
            }
        })
    }catch (err){
        console.log(err)
    }
}