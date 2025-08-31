// import uploadOnCloudinary from "../config/cloudinary.js"
// import User from "../models/user.model.js"

// export const getCurrentUser=async (req,res)=>{
// try {
//     let user=await User.findById(req.userId).select("-password")
//     if(!user){
//         return res.status(400).json({message:"user not found"})
//     }

//     return res.status(200).json(user)
// } catch (error) {
//     return res.status(500).json({message:`current user error ${error}`})
// }
// }

// export const editProfile=async (req,res)=>{
//     try {
//         let {name}=req.body
//         let image;
//         if(req.file){
//             image=await uploadOnCloudinary(req.file.path)
//         }
//         let user=await User.findByIdAndUpdate(req.userId,{
//            name,
//            image 
//         },{new:true})

//         if(!user){
//             return res.status(400).json({message:"user not found"})
//         }

//         return res.status(200).json(user)
//     } catch (error) {
//         return res.status(500).json({message:`profile error ${error}`})
//     }
// }

// export const getOtherUsers=async (req,res)=>{
//     try {
//         let users=await User.find({
//             _id:{$ne:req.userId}
//         }).select("-password")
//         return res.status(200).json(users)
//     } catch (error) {
//         return res.status(500).json({message:`get other users error ${error}`})
//     }
// }

// export const search =async (req,res)=>{
//     try {
//         let {query}=req.query
//         if(!query){
//             return res.status(400).json({message:"query is required"})
//         }
//         let users=await User.find({
//             $or:[
//                 {name:{$regex:query,$options:"i"}},
//                 {userName:{$regex:query,$options:"i"}},
//             ]
//         })
//         return res.status(200).json(users)
//     } catch (error) {
//         return res.status(500).json({message:`search users error ${error}`})
//     }
// }



import uploadOnCloudinary from "../config/cloudinary.js"
import User from "../models/user.model.js"
import Conversation from "../models/conversation.model.js"
import Message from "../models/message.model.js"

export const getCurrentUser = async (req, res) => {
    try {
        let user = await User.findById(req.userId).select("-password")
        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `current user error ${error}` })
    }
}

export const editProfile = async (req, res) => {
    try {
        let { name } = req.body
        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }
        let user = await User.findByIdAndUpdate(req.userId, {
            name,
            image
        }, { new: true })

        if (!user) {
            return res.status(400).json({ message: "user not found" })
        }

        return res.status(200).json(user)
    } catch (error) {
        return res.status(500).json({ message: `profile error ${error}` })
    }
}

export const getOtherUsers = async (req, res) => {
    try {
        const currentUserId = req.userId;

        // Get all users except current user
        let users = await User.find({
            _id: { $ne: currentUserId }
        }).select("-password");

        // For each user, get the last message and unread count
        const usersWithMessages = await Promise.all(
            users.map(async (user) => {
                // Find the last message between current user and this user
                const lastMessage = await Message.findOne({
                    $or: [
                        { sender: currentUserId, receiver: user._id },
                        { sender: user._id, receiver: currentUserId }
                    ]
                })
                .sort({ createdAt: -1 })
                .populate('sender', 'name userName image');

                // Get unread message count (messages sent TO current user)
                const unreadCount = await Message.countDocuments({
                    sender: user._id, // Messages FROM this user
                    receiver: currentUserId, // TO current user
                    read: false
                });

                // Determine message preview
                let lastMessagePreview = null;
                let lastMessageTime = null;

                if (lastMessage) {
                    lastMessageTime = lastMessage.createdAt;
                    
                    // Check who sent the last message
                    if (lastMessage.sender._id.toString() === currentUserId.toString()) {
                        // Current user sent this message
                        lastMessagePreview = `You: ${lastMessage.message || (lastMessage.image ? "📷 Image" : "")}`;
                    } else {
                        // Other user sent this message
                        lastMessagePreview = lastMessage.message || (lastMessage.image ? "📷 Image" : "");
                    }
                }

                return {
                    ...user.toObject(),
                    lastMessage: lastMessagePreview,
                    lastMessageTime: lastMessageTime,
                    unreadCount
                };
            })
        );

        // Sort users by last message time (newest first)
        usersWithMessages.sort((a, b) => {
            if (!a.lastMessageTime && !b.lastMessageTime) return 0;
            if (!a.lastMessageTime) return 1;
            if (!b.lastMessageTime) return -1;
            return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
        });

        return res.status(200).json(usersWithMessages);
    } catch (error) {
        console.error("Error in getOtherUsers:", error);
        return res.status(500).json({ message: `get other users error ${error.message}` });
    }
}

export const search = async (req, res) => {
    try {
        let { query } = req.query
        if (!query) {
            return res.status(400).json({ message: "query is required" })
        }
        let users = await User.find({
            $or: [
                { name: { $regex: query, $options: "i" } },
                { userName: { $regex: query, $options: "i" } },
            ]
        })
        return res.status(200).json(users)
    } catch (error) {
        return res.status(500).json({ message: `search users error ${error}` })
    }
}