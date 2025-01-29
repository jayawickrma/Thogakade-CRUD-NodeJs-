import prisma from "../prisma/Client";
import {UserDTO} from "../DTO/UserDTO";
import bcrypt from 'bcrypt'
export async function createUser(user:UserDTO){
    const hashedPw = await bcrypt.hash(user.password,10)
    try{
        await prisma.user.create({
            data:{
                email:user.email,
                password:hashedPw
            }
        })

    }catch (err){
        console.log(err)
    }

}
export async function verifyUser(email:any){
    try{
         const find =  await prisma.user.findUnique({
                where:{
                    email:email
                }
            })
        if (!find){
            return " Cannot Find user..."
        }else {
            return find
        }
    }catch (err){
        console.log(err)
    }
}