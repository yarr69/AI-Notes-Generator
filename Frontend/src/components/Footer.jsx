import React from 'react'
import { motion } from "motion/react"
import logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import { serverUrl } from '../App'
import { setUserData } from '../redux/userSlice'
function Footer() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleSignOut = async () => {
        try {
            await axios.get(serverUrl + "/api/auth/logout", { withCredentials: true })
            dispatch(setUserData(null))
            navigate("/auth")


        } catch (error) {
            console.log(error)
        }
    }
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='z-10 mx-4 mb-4 mt-12 rounded-2xl border border-slate-700/40 bg-[#172033] px-6 py-8 shadow-[0_18px_50px_rgba(23,32,51,0.16)] sm:mx-6 sm:mt-16 sm:px-8'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-8 items-start'>
                <motion.div
                    whileHover={{ rotateX: 6, rotateY: -6 }}
                    className="flex flex-col gap-4 transform-gpu"
                    style={{ transformStyle: "preserve-3d" }}>
                    <div className="flex items-center gap-3 cursor-pointer"
                        style={{ transform: "translateZ(20px)" }}>
                        <img src={logo} alt="logo" className='h-9 w-9 object-contain' />
                        <span className="
                text-lg font-semibold
                bg-gradient-to-br from-white via-gray-300 to-white
                bg-clip-text text-transparent
              "
                            style={{ textShadow: "0 6px 18px rgba(0,0,0,0.4)" }}>
                            परीKSHA <span className="text-teal-300">AI</span>
                        </span>

                    </div>
                    <p className="text-sm text-gray-300 max-w-sm">परीKSHA AI helps students generate exam-focused notes,
                        revision material, diagrams, and printable PDFs using AI.</p>

                </motion.div>

                <div className='text-center'>
                    <h1 className='mb-4 text-sm font-semibold text-white'>Quick Links</h1>
                    <ul className='space-y-2 text-sm'>
                        <li onClick={() => navigate("/notes")} className='cursor-pointer text-gray-300 transition-colors hover:text-teal-200'>
                            Notes
                        </li>
                        <li onClick={() => navigate("/history")} className='cursor-pointer text-gray-300 transition-colors hover:text-teal-200'>History</li>
                        <li onClick={() => navigate("/pricing")} className='cursor-pointer text-gray-300 transition-colors hover:text-teal-200'>Add Credits</li>
                    </ul>
                </div>
                <div className='text-center'>
                    <h1 className='mb-4 text-sm font-semibold text-white'>Support & Account</h1>
                    <ul className='space-y-2 text-sm'>
                        <li onClick={handleSignOut} className='cursor-pointer text-red-300 transition-colors hover:text-red-200'>Sign out</li>
                        <li className='text-gray-300'>support@parikshaai.com</li>
                    </ul>
                </div>

            </div>
            <div className="my-6 h-px bg-white/10" />
            <p className='text-center text-xs text-gray-400'>
                © {new Date().getFullYear()} परीKSHA AI. All rights reserved.
            </p>



        </motion.div>
    )
}

export default Footer