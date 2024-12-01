import User from "../Models/userModel.js"
import {generateToken} from "../Utility/tokenHandler.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

export const registerUser = async(req,res) =>{
    const {name,email,password} = req.body;
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please enter all fields");
    }

    const existingUser = await User.findOne({email});
    if(existingUser){
        res.status(400);
        throw new Error('User already exists');
    }

    const newUser = await User.create({
        name,
        email,
        password
    });
    if(newUser){
        res.status(201).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            token: generateToken(newUser._id)
        })
    }
    else{
        res.status(500);
        throw new Error('Failed to create user')
    }

}

export const authUser = async(req,res) =>{
    const {email,password} = req.body;
    if(!email || !password){
        res.status(400);
        //throw new Error("Please enter all fields");
    }

    const userExists = await User.findOne({email});
    if(!userExists){
        return res.status(400).json({message:"User does not exists"});
        //throw new Error('User does not exists');
    }
    
    if(bcrypt.compareSync(password,userExists.password)){
        return res.status(200).json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
            token: generateToken(userExists._id)
        })
    }
    return res.status(400).json({message:"Password incorrect"})
}

export const allUsers = async(req,res)=>{
    const keywords = req.query.search ? {
        $or : [
            { name: {$regex: req.query.search, $options: "i"}},
            { email:{$regex: req.query.search, $options: "i"}}
        ]
    }:  {}
    console.log('keywords',keywords)
    const users = await User.find(keywords).find({_id:{$ne:req.user_id}}).select("-password");
    res.status(200).json({users})
}