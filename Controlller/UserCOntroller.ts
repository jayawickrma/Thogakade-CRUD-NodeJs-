class UserCOntroller{
    async signIn(req:any,resp:any){
        console.log(req.body)
        try{

        }catch (err){
            resp.status(403).send("Un Authorized to login to the system....")
        }
    }
    async signUp(req:any,resp:any){
        try{

        }catch (err){
            resp.status(401).send("Un Authorized to login to the system....")
        }
    }
}
export default UserCOntroller;