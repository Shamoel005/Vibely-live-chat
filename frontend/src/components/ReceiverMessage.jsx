// import React, { useEffect, useRef } from 'react'
// import dp from "../assets/dp.webp"
// import { useSelector } from 'react-redux'
// function ReceiverMessage({image,message}) {
//   let scroll=useRef()
//   let {selectedUser}=useSelector(state=>state.user)
//   useEffect(()=>{
//     scroll?.current.scrollIntoView({behavior:"smooth"})
//   },[message,image])
  
//   const handleImageScroll=()=>{
//     scroll?.current.scrollIntoView({behavior:"smooth"})
//   }
//   return (
//     <div className='flex items-start gap-[10px]' >
//            <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg ' >
//          <img src={selectedUser.image || dp} alt="" className='h-[100%]'/>
//          </div>
//           <div ref={scroll} className='w-fit max-w-[500px] px-[20px] py-[10px]  bg-[#663399] text-white text-[19px] rounded-tl-none rounded-2xl relative left-0  shadow-gray-400 shadow-lg gap-[10px] flex flex-col'>
//         {image &&  <img src={image} alt="" className='w-[150px] rounded-lg' onLoad={handleImageScroll}/>}
//        {message && <span >{message}</span>}
//        </div>
     
//         </div>
//   )
// }

// export default ReceiverMessage


import React, { useEffect, useRef, useState } from 'react'
import dp from "../assets/dp.webp"
import { useSelector } from 'react-redux'
import { RiDeleteBin6Line } from "react-icons/ri";
import axios from 'axios';
import { serverUrl } from '../main';

function ReceiverMessage({ image, message, messageId, onDelete }) {
  let scroll = useRef()
  let { selectedUser } = useSelector(state => state.user)
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    scroll?.current.scrollIntoView({ behavior: "smooth" })
  }, [message, image])

  const handleImageScroll = () => {
    scroll?.current.scrollIntoView({ behavior: "smooth" })
  }

  const handleDelete = async () => {
    try {
      await axios.delete(`$${serverUrl}/api/message/delete/${messageId}`, { 
        withCredentials: true 
      });
      if (onDelete) {
        onDelete(messageId);
      }
    } catch (error) {
      console.log("Error deleting message:", error);
    }
  }

  return (
    <div 
      className='flex items-start gap-[10px]'
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className='w-[40px] h-[40px] rounded-full overflow-hidden flex justify-center items-center bg-white cursor-pointer shadow-gray-500 shadow-lg'>
        <img src={selectedUser.image || dp} alt="" className='h-[100%]' />
      </div>
      <div ref={scroll} className='w-fit max-w-[500px] px-[20px] py-[10px] bg-[#663399] text-white text-[19px] rounded-tl-none rounded-2xl relative left-0 shadow-gray-400 shadow-lg gap-[10px] flex flex-col group'>
        {image && <img src={image} alt="" className='w-[150px] rounded-lg' onLoad={handleImageScroll} />}
        {message && <span>{message}</span>}
        
        {showDelete && (
          <div 
            className='absolute -right-8 top-1/2 transform -translate-y-1/2 bg-red-500 p-1 rounded-full cursor-pointer hover:bg-red-600'
            onClick={handleDelete}
          >
            <RiDeleteBin6Line className='w-4 h-4 text-white' />
          </div>
        )}
      </div>
    </div>
  )
}

export default ReceiverMessage