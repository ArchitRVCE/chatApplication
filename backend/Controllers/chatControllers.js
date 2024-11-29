import Chat from "../Models/chatModel.js"
import User from "../Models/userModel.js";

export const fetchChats = async (req,res) =>{
    try {
        await Chat.find({
            users: {$elemMatch: {$eq: req.user_id}}
        }).populate("users","-password")
        .populate("latestMessage")
        .populate("admin","-password")
        .sort({updatedAt: -1})
        .then(async (results)=>{
            results = await User.populate(results,{
                path: "latestMessage.sender",
                select: "name email"
            })

            res.status(200).send(results)
        })
    } catch (error) {
        res.status(500).json({message:"trouble fetching chats with logged in user"})
    }
}
export const accessChat = async(req,res) =>{
    const {userId} = req.body;
    
    if(!userId){
        return res.status(400).json({message:'User not provided in parameter'})
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        // $and: [
        //     {users:{$elemMatch:{$eq:userId}}},
        //     {users:{$elemMatch:{$eq:req.user_id._id}}}
        // ]
        users: {$all: [userId,req.user_id]}
    }).populate("users","-password").populate("latestMessage");

    isChat = await User.populate(isChat,{
        path: "latestMessage.sender",
        select: "name email"
    })
    if(isChat.length > 0){
        console.log('>0')
        res.status(200).send(isChat[0]);
    }//else create a new chat
    else{
        console.log('<=0')
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users : [userId,req.user_id]
        }
        try {
            const createdChat = await Chat.create(chatData);
            const fullChat = await Chat.findById(createdChat._id).populate("users","-password");

            res.status(200).send(fullChat);
        } catch (error) {
            res.status(400).json({message:"Problem creating chat"});
        }
    }
}
export const createGroupChat = async(req,res) =>{
    let {users,name} = req.body;
        users = JSON.parse(users)
        if(!users || !name){
            return res.status(400).json({message:"Please provide users and name"})
        }
        if(users.length<2){
            return res.status(400).json({message:"Atleast 2 users are required to form a group"}) 
        }
        users.push(req.user_id);
         try {
            const groupChat = await Chat.create({
                chatName: req.body.name,
                users: users,
                isGroupChat: true,
                groupAdmin: req.user_id
            });
            console.log('See this',groupChat._id)
          
            const fullChatGroup = await Chat.findById(groupChat._id)
            .populate("users","-password")
            .populate("admin","-password");
            console.log('This is it',fullChatGroup._id)
            res.status(200).send(fullChatGroup)

    } catch (error) {
        console.log(error.name,error.message)
        res.status(500).json({message:"Problem creating group chat"})
    }
}
export const renameGroup = async(req,res) =>{
    const {chatId,chatName} = req.body;
    console.log(chatId,chatName)
    const updatedChat = await Chat.findByIdAndUpdate(
        chatId,
        {
            chatName,
        },
        {
            new:true,
        }
    ).populate("users","-password")
    .populate("admin","-password");

    if (!updatedChat) {
        return res.status(400).json({message:'Chat not found'})
    } else {
        return res.status(200).json(updatedChat)
    }
}
export const removeFromGroup = async(req,res) =>{
    const {chatId,userId} = req.body;
    try {
        const updatedChatWithUser = await Chat.findByIdAndUpdate(
            chatId,
            {
                $pull: {users: userId}
            },
            {
                new:true
            }
        ).populate("users","-password")
        .populate("admin","-password")
        if (!updatedChatWithUser) {
            return res.status(400).json({message:'Chat not found'})
        } else {
            return res.status(200).json(updatedChatWithUser)
        }
    } catch (error) {
        return res.status(400).json({message:"Could not remove to group"})
    }
}
export const addToGroup = async(req,res) =>{
    const {chatId,userId} = req.body;
    try {
        const updatedChatWithUser = await Chat.findByIdAndUpdate(
            chatId,
            {
                $push: {users: userId}
            },
            {
                new:true
            }
        ).populate("users","-password")
        .populate("admin","-password")
        if (!updatedChatWithUser) {
            return res.status(400).json({message:'Chat not found'})
        } else {
            return res.status(200).json(updatedChatWithUser)
        }
    } catch (error) {
        return res.status(400).json({message:"Could not add to group"})
    }
}