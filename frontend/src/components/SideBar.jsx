// import React, { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import dp from "../assets/dp.webp"
// import { IoIosSearch } from "react-icons/io";
// import { RxCross2 } from "react-icons/rx";
// import { BiLogOutCircle } from "react-icons/bi";
// import { serverUrl } from '../main';
// import axios from 'axios';
// import { setOtherUsers, setSearchData, setSelectedUser, setUserData } from '../redux/userSlice';
// import { useNavigate } from 'react-router-dom';
// function SideBar() {
//     let {userData,otherUsers,selectedUser,onlineUsers,searchData} = useSelector(state=>state.user)
//     let [search,setSearch]=useState(false)
//     let [input,setInput]=useState("")
// let dispatch=useDispatch()
// let navigate=useNavigate()
//     const handleLogOut=async ()=>{
//         try {
//             let result =await axios.get(`${serverUrl}/api/auth/logout`,{withCredentials:true})
// dispatch(setUserData(null))
// dispatch(setOtherUsers(null))
// navigate("/login")
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const handlesearch=async ()=>{
//         try {
//             let result =await axios.get(`${serverUrl}/api/user/search?query=${input}`,{withCredentials:true})
//             dispatch(setSearchData(result.data))
           
//         }
//         catch(error){
// console.log(error)
//         }
//     }

//     useEffect(()=>{
//         if(input){
//             handlesearch()
//         }

//     },[input])
//   return (
//     <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block bg-slate-200  relative ${!selectedUser?"block":"hidden"}`}>
//         <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-[#663399] shadow-gray-500 text-gray-700 cursor-pointer shadow-lg fixed bottom-[20px] left-[10px]' onClick={handleLogOut}>
//    <BiLogOutCircle className='w-[25px] h-[25px]'/>
// </div>
// {input.length>0 && <div className='flex absolute top-[250px] bg-[white] w-full h-[500px] overflow-y-auto items-center pt-[20px] flex-col gap-[10px] z-[150] shadow-lg'>
// {searchData?.map((user)=>(
//      <div className='w-[95%] h-[70px] flex items-center gap-[20px]  px-[10px] hover:bg-[#663399] border-b-2 border-gray-400 cursor-pointer' onClick={()=>{
//         dispatch(setSelectedUser(user))
//         setInput("")
//         setSearch(false)
//      }
//         }>
//      <div className='relative rounded-full bg-white  flex justify-center items-center '>
//      <div className='w-[60px] h-[60px]   rounded-full overflow-hidden flex justify-center items-center '>
//      <img src={user.image || dp} alt="" className='h-[100%]'/>
//      </div>
//      {onlineUsers?.includes(user._id) &&
//      <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>}
//      </div>
//      <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
//      </div>
// ))}
//         </div> }

//       <div className='w-full h-[300px] bg-[#663399] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px] '>
//     <h1 className='text-white font-bold text-[25px]'>Vibely</h1>
//    <div className='w-full flex justify-between items-center'>
//     <h1 className='text-gray-800 font-bold text-[25px]'>Hii , {userData.name || "user"}</h1>
//     <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg' onClick={()=>navigate("/profile")}>
// <img src={userData.image || dp} alt="" className='h-[100%]'/>
// </div>
//    </div>
//    <div className='w-full  flex items-center gap-[20px] overflow-y-auto py-[18px]'>
//     {!search && <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 cursor-pointer shadow-lg' onClick={()=>setSearch(true)}>
//    <IoIosSearch className='w-[25px] h-[25px]'/>
// </div>}

// {search && 
//     <form className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] relative'>
//     <IoIosSearch className='w-[25px] h-[25px]'/>
//     <input type="text" placeholder='search users...' className='w-full h-full p-[10px] text-[17px] outline-none border-0 ' onChange={(e)=>setInput(e.target.value)} value={input}/>
//     <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={()=>setSearch(false)}/>
     
//     </form>
//     }
// {!search && otherUsers?.map((user)=>(
//     onlineUsers?.includes(user._id) &&
//     <div className='relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center mt-[10px] cursor-pointer' onClick={()=>dispatch(setSelectedUser(user))}>
//     <div className='w-[60px] h-[60px]   rounded-full overflow-hidden flex justify-center items-center '>
//     <img src={user.image || dp} alt="" className='h-[100%]'/>
//     </div>
//     <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>
//     </div>
// ))}
 
//    </div>
//       </div>

//       <div className='w-full h-[50%] overflow-auto flex flex-col gap-[20px] items-center mt-[20px]'>
// {otherUsers?.map((user)=>(
//     <div className='w-[95%] h-[60px] flex items-center gap-[20px] shadow-gray-500 bg-white shadow-lg rounded-full hover:bg-[#663399] cursor-pointer' onClick={()=>dispatch(setSelectedUser(user))}>
//     <div className='relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center mt-[10px]'>
//     <div className='w-[60px] h-[60px]   rounded-full overflow-hidden flex justify-center items-center '>
//     <img src={user.image || dp} alt="" className='h-[100%]'/>
//     </div>
//     {onlineUsers?.includes(user._id) &&
//     <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>}
//     </div>
//     <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
//     </div>
// ))}
//       </div>
//     </div>
//   )
// }

// export default SideBar


import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dp from "../assets/dp.webp"
import { IoIosSearch } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { BiLogOutCircle } from "react-icons/bi";
import { serverUrl } from '../main';
import axios from 'axios';
import { 
  setOtherUsers, 
  setSearchData, 
  setSelectedUser, 
  setUserData, 
  markMessagesAsRead,
  updateUnreadCounts // Add this import
} from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';

function SideBar() {
    let {userData, otherUsers, selectedUser, onlineUsers, searchData, unreadCounts} = useSelector(state => state.user)
    let [search, setSearch] = useState(false)
    let [input, setInput] = useState("")
    let dispatch = useDispatch()
    let navigate = useNavigate()

    const handleLogOut = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/auth/logout`, {withCredentials: true})
            dispatch(setUserData(null))
            dispatch(setOtherUsers(null))
            navigate("/login")
        } catch (error) {
            console.log(error)
        }
    }

    const handleSearch = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/user/search?query=${input}`, {withCredentials: true})
            dispatch(setSearchData(result.data))
        } catch (error) {
            console.log(error)
        }
    }

    // Fetch unread counts when component mounts
    useEffect(() => {
        const fetchUnreadCounts = async () => {
            try {
                const response = await axios.get(`${serverUrl}/api/messages/unread-counts`, { 
                    withCredentials: true 
                });
                dispatch(updateUnreadCounts(response.data));
            } catch (error) {
                console.log("Error fetching unread counts:", error);
            }
        };
        
        fetchUnreadCounts();
        
        // Set up polling for unread counts (or use WebSocket for real-time updates)
        const interval = setInterval(fetchUnreadCounts, 10000); // Poll every 10 seconds
        
        return () => clearInterval(interval);
    }, [dispatch]);

    // Function to sort users by last message time (newest first)
    const sortUsersByLastMessage = (users) => {
        if (!users) return [];
        
        return [...users].sort((a, b) => {
            // If we have lastMessageTime, use it for sorting
            if (a.lastMessageTime && b.lastMessageTime) {
                return new Date(b.lastMessageTime) - new Date(a.lastMessageTime);
            }
            // If only one has a timestamp, prioritize it
            if (a.lastMessageTime && !b.lastMessageTime) return -1;
            if (!a.lastMessageTime && b.lastMessageTime) return 1;
            
            // Fallback: sort by name if no timestamps
            return (a.name || a.userName).localeCompare(b.name || b.userName);
        });
    };

    // Function to handle user selection
    const handleUserSelect = (user) => {
        dispatch(setSelectedUser(user));
        setInput("");
        setSearch(false);
        
        // Mark messages as read when selecting a user
        if (unreadCounts[user._id] > 0) {
            dispatch(markMessagesAsRead(user._id));
            
            // Make API call to update read status on the server
            const markMessagesAsReadOnServer = async () => {
                try {
                    await axios.put(`${serverUrl}/api/messages/mark-as-read/${user._id}`, {}, { 
                        withCredentials: true 
                    });
                } catch (error) {
                    console.log("Error marking messages as read:", error);
                }
            };
            markMessagesAsReadOnServer();
        }
    };

    useEffect(() => {
        if (input) {
            handleSearch();
        }
    }, [input]);

    // Format time for display (like WhatsApp)
    const formatTime = (timestamp) => {
        if (!timestamp) return '';
        
        const date = new Date(timestamp);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);
        
        if (diffInHours < 24) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else if (diffInHours < 48) {
            return 'Yesterday';
        } else {
            return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
        }
    };

    const sortedUsers = sortUsersByLastMessage(otherUsers);

    return (
        <div className={`lg:w-[30%] w-full h-full overflow-hidden lg:block bg-slate-200 relative ${!selectedUser ? "block" : "hidden"}`}>
            <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-[#663399] shadow-gray-500 text-gray-700 cursor-pointer shadow-lg fixed bottom-[20px] left-[10px]' onClick={handleLogOut}>
                <BiLogOutCircle className='w-[25px] h-[25px]'/>
            </div>
            
            {input.length > 0 && (
                <div className='flex absolute top-[250px] bg-[white] w-full h-[500px] overflow-y-auto items-center pt-[20px] flex-col gap-[10px] z-[150] shadow-lg'>
                    {searchData?.map((user) => (
                        <div 
                            key={user._id} 
                            className='w-[95%] h-[70px] flex items-center gap-[20px] px-[10px] hover:bg-[#663399] border-b-2 border-gray-400 cursor-pointer relative'
                            onClick={() => handleUserSelect(user)}
                        >
                            <div className='relative rounded-full bg-white flex justify-center items-center'>
                                <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center'>
                                    <img src={user.image || dp} alt="" className='h-[100%]'/>
                                </div>
                                {onlineUsers?.includes(user._id) && (
                                    <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>
                                )}
                            </div>
                            <div className='flex-1'>
                                <h1 className='text-gray-800 font-semibold text-[20px]'>{user.name || user.userName}</h1>
                            </div>
                            {unreadCounts[user._id] > 0 && (
                                <span className='bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm'>
                                    {unreadCounts[user._id]}
                                </span>
                            )}
                        </div>
                    ))}
                </div>
            )}

            <div className='w-full h-[300px] bg-[#663399] rounded-b-[30%] shadow-gray-400 shadow-lg flex flex-col justify-center px-[20px] '>
                <h1 className='text-white font-bold text-[25px]'>Vibely</h1>
                <div className='w-full flex justify-between items-center'>
                    <h1 className='text-gray-800 font-bold text-[25px]'>Hii , {userData?.name || "user"}</h1>
                    <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg' onClick={() => navigate("/profile")}>
                        <img src={userData?.image || dp} alt="" className='h-[100%]'/>
                    </div>
                </div>
                <div className='w-full flex items-center gap-[20px] overflow-y-auto py-[18px]'>
                    {!search && (
                        <div className='w-[60px] h-[60px] mt-[10px] rounded-full overflow-hidden flex justify-center items-center bg-white shadow-gray-500 cursor-pointer shadow-lg' onClick={() => setSearch(true)}>
                            <IoIosSearch className='w-[25px] h-[25px]'/>
                        </div>
                    )}

                    {search && (
                        <form className='w-full h-[60px] bg-white shadow-gray-500 shadow-lg flex items-center gap-[10px] mt-[10px] rounded-full overflow-hidden px-[20px] relative'>
                            <IoIosSearch className='w-[25px] h-[25px]'/>
                            <input type="text" placeholder='search users...' className='w-full h-full p-[10px] text-[17px] outline-none border-0' onChange={(e) => setInput(e.target.value)} value={input}/>
                            <RxCross2 className='w-[25px] h-[25px] cursor-pointer' onClick={() => setSearch(false)}/>
                        </form>
                    )}
                    
                    {!search && otherUsers?.map((user) => (
                        onlineUsers?.includes(user._id) && (
                            <div 
                                key={user._id}
                                className='relative rounded-full shadow-gray-500 bg-white shadow-lg flex justify-center items-center mt-[10px] cursor-pointer'
                                onClick={() => handleUserSelect(user)}
                            >
                                <div className='w-[60px] h-[60px] rounded-full overflow-hidden flex justify-center items-center'>
                                    <img src={user.image || dp} alt="" className='h-[100%]'/>
                                </div>
                                <span className='w-[12px] h-[12px] rounded-full absolute bottom-[6px] right-[-1px] bg-[#3aff20] shadow-gray-500 shadow-md'></span>
                                {unreadCounts[user._id] > 0 && (
                                    <span className='absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                                        {unreadCounts[user._id]}
                                    </span>
                                )}
                            </div>
                        )
                    ))}
                </div>
            </div>

            <div className='w-full h-[50%] overflow-auto flex flex-col gap-[10px] items-center mt-[20px] pb-4'>
                {sortedUsers?.map((user) => (
                    <div 
                        key={user._id}
                        className='w-[95%] flex items-center gap-[15px] shadow-gray-500 bg-white shadow-lg rounded-xl hover:bg-[#f0e6ff] cursor-pointer relative p-3'
                        onClick={() => handleUserSelect(user)}
                    >
                        <div className='relative'>
                            <div className='w-[50px] h-[50px] rounded-full overflow-hidden flex justify-center items-center'>
                                <img src={user.image || dp} alt="" className='h-full object-cover'/>
                            </div>
                            {onlineUsers?.includes(user._id) && (
                                <span className='w-[10px] h-[10px] rounded-full absolute bottom-0 right-0 bg-[#3aff20] border-2 border-white'></span>
                            )}
                        </div>
                        <div className='flex-1 min-w-0'>
                            <div className='flex justify-between items-center'>
                                <h1 className='text-gray-800 font-semibold text-[16px] truncate'>{user.name || user.userName}</h1>
                                {user.lastMessageTime && (
                                    <span className='text-gray-500 text-xs whitespace-nowrap'>
                                        {formatTime(user.lastMessageTime)}
                                    </span>
                                )}
                            </div>
                            {user.lastMessage && (
                                <p className='text-gray-600 text-sm truncate max-w-[180px]'>
                                    {user.lastMessage}
                                </p>
                            )}
                        </div>
                        {unreadCounts[user._id] > 0 && (
                            <span className='absolute right-3 bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs'>
                                {unreadCounts[user._id]}
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SideBar