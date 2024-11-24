import express from 'express'
import dotenv from "dotenv"
import mongoose from "mongoose"


//set-up database
mongoose.connect("mongodb+srv://Archit:MyChatApk@mychatapk.ajsdp.mongodb.net/MyChatApk?retryWrites=true&w=majority&appName=MyChatApk")
.then(response=>console.log(`Databse connected`))
.catch(e=>console.log(`Error connected Databse: ${e.name}`))
dotenv.config();

const app = express()
const PORT = process.env.PORT || 5000;

app.get('/',(req,res)=>{
    res.status(200).send('Api is running');
})

app.get('/api/chat',(req,res)=>{
    console.clear();
    console.log('Hit')
    res.json({message:'Chats'})
})


app.get('/api/chat/:id',(req,res)=>{
    console.log(req.params.id)
})

app.listen(PORT,()=>{
    console.log(`Server started @ http://localhost:${PORT}/`)
})