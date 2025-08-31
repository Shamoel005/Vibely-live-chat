// import uploadOnCloudinary from "../config/cloudinary.js";
// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const sendMessage=async (req,res)=>{
//     try {
//         let sender=req.userId
//         let {receiver}=req.params
//         let {message}=req.body

//         let image;
//         if(req.file){
//             image=await uploadOnCloudinary(req.file.path)
//         }

//         let conversation=await Conversation.findOne({
//             partcipants:{$all:[sender,receiver]}
//         })

//         let newMessage=await Message.create({
//             sender,receiver,message,image
//         })

//         if(!conversation){
//             conversation=await Conversation.create({
//                 partcipants:[sender,receiver],
//                 messages:[newMessage._id]
//             })
//         }else{
//             conversation.messages.push(newMessage._id)
//             await conversation.save()
//         }

//         const receiverSocketId=getReceiverSocketId(receiver)
// if(receiverSocketId){
//     io.to(receiverSocketId).emit("newMessage",newMessage)
// }


        
//         return res.status(201).json(newMessage)
    
//     } catch (error) {
//         return res.status(500).json({message:`send Message error ${error}`})
//     }
// }

// export const getMessages=async (req,res)=>{
//     try {
//         let sender=req.userId
//         let {receiver}=req.params
//         let conversation=await Conversation.findOne({
//             partcipants:{$all:[sender,receiver]}
//         }).populate("messages")

//         return res.status(200).json(conversation?.messages)
//     } catch (error) {
//         return res.status(500).json({message:`get Message error ${error}`})
//     }
// }


// import uploadOnCloudinary from "../config/cloudinary.js";
// import Conversation from "../models/conversation.model.js";
// import Message from "../models/message.model.js";
// import { getReceiverSocketId, io } from "../socket/socket.js";

// export const sendMessage = async (req, res) => {
//     try {
//         let sender = req.userId
//         let { receiver } = req.params
//         let { message } = req.body

//         let image;
//         if (req.file) {
//             image = await uploadOnCloudinary(req.file.path)
//         }

//         let conversation = await Conversation.findOne({
//             partcipants: { $all: [sender, receiver] }
//         })

//         let newMessage = await Message.create({
//             sender, receiver, message, image
//         })

//         if (!conversation) {
//             conversation = await Conversation.create({
//                 partcipants: [sender, receiver],
//                 messages: [newMessage._id]
//             })
//         } else {
//             conversation.messages.push(newMessage._id)
//             await conversation.save()
//         }

//         // Populate the new message with sender details for real-time update
//         const populatedMessage = await Message.findById(newMessage._id).populate('sender', 'name userName image');

//         const receiverSocketId = getReceiverSocketId(receiver)
//         if (receiverSocketId) {
//             io.to(receiverSocketId).emit("newMessage", populatedMessage)
//         }

//         return res.status(201).json(populatedMessage)

//     } catch (error) {
//         return res.status(500).json({ message: `send Message error ${error}` })
//     }
// }

// export const getMessages = async (req, res) => {
//     try {
//         let sender = req.userId
//         let { receiver } = req.params
//         let conversation = await Conversation.findOne({
//             partcipants: { $all: [sender, receiver] }
//         }).populate({
//             path: "messages",
//             populate: {
//                 path: "sender",
//                 select: "name userName image"
//             }
//         })

//         // Mark messages as read when fetching them
//         if (conversation && conversation.messages.length > 0) {
//             await Message.updateMany(
//                 {
//                     _id: { $in: conversation.messages.map(msg => msg._id) },
//                     receiver: sender,
//                     read: false
//                 },
//                 { $set: { read: true } }
//             );
//         }

//         return res.status(200).json(conversation?.messages || [])
//     } catch (error) {
//         return res.status(500).json({ message: `get Message error ${error}` })
//     }
// }

// export const getUnreadCounts = async (req, res) => {
//     try {
//         const userId = req.userId;

//         const unreadCounts = await Message.aggregate([
//             {
//                 $match: {
//                     receiver: userId,
//                     read: false
//                 }
//             },
//             {
//                 $group: {
//                     _id: "$sender",
//                     count: { $sum: 1 }
//                 }
//             }
//         ]);

//         // Convert to object format: { senderId: count }
//         const countsObject = {};
//         unreadCounts.forEach(item => {
//             countsObject[item._id.toString()] = item.count;
//         });

//         return res.status(200).json(countsObject);
//     } catch (error) {
//         return res.status(500).json({ message: `get unread counts error ${error}` });
//     }
// }

// // Add this function to mark messages as read for a specific sender
// export const markMessagesAsRead = async (req, res) => {
//     try {
//         const userId = req.userId;
//         const { senderId } = req.params;

//         await Message.updateMany(
//             {
//                 sender: senderId,
//                 receiver: userId,
//                 read: false
//             },
//             { $set: { read: true } }
//         );

//         return res.status(200).json({ message: "Messages marked as read" });
//     } catch (error) {
//         return res.status(500).json({ message: `mark as read error ${error}` });
//     }
//}



import uploadOnCloudinary from "../config/cloudinary.js";
import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId, io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
    try {
        let sender = req.userId
        let { receiver } = req.params
        let { message } = req.body

        let image;
        if (req.file) {
            image = await uploadOnCloudinary(req.file.path)
        }

        let conversation = await Conversation.findOne({
            partcipants: { $all: [sender, receiver] }
        })

        let newMessage = await Message.create({
            sender, receiver, message, image
        })

        if (!conversation) {
            conversation = await Conversation.create({
                partcipants: [sender, receiver],
                messages: [newMessage._id]
            })
        } else {
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }

        // Populate the new message with sender details for real-time update
        const populatedMessage = await Message.findById(newMessage._id).populate('sender', 'name userName image');

        const receiverSocketId = getReceiverSocketId(receiver)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", populatedMessage)
        }

        return res.status(201).json(populatedMessage)

    } catch (error) {
        return res.status(500).json({ message: `send Message error ${error}` })
    }
}

export const getMessages = async (req, res) => {
    try {
        let sender = req.userId
        let { receiver } = req.params
        let conversation = await Conversation.findOne({
            partcipants: { $all: [sender, receiver] }
        }).populate({
            path: "messages",
            populate: {
                path: "sender",
                select: "name userName image"
            }
        })

        // Filter out messages that are deleted for the current user
        let filteredMessages = [];
        if (conversation && conversation.messages.length > 0) {
            filteredMessages = conversation.messages.filter(message => 
                !message.deleted && !message.deletedFor.includes(sender)
            );
        }

        // Mark messages as read when fetching them
        if (filteredMessages.length > 0) {
            await Message.updateMany(
                {
                    _id: { $in: filteredMessages.map(msg => msg._id) },
                    receiver: sender,
                    read: false
                },
                { $set: { read: true } }
            );
        }

        return res.status(200).json(filteredMessages)
    } catch (error) {
        return res.status(500).json({ message: `get Message error ${error}` })
    }
}

export const getUnreadCounts = async (req, res) => {
    try {
        const userId = req.userId;

        const unreadCounts = await Message.aggregate([
            {
                $match: {
                    receiver: userId,
                    read: false,
                    deleted: false,
                    deletedFor: { $ne: userId }
                }
            },
            {
                $group: {
                    _id: "$sender",
                    count: { $sum: 1 }
                }
            }
        ]);

        // Convert to object format: { senderId: count }
        const countsObject = {};
        unreadCounts.forEach(item => {
            countsObject[item._id.toString()] = item.count;
        });

        return res.status(200).json(countsObject);
    } catch (error) {
        return res.status(500).json({ message: `get unread counts error ${error}` });
    }
}

export const markMessagesAsRead = async (req, res) => {
    try {
        const userId = req.userId;
        const { senderId } = req.params;

        await Message.updateMany(
            {
                sender: senderId,
                receiver: userId,
                read: false,
                deleted: false,
                deletedFor: { $ne: userId }
            },
            { $set: { read: true } }
        );

        return res.status(200).json({ message: "Messages marked as read" });
    } catch (error) {
        return res.status(500).json({ message: `mark as read error ${error}` });
    }
}

// Add delete message function
export const deleteMessage = async (req, res) => {
    try {
        const userId = req.userId;
        const { messageId } = req.params;

        // Find the message
        const message = await Message.findById(messageId);

        if (!message) {
            return res.status(404).json({ message: "Message not found" });
        }

        // Check if user is either sender or receiver
        if (message.sender.toString() !== userId.toString() && message.receiver.toString() !== userId.toString()) {
            return res.status(403).json({ message: "Not authorized to delete this message" });
        }

        let updateData = {};
        let socketEventData = { messageId };

        // If user is the sender, delete for everyone
        if (message.sender.toString() === userId.toString()) {
            updateData = { deleted: true };
            socketEventData.deletedForEveryone = true;
        } else {
            // If user is the receiver, delete only for themselves
            updateData = { $addToSet: { deletedFor: userId } };
            socketEventData.deletedForMe = true;
        }

        // Update the message
        await Message.findByIdAndUpdate(messageId, updateData);

        // Emit socket event to update both users
        const otherUserId = message.sender.toString() === userId.toString() ? message.receiver : message.sender;
        const otherUserSocketId = getReceiverSocketId(otherUserId);
        
        if (otherUserSocketId) {
            io.to(otherUserSocketId).emit("messageDeleted", socketEventData);
        }

        return res.status(200).json({ message: "Message deleted successfully" });
    } catch (error) {
        console.error("Delete message error:", error);
        return res.status(500).json({ message: `delete message error ${error}` });
    }
}