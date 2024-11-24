import express from 'express'
import dotenv from "dotenv"
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