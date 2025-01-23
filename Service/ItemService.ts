import prisma from "../prisma/Client";
import {ItemDTO} from "../DTO/ItemDTO";

export async function addItem(item:ItemDTO){
    try{
        await prisma.item.create({
            data:{
                Name:item.itemName,
                Quantity:item.quantity,
                Price:item.price
            }
        })
    }catch (err){
        console.log(err)
    }
}
export async function deleteItem(id:number){
    try{
        await prisma.item.delete({
            where:{ItemID:id}
        })
    }catch (err){
        console.log(err)
    }
}

export async function getAllItems(){
    try{
       const all =await prisma.item.findMany()
        if (all){
            return all;
        }
    }catch (err){
        console.log(err)
    }
}

export async function updateItem(id:number,item:ItemDTO){
    try{
        await prisma.item.update({
            where:{ItemID:id},
            data:{
                Name:item.itemName,
                Quantity:item.quantity,
                Price:item.price
            }
        })
    }catch (err){
        console.log(err)
    }
}