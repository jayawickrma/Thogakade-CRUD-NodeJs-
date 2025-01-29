import {createUser, verifyUser} from "../Service/UserService";
import {UserDTO} from "../DTO/UserDTO";
import jwt, {Secret} from 'jsonwebtoken';
import express from "express";
class UserController {
    async signIn(req: any, resp: any) {
            const email = req.body.email;
            const password = req.body.password;

            const user: UserDTO = {email, password};

            try {
                const isVerified = await verifyUser(user);

                if (isVerified) {
                    const token = jwt.sign({email}, process.env.SECRET_KEY as Secret, {expiresIn: "1m"});
                    const refreshToken = jwt.sign({email}, process.env.REFRESH_TOKEN as Secret, {expiresIn: "7d"});
                    resp.json({accessToken: token, refreshToken: refreshToken});
                } else {
                    resp.sendStatus(403).send('Invalid credentials')
                }
            } catch (err) {
                console.log(err);
                resp.status(400).send(err);
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
    async refreshToken(req:any,resp:any){
        const authHeader = req.headers.authorization;
        const refresh_token = authHeader?.split(' ')[1];

        if(!refresh_token)resp.status(401).send('No token provided');

        try{
            const payload = jwt.verify(refresh_token as string, process.env.REFRESH_TOKEN as Secret) as {username: string, iat: number};
            const token = jwt.sign({ username: payload.username }, process.env.SECRET_KEY as Secret, {expiresIn: "1m"});
            resp.json({accessToken : token});
        }catch(err){
            console.log(err);
            resp.status(401).json(err);
        }
    }
    async authenticateToken(req : express.Request, res : express.Response, next : express.NextFunction){
        const authHeader = req.headers.authorization;
        const token = authHeader?.split(' ')[1];

        console.log(token);
        if(!token)res.status(401).send('No token provided');

        try{
            const payload = jwt.verify(token as string, process.env.SECRET_KEY as Secret) as {username: string, iat: number};
            console.log(payload.username);
            req.body.username = payload.username;
            next();
        }catch(err){
            res.status(401).send(err);
        }
    }
}
export default UserController;