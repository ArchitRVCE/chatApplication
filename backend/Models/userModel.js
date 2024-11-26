import mongoose from 'mongoose'
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    pic: { type: String, required: true, default: "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg" }
},{timestamps:true})

userSchema.pre('save',async function(next){
    if(!this.isModified){
        next();
    }
    const salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password,salt)
})

const User = mongoose.model('User',userSchema);

export default User