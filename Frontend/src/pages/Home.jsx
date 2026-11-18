import React from 'react'
import Navbar from '../components/Navbar'
import { motion } from "motion/react"
import img from "../assets/img1.png"
import Footer from '../components/Footer'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen overflow-hidden bg-[#0b1120] text-slate-100'>
      <Navbar />
      <section className='relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 pb-16 pt-20 sm:px-8 lg:grid-cols-2 lg:gap-16 lg:pb-24 lg:pt-28'>
        <div>
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            whileHover={{ rotateX: 6, rotateY: -6 }}
              className="transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
              <motion.h1               className="max-w-2xl text-5xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl"
              whileHover={{ y: -4 }}
              style={{
                transform: "translateZ(40px)",
              }}
            >
                Create smarter <br /> <span className="text-teal-600">AI notes</span> in seconds
            </motion.h1>

            <motion.p whileHover={{ y: -2 }}
                className='mt-6 max-w-xl text-base leading-8 text-slate-300 sm:text-lg'
              style={{
                transform: "translateZ(40px)",
              }}
            >
              Generate exam-focused notes, project documentation,
                flow diagrams and revision-ready content with AI.
            </motion.p>
          </motion.div>

          <motion.button
              onClick={() => navigate("/notes")}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className='mt-9 inline-flex items-center gap-3 rounded-xl bg-teal-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-teal-900/15 transition-colors hover:bg-teal-700 sm:text-lg'>
              Create your first notes
              <span aria-hidden="true">→</span>
            </motion.button>
            <p className="mt-4 text-sm text-slate-400">Exam-ready notes, diagrams and PDFs in one place.</p>
        </div>

        <motion.div
            initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
            whileHover={{ y: -6 }}
            className="relative mx-auto w-full max-w-xl transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
            <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-teal-900/40 via-indigo-900/30 to-sky-900/40 blur-2xl" />
            <div className='relative overflow-hidden rounded-[2rem] border border-slate-700/70 bg-[#111c30] p-3 shadow-[0_30px_90px_rgba(0,0,0,0.4)]'>
              <img src={img} alt="AI-generated study notes preview" className="h-auto w-full rounded-[1.4rem] object-cover" />
            </div>
        </motion.div>
      </section>

      <section className='mx-auto grid max-w-7xl grid-cols-1 gap-5 px-6 pb-20 sm:px-8 md:grid-cols-2 lg:grid-cols-4'>
        <Feature icon="📘" title="Exam Notes" des="High-yield exam-oriented notes with revision points."/>
        <Feature icon="📂" title="Project Notes" des="Well-structured content for assignments and projects." />
        <Feature icon="📊" title="Diagrams" des="Auto-generated visual diagrams for clarity." />
        <Feature icon="⬇️" title="PDF Download" des="Download clean, printable PDFs instantly." />

      </section>
      <Footer/>

    </div>
  )
}

function Feature({icon , title , des}){
    return(
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ type: "spring", stiffness: 250, damping: 22 }}
          className='rounded-2xl border border-slate-700/70 bg-[#111c30] p-6 shadow-[0_12px_30px_rgba(0,0,0,0.18)] transition-all hover:border-slate-600 hover:bg-[#152239] hover:shadow-[0_20px_40px_rgba(0,0,0,0.28)]'
        >
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl border border-teal-400/15 bg-teal-400/10 text-2xl">{icon}</div>
          <h3 className="mb-2 text-lg font-semibold text-slate-100">{title}</h3>
          <p className="text-sm leading-6 text-slate-400">{des}</p>
        </motion.div>
    )
}

export default Home