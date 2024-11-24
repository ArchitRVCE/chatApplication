import express from 'express'
import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose"

const app = express()
const PORT = process.env.PORT || 5000;
const URI = process.env.URI

//set-up database
mongoose.connect(URI)
.then(response=>console.log(`Databse connected`))
.catch(e=>console.log(`Error connected Databse: ${e.name}`))


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