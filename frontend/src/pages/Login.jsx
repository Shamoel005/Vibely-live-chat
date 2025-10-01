// import axios from 'axios'
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { serverUrl } from '../main'
// import { useDispatch, useSelector } from 'react-redux'
// import { setSelectedUser, setUserData } from '../redux/userSlice'

// function Login() {
//     let navigate=useNavigate()
//     let [show,setShow]=useState(false)
//     let [email,setEmail]=useState("")
//     let [password,setPassword]=useState("")
//     let [loading,setLoading]=useState(false)
//     let [err,setErr]=useState("")
//     let dispatch=useDispatch()
    
//         const handleLogin=async (e)=>{
//             e.preventDefault()
//             if (!email || !password) {
//                 alert("Please fill in both email and password.");
//                 return;
//             }        
//             setLoading(true)
//             try {
//                 let result =await axios.post(`${serverUrl}/api/auth/login`,{
//     email,password
//                 },{withCredentials:true})
//                dispatch(setUserData(result.data))
//                dispatch(setSelectedUser(null))
//                navigate("/")
//                 setEmail("")
//                 setPassword("")
//                 setLoading(false)
//                 setErr("")
//             } catch (error) {
//                 console.log(error)
//                 setLoading(false)
//                 setErr(error.response?.data?.message || "Something went wrong!");
//             }
//         }
    
//   return (
//     <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
//      <div className='w-full max-w-[500px] h-[600px] bg-white rounded-lg shadow-gray-400 shadow-lg flex flex-col gap-[30px]'>
//         <div className='w-full h-[200px] bg-[#663399] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
//            <h1 className='text-[black] font-bold text-[30px]'>Login to <span  className='text-white'>Vibely</span></h1>
//         </div>
//         <form className='w-full flex flex-col gap-[20px] items-center' onSubmit={handleLogin}>
//         <input type="email" placeholder='email' className='w-[90%] h-[50px] outline-none border-2 border-[#663399] px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[19px]' onChange={(e)=>setEmail(e.target.value)} value={email}/>
//         <div className='w-[90%] h-[50px] border-2 border-[#663399] overflow-hidden rounded-lg shadow-gray-200 shadow-lg relative'>
//         <input type={`${show?"text":"password"}`} placeholder='password' className='w-full h-full outline-none  px-[20px] py-[10px] bg-[white]  text-gray-700 text-[19px]' onChange={(e)=>setPassword(e.target.value)} value={password}/>
//         <span className='absolute top-[10px] right-[20px] text-[19px] text-[#663399] font-semibold cursor-pointer' onClick={()=>setShow(prev=>!prev)}>{`${show?"hidden":"show"}`}</span>
//         </div>
// {err && <p className='text-red-500'>{"*" + err}</p>}
//         <button className='px-[20px] py-[10px] bg-[#663399] rounded-2xl shadow-gray-400 shadow-lg text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner' disabled={loading}>{loading?"Loading...":"Login"}</button>
//         <p className='cursor-pointer' onClick={()=>navigate("/signup")}>Want to create a new account ? <span className='text-[#663399] text-[bold]' >sign up</span></p>
//      </form>
//      </div>
     
//     </div>
//   )
// }

// export default Login


import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedUser, setUserData } from '../redux/userSlice'
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaSignInAlt, FaUserPlus } from 'react-icons/fa'

function Login() {
    let navigate = useNavigate()
    let [show, setShow] = useState(false)
    let [email, setEmail] = useState("")
    let [password, setPassword] = useState("")
    let [loading, setLoading] = useState(false)
    let [err, setErr] = useState("")
    let dispatch = useDispatch()
    
    const handleLogin = async (e) => {
        e.preventDefault()
        if (!email || !password) {
            setErr("Please fill in both email and password.")
            return
        }        
        setLoading(true)
        setErr("")
        try {
            let result = await axios.post(`${serverUrl}/api/auth/login`, {
                email, password
            }, { withCredentials: true })
            dispatch(setUserData(result.data))
            dispatch(setSelectedUser(null))
            navigate("/")
            setEmail("")
            setPassword("")
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
            setErr(error.response?.data?.message || "Something went wrong! Please try again.")
        }
    }

    return (
        <div className='min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex items-center justify-center p-4'>
            <div className='w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 hover:shadow-3xl'>
                {/* Header */}
                <div className='bg-gradient-to-r from-purple-600 to-indigo-600 py-12 px-6 text-center'>
                    <div className='w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm'>
                        <FaLock className='text-white text-2xl' />
                    </div>
                    <h1 className='text-3xl font-bold text-white mb-2'>Welcome Back</h1>
                    <p className='text-purple-100'>Sign in to your Vibely account</p>
                </div>

                {/* Form */}
                <form className='p-8 space-y-6' onSubmit={handleLogin}>
                    {/* Email Input */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                            <FaEnvelope className='text-purple-600' />
                            Email Address
                        </label>
                        <div className='relative'>
                            <input 
                                type="email" 
                                placeholder='Enter your email'
                                className='w-full h-12 px-4 pl-11 pr-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white text-gray-700 placeholder-gray-400'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                disabled={loading}
                            />
                            <FaEnvelope className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className='space-y-2'>
                        <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                            <FaLock className='text-purple-600' />
                            Password
                        </label>
                        <div className='relative'>
                            <input 
                                type={show ? "text" : "password"} 
                                placeholder='Enter your password'
                                className='w-full h-12 px-4 pl-11 pr-12 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200 bg-white text-gray-700 placeholder-gray-400'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                disabled={loading}
                            />
                            <FaLock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400' />
                            <button 
                                type="button"
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-600 transition-colors duration-200'
                                onClick={() => setShow(prev => !prev)}
                                disabled={loading}
                            >
                                {show ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {err && (
                        <div className='bg-red-50 border border-red-200 rounded-lg p-3'>
                            <p className='text-red-600 text-sm flex items-center gap-2'>
                                <span className='w-2 h-2 bg-red-500 rounded-full'></span>
                                {err}
                            </p>
                        </div>
                    )}

                    {/* Login Button */}
                    <button 
                        type="submit"
                        className='w-full h-12 bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none'
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                Signing In...
                            </>
                        ) : (
                            <>
                                <FaSignInAlt />
                                Sign In
                            </>
                        )}
                    </button>

                    {/* Sign Up Link */}
                    <div className='text-center pt-4 border-t border-gray-200'>
                        <p className='text-gray-600'>
                            Don't have an account?{' '}
                            <button 
                                type="button"
                                onClick={() => navigate("/signup")}
                                className='text-purple-600 font-semibold hover:text-purple-700 transition-colors duration-200 flex items-center justify-center gap-2 mx-auto'
                                disabled={loading}
                            >
                                <FaUserPlus />
                                Sign Up
                            </button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
