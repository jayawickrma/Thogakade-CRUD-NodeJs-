import {Router} from "express";
import UserCOntroller from "../../Controlller/UserCOntroller";

class AuthRouter{
    router:Router;
    userController:UserCOntroller

    constructor() {
        this.router =Router()
        this.userController =new UserCOntroller()
        this.initialStates()
    }
     initialStates():void{
        this.router.post('/signIn',this.userController.signIn)
         this.router.post('/signUp',this.userController.signUp)
    }
}
const auth:AuthRouter =new AuthRouter()
export default auth;