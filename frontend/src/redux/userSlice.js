// import { createSlice } from "@reduxjs/toolkit";

// const userSlice=createSlice({
//    name:"user",
//    initialState:{
//     userData:null,
//     otherUsers:null,
//     selectedUser:null,
//     socket:null,
//     onlineUsers:null,
//     searchData:null
//    },  
//    reducers:{
//     setUserData:(state,action)=>{
//    state.userData=action.payload
//     },
//     setOtherUsers:(state,action)=>{
//       state.otherUsers=action.payload
//        },
//        setSelectedUser:(state,action)=>{
//          state.selectedUser=action.payload
//           }
//           ,
//           setSocket:(state,action)=>{
//             state.socket=action.payload
//              },
//              setOnlineUsers:(state,action)=>{
//               state.onlineUsers=action.payload
//                },
//                setSearchData:(state,action)=>{
//                 state.searchData=action.payload
//                  }
//    }
// })

// export const {setUserData, setOtherUsers,setSelectedUser,setSocket,setOnlineUsers,setSearchData}=userSlice.actions
// export default userSlice.reducer

import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    otherUsers: null,
    selectedUser: null,
    socket: null,
    onlineUsers: null,
    searchData: null,
    unreadCounts: {}, // Separate object to track unread counts by user ID
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setOtherUsers: (state, action) => {
      state.otherUsers = action.payload;
      
      // Initialize unread counts from user data
      if (action.payload) {
        action.payload.forEach(user => {
          if (user.unreadCount !== undefined) {
            state.unreadCounts[user._id] = user.unreadCount;
          }
        });
      }
    },
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
      
      // Reset unread count when selecting a user
      if (action.payload && state.unreadCounts[action.payload._id]) {
        state.unreadCounts[action.payload._id] = 0;
      }
    },
    setSocket: (state, action) => {
      state.socket = action.payload;
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload;
    },
    setSearchData: (state, action) => {
      state.searchData = action.payload;
    },
    
    // Update unread counts for multiple users
    updateUnreadCounts: (state, action) => {
      state.unreadCounts = { ...state.unreadCounts, ...action.payload };
    },
    
    // Mark all messages as read for a specific user
    markMessagesAsRead: (state, action) => {
      const userId = action.payload;
      if (state.unreadCounts[userId] !== undefined) {
        state.unreadCounts[userId] = 0;
      }
    },

    // Add incoming message for a user
    addMessageToUser: (state, action) => {
      const { senderId, message, createdAt } = action.payload;

      state.otherUsers = state.otherUsers?.map(user => {
        if (user._id === senderId) {
          return {
            ...user,
            lastMessage: message,
            lastMessageTime: createdAt,
          };
        }
        return user;
      });
      
      // Sort users by last message time
      state.otherUsers.sort((a, b) => {
        if (!a.lastMessageTime && !b.lastMessageTime) return 0;
        if (!a.lastMessageTime) return 1;
        if (!b.lastMessageTime) return -1;
        return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
      });
      
      // Update unread count in the separate object
      if (state.selectedUser?._id !== senderId) {
        state.unreadCounts[senderId] = (state.unreadCounts[senderId] || 0) + 1;
      }
    },

    // Update last message you sent
    updateLastMessage: (state, action) => {
      const { receiverId, message, createdAt } = action.payload;

      state.otherUsers = state.otherUsers?.map(user => {
        if (user._id === receiverId) {
          return {
            ...user,
            lastMessage: message,
            lastMessageTime: createdAt
          };
        }
        return user;
      });
      
      // Sort users by last message time
      state.otherUsers.sort((a, b) => {
        if (!a.lastMessageTime && !b.lastMessageTime) return 0;
        if (!a.lastMessageTime) return 1;
        if (!b.lastMessageTime) return -1;
        return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
      });
    },
  }
});

export const {
  setUserData,
  setOtherUsers,
  setSelectedUser,
  setSocket,
  setOnlineUsers,
  setSearchData,
  updateUnreadCounts,
  markMessagesAsRead,
  addMessageToUser,
  updateLastMessage
} = userSlice.actions;

export default userSlice.reducer;