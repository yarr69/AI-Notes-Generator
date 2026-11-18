import React, { useEffect } from 'react'
import { motion } from "motion/react"
import { FiCheckCircle } from "react-icons/fi";
import { getCurrentUser } from '../services/api';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
function PaymentSuccess() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    useEffect(() => {

        getCurrentUser(dispatch)

        const t = setTimeout(() => {

            navigate("/")


        }, 5000);

        return () => clearTimeout(t)

    }, [])
    return (
        <div className='flex min-h-screen items-center justify-center bg-[#0b1120] p-5'>
            <div className="flex w-full max-w-lg flex-col items-center gap-4 rounded-3xl border border-slate-700/70 bg-[#111c30] px-7 py-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] sm:px-12">
            <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 360 }}
                transition={{
                    duration: 0.8,
                    ease: "easeOut"
                }}
                className="text-6xl text-teal-600">
                <FiCheckCircle />

            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-bold tracking-tight text-white">
                Payment Successful! Credits Added

            </motion.h1>

            <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-sm text-slate-400">

                Redirecting to home...

            </motion.p>

            </div>
        </div>
    )
}

export default PaymentSuccess