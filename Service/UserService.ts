import prisma from "../prisma/Client";
import {UserDTO} from "../DTO/UserDTO";
import bcrypt from 'bcrypt'
import {User} from "@prisma/client";
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
export async function verifyUser(varifyUser:UserDTO){
    const user : User | null = await prisma.user.findUnique({
        where: { email: varifyUser.email },
    });
    if (!user) {
        return false;
    }
    return await bcrypt.compare(varifyUser.password, user.password);
}