import {createUser, verifyUser} from "../Service/UserService";

class UserCOntroller{
    async signIn(req:any,resp:any){
        const email =req.body.email
        const pw =req.body.password

        console.log(req.body)
        try{
           const findUser =await verifyUser(email)
            if (!findUser) {
                return resp.status(404).json({error: 'User not found!'});
            }else {
                resp.status(200).send("hii welcome")
            }
        }catch (err){
            resp.status(403).send("Un Authorized to login to the system....")
        }
    }
    async signUp(req:any,resp:any){
        const user =req.body
        try{
            await createUser(user)
            resp.status(200).json(user)
        }catch (err){
            resp.status(401).send("Un Authorized to login to the system....")
        }
    }
}
export default UserCOntroller;