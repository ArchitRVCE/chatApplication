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
        res.status(201).cookie(generateToken(newUser._id)).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
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
        throw new Error("Please enter all fields");
    }

    const userExists = await User.findOne({email});
    if(!userExists){
        res.status(400);
        throw new Error('User does not exists');
    }
    
    if(bcrypt.compareSync(password,userExists.password)){
        res.status(200).cookie(generateToken(userExists._id)).json({
            _id: userExists._id,
            name: userExists.name,
            email: userExists.email,
        })
    }
}