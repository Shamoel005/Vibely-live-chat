// import express from "express"
// import isAuth from "../middlewares/isAuth.js"
// import { upload } from "../middlewares/multer.js"
// import { getMessages, sendMessage } from "../controllers/message.controllers.js"

// const messageRouter=express.Router()

// messageRouter.post("/send/:receiver",isAuth,upload.single("image"),sendMessage)
// messageRouter.get("/get/:receiver",isAuth,getMessages)
// export default messageRouter


// import express from "express"
// import isAuth from "../middlewares/isAuth.js"
// import { upload } from "../middlewares/multer.js"
// import { getMessages, sendMessage, getUnreadCounts, markMessagesAsRead } from "../controllers/message.controllers.js"

// const messageRouter = express.Router()

// messageRouter.post("/send/:receiver", isAuth, upload.single("image"), sendMessage)
// messageRouter.get("/get/:receiver", isAuth, getMessages)
// messageRouter.get("/unread-counts", isAuth, getUnreadCounts)
// messageRouter.put("/mark-as-read/:senderId", isAuth, markMessagesAsRead) // Add this line

// export default messageRouter


import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"
import { getMessages, sendMessage, getUnreadCounts, markMessagesAsRead, deleteMessage } from "../controllers/message.controllers.js"

const messageRouter = express.Router()

messageRouter.post("/send/:receiver", isAuth, upload.single("image"), sendMessage)
messageRouter.get("/get/:receiver", isAuth, getMessages)
messageRouter.get("/unread-counts", isAuth, getUnreadCounts)
messageRouter.put("/mark-as-read/:senderId", isAuth, markMessagesAsRead)
messageRouter.delete("/delete/:messageId", isAuth, deleteMessage) // Add this line

export default messageRouter