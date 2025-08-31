// import mongoose from "mongoose"
// const messageSchema=new mongoose.Schema({
// sender:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"User",
//     required:true
// },
// receiver:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"User",
//     required:true
// },
// message:{
//     type:String,
//     default:""
// },
// image:{
//     type:String,
//     default:""
// }

// },{timestamps:true})

// const Message=mongoose.model("Message",messageSchema)
// export default Message


// import mongoose from "mongoose"

// const messageSchema = new mongoose.Schema({
//     sender: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     receiver: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true
//     },
//     message: {
//         type: String,
//         default: ""
//     },
//     image: {
//         type: String,
//         default: ""
//     },
//     read: {
//         type: Boolean,
//         default: false
//     }
// }, { timestamps: true })

// const Message = mongoose.model("Message", messageSchema)
// export default Message


import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    message: {
        type: String,
    },
    image: {
        type: String,
    },
    read: {
        type: Boolean,
        default: false
    },
    deleted: {
        type: Boolean,
        default: false
    },
    deletedFor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }]
}, { timestamps: true });

export default mongoose.model("Message", messageSchema);