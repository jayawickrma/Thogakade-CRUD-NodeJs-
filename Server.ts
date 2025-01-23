import express from "express"
import mainRouter from "./Routes/MainRoutes";
const app=express()
const port =3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/store',mainRouter.router)


app.listen(port,()=>{
    console.log("server is started on port number : "+port)
})