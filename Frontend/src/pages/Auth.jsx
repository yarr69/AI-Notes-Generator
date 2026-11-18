import React from 'react'
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from "axios"
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';
function Auth() {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    
    try {
      const response = await signInWithPopup(auth,provider)
      const User = response.user
      const name = User.displayName
      const email = User.email
      const result = await axios.post(serverUrl + "/api/auth/google" , {name , email},{
        withCredentials:true
      })
      dispatch(setUserData(result.data))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='min-h-screen overflow-hidden bg-[#0b1120] px-6 text-slate-100 sm:px-8'>
        <motion.header 
        initial = {{opacity: 0 , y:-15}}
        animate = {{opacity:1 , y:0}}
        transition={{duration:1.5}}
       
        className="mx-auto mt-6 flex max-w-7xl items-center gap-4 rounded-2xl border border-slate-700/70 bg-[#111c30] px-6 py-5 shadow-[0_18px_50px_rgba(0,0,0,0.28)] sm:mt-8 sm:px-8 sm:py-6"
          >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl">✦</div>
            <div>
              <h1 className='text-xl font-bold tracking-tight text-white sm:text-2xl'>परीKSHA AI</h1>
              <p className='mt-1 text-sm text-slate-300'>AI-powered exam-oriented notes & revision</p>
            </div>

        </motion.header>

        <main className='mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 py-12 lg:grid-cols-2 lg:gap-16 lg:py-16'>
        
        {/* LEFT CONTENT */}
        <motion.div 
         initial = {{opacity: 0 , x:-60}}
        animate = {{opacity:1 , x:0}}
        transition={{duration:0.7}}
        >
            <h1 className='text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl'>
                Unlock smarter <br /> <span className="text-teal-600">AI notes</span>
              </h1>
              <motion.button
              onClick={handleGoogleAuth}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{scale:0.98}}
              transition={{ type: "spring", stiffness: 250, damping: 20 }}
               className='mt-8 inline-flex items-center gap-3 rounded-xl bg-purple-600 px-6 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-900/15 transition-colors hover:bg-teal-700 sm:text-lg'>
                <FcGoogle size={22}/>
                Continue with Google
              </motion.button>

              <p className='mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg'>
                You get <span className="font-semibold">50 FREE credits</span> to create
            exam notes, project notes, charts, graphs and
            download clean PDFs — instantly using AI.
              </p>
              <p className='mt-4 text-sm text-slate-400'>Start with 50 free credits · Upgrade anytime · Instant access</p>

        </motion.div>

        {/* RIGHT CONTENT */}
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-8'>
            <Feature icon="🎁" title="50 Free Credits" des="Start with 50 credits to generate notes without paying."/>
             <Feature icon="📘" title="Exam Notes" des="High-yield, revision-ready exam-oriented notes." />
          <Feature icon="📂" title="Project Notes" des="Well-structured documentation for assignments & projects." />
          <Feature icon="📊" title="Charts & Graphs" des="Auto-generated diagrams, charts and flow graphs." />
          <Feature icon="⬇️" title="Free PDF Download" des="Download clean, printable PDFs instantly." />

        </div>


        </main>
      
    </div>
  )
}
function Feature({icon , title , des}){
    return(
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
          className='rounded-2xl border border-slate-700/70 bg-[#111c30] p-5 shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-colors hover:border-slate-600 hover:bg-[#152239] sm:p-6'
        >
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-teal-400/15 bg-teal-400/10 text-2xl">{icon}</div>
          <h3 className="mb-2 text-base font-semibold text-slate-100">{title}</h3>
          <p className="text-sm leading-6 text-slate-400">{des}</p>
        </motion.div>
    )
}

export default Auth