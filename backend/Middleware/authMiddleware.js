import jwt from 'jsonwebtoken'
import User from '../Models/userModel.js'

export const protect = async(req,res,next) =>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            console.log('token',decoded);
            const {_id} = await User.findById(decoded.id).select("-password");
            req.user_id = _id.toString();
            console.log('token->',req.user_id);
            next();
        }catch(eror){
            res.status(400).json({message:'Not authorize, token failedss'});
            //throw new Error('Not authorize, token failed')
        }
    }
    if(!token){
        res.status(401).json({message:'Unauthenticated, token not provided'});
        //throw new Error('Not authorized, token not provided');
    }
}