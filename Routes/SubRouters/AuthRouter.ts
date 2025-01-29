import {Router} from "express";
import UserController from "../../Controlller/UserCOntroller";

class AuthRouter{
    router:Router;
    userController:UserController

    constructor() {
        this.router =Router()
        this.userController =new UserController()
        this.initialStates()
    }
     initialStates():void{
        this.router.post('/signIn',this.userController.signIn)
         this.router.post('/signUp',this.userController.signUp)
         this.router.post('/refreshToken',this.userController.refreshToken)
    }
}
const auth:AuthRouter =new AuthRouter()
export default auth;