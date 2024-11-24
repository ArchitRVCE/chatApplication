import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    pic: { type: String, required: true, default: "https://cdn.vectorstock.com/i/1000v/92/16/default-profile-picture-avatar-user-icon-vector-46389216.jpg" }
},{timestamps:true})

const User = mongoose.model('User',userSchema);

export default User