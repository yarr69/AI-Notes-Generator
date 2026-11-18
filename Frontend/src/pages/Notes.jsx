import React, { useState } from 'react'
import { motion } from "motion/react"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TopicForm from '../components/TopicForm'
import Sidebar from '../components/Sidebar'
import FinalResult from '../components/FinalResult'
function Notes() {
  const navigate = useNavigate()
  const { userData } = useSelector((state) => state.user)
  const credits = userData.credits
  const [loading,setLoading]= useState(false)
  const [result , setResult] = useState(null)
  const [error,setError] = useState("")

  return (
    <div className='min-h-screen bg-[#0b1120] px-4 py-5 sm:px-6 sm:py-8'>
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}

        className="mx-auto mb-8 flex max-w-7xl flex-col items-start justify-between gap-4 rounded-2xl border border-slate-700/40 bg-[#172033] px-5 py-5 shadow-[0_18px_50px_rgba(23,32,51,0.16)] sm:px-7 md:flex-row md:items-center"
      >
        <div onClick={() => navigate("/")} className='cursor-pointer'>
          <h1 className='text-xl font-bold tracking-tight text-white sm:text-2xl'>परीKSHA AI</h1>
          <p className='mt-1 text-sm text-slate-300'>AI-powered exam-oriented notes & revision</p>
        </div>

        <div className='flex items-center gap-4 flex-wrap'>
          <button className='flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/15' onClick={() => navigate("/pricing")}>
            <span className='text-xl'>💠</span>
            <span>{credits}</span>
            <motion.span whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.97 }}
              className='ml-2 flex h-5 w-5 items-center justify-center
                        rounded-full bg-white text-xs font-bold text-slate-950'
            >
              ➕

            </motion.span>


          </button>
          <button onClick={()=>navigate("/history")} className='flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/15'>
        📚 Your Notes


          </button>
        </div>


      </motion.header>


      <main className="mx-auto max-w-7xl">
        <div className="mb-7 max-w-2xl">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-300">Your study workspace</p>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">What are you learning today?</h2>
          <p className="mt-3 leading-7 text-slate-400">Tell us a topic and we’ll turn it into structured, exam-ready notes.</p>
        </div>
        <motion.div className="mb-10">
          <TopicForm loading={loading} setResult={setResult} setLoading={setLoading} setError={setError}/>
        </motion.div>


      {loading && (
          <motion.div
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ repeat: Infinity, duration: 1.2 }}
            className="mb-6 text-center font-medium text-teal-300"
          >
            Generating exam-focused notes…
          </motion.div>
        )}

        {error && (
          <div className="mb-6 rounded-xl border border-red-400/25 bg-red-950/40 px-4 py-3 text-center font-medium text-red-300">
            {error}
          </div>
        )}

    {!result && <motion.div
            className="
              min-h-64
              rounded-2xl
              flex flex-col items-center justify-center
              border border-dashed border-slate-700
              bg-[#111c30]/70
              text-slate-400
              shadow-[inset_0_2px_8px_rgba(0,0,0,0.18)]
            ">
               <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-400/15 bg-teal-400/10 text-3xl">📘</span>
            <p className="text-sm font-medium">
              Generated notes will appear here
            </p>

     </motion.div>}


    {result && <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
     className='flex flex-col
      lg:grid lg:grid-cols-4
      gap-6'>

        <div className='lg:col-span-1'>
          <Sidebar result={result}/>


        </div>

        <div className='lg:col-span-3 rounded-2xl border border-slate-700/70 bg-[#111c30] p-4 shadow-[0_12px_36px_rgba(0,0,0,0.2)] sm:p-6'>
          <FinalResult result={result}/>

        </div>


    </motion.div>
}
      </main>
    </div>
  )
}

export default Notes