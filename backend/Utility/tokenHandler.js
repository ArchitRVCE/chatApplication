import jwt from 'jsonwebtoken'

export const generateToken=(userID) => {
    return jwt.sign({id:userID},'first-key',{
        expiresIn:"30d",
    });
}