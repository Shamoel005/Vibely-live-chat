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
        <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center p-4'>
            <div className='w-full max-w-[500px] bg-white rounded-lg shadow-gray-400 shadow-lg overflow-hidden'>
                {/* Header - Keeping your original design */}
                <div className='w-full h-[200px] bg-[#663399] rounded-b-[30%] shadow-gray-400 shadow-lg flex items-center justify-center'>
                    <h1 className='text-black font-bold text-[30px]'>Login to <span className='text-white'>Vibely</span></h1>
                </div>

                {/* Form */}
                <form className='w-full flex flex-col gap-[25px] items-center p-8' onSubmit={handleLogin}>
                    
                    {/* Email Input */}
                    <div className='w-[90%] space-y-2'>
                        <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                            <FaEnvelope className='text-[#663399]' />
                            Email Address
                        </label>
                        <div className='relative'>
                            <input 
                                type="email" 
                                placeholder='Enter your email'
                                className='w-full h-[50px] outline-none border-2 border-[#663399] px-4 pl-11 bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[17px] transition-all duration-200 focus:shadow-purple-200'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                disabled={loading}
                            />
                            <FaEnvelope className='absolute left-4 top-1/2 transform -translate-y-1/2 text-[#663399]' />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className='w-[90%] space-y-2'>
                        <label className='text-sm font-medium text-gray-700 flex items-center gap-2'>
                            <FaLock className='text-[#663399]' />
                            Password
                        </label>
                        <div className='relative'>
                            <input 
                                type={show ? "text" : "password"} 
                                placeholder='Enter your password'
                                className='w-full h-[50px] outline-none border-2 border-[#663399] px-4 pl-11 pr-12 bg-white rounded-lg shadow-gray-200 shadow-lg text-gray-700 text-[17px] transition-all duration-200 focus:shadow-purple-200'
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                disabled={loading}
                            />
                            <FaLock className='absolute left-4 top-1/2 transform -translate-y-1/2 text-[#663399]' />
                            <button 
                                type="button"
                                className='absolute right-4 top-1/2 transform -translate-y-1/2 text-[#663399] hover:text-purple-800 transition-colors duration-200'
                                onClick={() => setShow(prev => !prev)}
                                disabled={loading}
                            >
                                {show ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    {/* Error Message */}
                    {err && (
                        <div className='w-[90%] bg-red-50 border border-red-200 rounded-lg p-3'>
                            <p className='text-red-600 text-sm flex items-center gap-2'>
                                <span className='w-2 h-2 bg-red-500 rounded-full'></span>
                                {err}
                            </p>
                        </div>
                    )}

                    {/* Login Button */}
                    <button 
                        className='px-6 py-3 bg-[#663399] rounded-2xl shadow-gray-400 shadow-lg text-[18px] w-[200px] font-semibold text-white hover:shadow-inner transform hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2'
                        disabled={loading}
                        type="submit"
                    >
                        {loading ? (
                            <>
                                <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                                Signing In...
                            </>
                        ) : (
                            <>
                                <FaSignInAlt />
                                Login
                            </>
                        )}
                    </button>

                    {/* Sign Up Link */}
                    <p className='text-gray-600 cursor-pointer mt-2'>
                        Want to create a new account?{' '}
                        <span 
                            className='text-[#663399] font-bold hover:text-purple-800 transition-colors duration-200 flex items-center gap-1 justify-center'
                            onClick={() => !loading && navigate("/signup")}
                        >
                            <FaUserPlus />
                            Sign Up
                        </span>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
