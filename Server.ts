import express from "express"
const app=express()
const port =3000;


app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use('/api/store',)


app.listen(port,()=>{
    console.log("server is started on port number : "+port)
})