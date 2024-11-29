import express from 'express'
import dotenv from "dotenv"
dotenv.config();
import mongoose from "mongoose"
import userRoutes from "./Routes/userRoutes.js"
import chatRoutes from "./Routes/chatRoutes.js"
import {error,notFound} from "./Middleware/errorMiddleware.js"

const app = express()
const PORT = process.env.PORT || 5000;
const URI = process.env.URI

app.use(express.json());

//set-up database
mongoose.connect(URI)
.then(response=>console.log(`Databse connected`))
.catch(e=>{console.log(`Error connected Databse: ${e.name}`)
    process.exit(0)})

app.get('/',(req,res)=>{
    res.status(200).send('Api is running');
})

// app.get('/api/chat',(req,res)=>{
//     console.clear();
//     console.log('Hit')
//     res.json({message:'Chats'})
// })


// app.get('/api/chat/:id',(req,res)=>{
//     console.log(req.params.id)
// })

app.use('/api/user',userRoutes);
app.use('/api/chat',chatRoutes);

app.use(notFound);
app.use(error);

app.listen(PORT,()=>{
    console.log(`Server started @ http://localhost:${PORT}/`)
})