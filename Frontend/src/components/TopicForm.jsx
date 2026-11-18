import React, { useEffect, useState } from 'react'
import { motion } from "motion/react"
import { generateNotes } from '../services/api';
import { useDispatch } from 'react-redux';
import { updateCredits } from '../redux/userSlice';
function TopicForm({ setResult, setLoading, loading, setError }) {
    const [topic, setTopic] = useState("");
    const [classLevel, setClassLevel] = useState("");
    const [examType, setExamType] = useState("");
    const [revisionMode, setRevisionMode] = useState(false);
    const [includeDiagram, setIncludeDiagram] = useState(false);
    const [includeChart, setIncludeChart] = useState(false);
    const [progress, setProgress] = useState(0);
    const [progressText, setProgressText] = useState("");
    const dispatch = useDispatch()

    const handleSubmit = async () => {
        if (!topic.trim()) {
            setError("Please enter the topic")
            return;
        }
        setError("")
        setLoading(true)
        setResult(null)
        try {

            const result = await generateNotes({
                topic,
                classLevel,
                examType,
                revisionMode,
                includeDiagram,
                includeChart
            })
            setResult(result.data)
            setLoading(false)
            setClassLevel("")
            setTopic("")
            setExamType("")
            setIncludeChart(false)
            setRevisionMode(false)
            setIncludeDiagram(false)

            if (typeof result.creditsLeft === "number") {
                dispatch(updateCredits(result.creditsLeft));

            }


        } catch (error) {
            console.log(error)
            setError("Failed to fetch notes from server");
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!loading) {
            setProgress(0);
            setProgressText("")
            return;
        }
        let value = 0;

        const interval = setInterval(() => {
            value += Math.random() * 8

            if (value >= 95) {
                value = 95;
                setProgressText("Almost done…");
                clearInterval(interval);
            } else if (value > 70) {
                setProgressText("Finalizing notes…");
            } else if (value > 40) {
                setProgressText("Processing content…");
            } else {
                setProgressText("Generating notes…");
            }

            setProgress(Math.floor(value))

        }, 700)

        return () => clearInterval(interval);


    }, [loading])





    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-5 rounded-2xl border border-slate-700/70 bg-[#111c30] p-5 text-slate-100 shadow-[0_16px_40px_rgba(0,0,0,0.22)] sm:p-7">

            <div className="grid gap-4 md:grid-cols-3">
            <input type="text" className='w-full rounded-xl border border-slate-700 bg-[#0b1120] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-teal-400 focus:bg-[#0d1627] focus:outline-none focus:ring-4 focus:ring-teal-400/10' placeholder='Enter topic (e.g. Web Development)'
                onChange={(e) => setTopic(e.target.value)}
                value={topic}
            />
            <input type="text" className='w-full rounded-xl border border-slate-700 bg-[#0b1120] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-teal-400 focus:bg-[#0d1627] focus:outline-none focus:ring-4 focus:ring-teal-400/10'
                placeholder='Class / Level (e.g. Class 10)'
                onChange={(e) => setClassLevel(e.target.value)}
                value={classLevel}
            />
            <input type="text" className='w-full rounded-xl border border-slate-700 bg-[#0b1120] px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-teal-400 focus:bg-[#0d1627] focus:outline-none focus:ring-4 focus:ring-teal-400/10'
                placeholder='Exam Type (e.g. CBSE, JEE, NEET)'
                onChange={(e) => setExamType(e.target.value)}
                value={examType}
            />
            </div>

            <div className='flex flex-col gap-4 rounded-xl border border-slate-800 bg-[#0b1120]/70 px-4 py-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-7 sm:gap-y-3'>
                <Toggle label="Exam Revision Mode" checked={revisionMode} onChange={() => setRevisionMode(!revisionMode)} />
                <Toggle
                    label="Include Diagram"
                    checked={includeDiagram}
                    onChange={() => setIncludeDiagram(!includeDiagram)}
                />
                <Toggle
                    label="Include Charts"
                    checked={includeChart}
                    onChange={() => setIncludeChart(!includeChart)}
                />
            </div>

            <motion.button
                onClick={handleSubmit}
                whileHover={!loading ? { scale: 1.02 } : {}}
                whileTap={!loading ? { scale: 0.95 } : {}}
                disabled={loading}
                className={`
    w-full mt-4
    py-3 rounded-xl
    font-semibold
    flex items-center justify-center gap-3
    transition
    ${loading
                        ? "cursor-not-allowed bg-slate-800 text-slate-500"
                        : "bg-teal-500 text-slate-950 shadow-md shadow-teal-950/30 hover:bg-teal-400"
                    }
  `}>
                {loading ? "Generating Notes..." : "Generate Notes"}

            </motion.button>


            {loading &&
                <div className='mt-4 space-y-2'>

                    <div className='w-full h-2 overflow-hidden rounded-full bg-slate-800'>
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "easeOut", duration: 0.6 }}
                            className='h-full bg-gradient-to-r from-teal-500 to-emerald-400'>

                        </motion.div>

                    </div>

                    <div className='flex justify-between text-xs text-slate-300'>
                        <span>{progressText}</span>
                        <span>{progress}%</span>
                    </div>
                    <p className='text-xs text-slate-400 text-center'>
                        This may take up to 2–5 minutes. Please don’t close or refresh the page.
                    </p>


                </div>}





        </motion.div>
    )
}


function Toggle({ label, checked, onChange }) {
    return (
        <div className='flex items-center gap-4 cursor-pointer select-none' onClick={onChange}>
            <motion.div
                animate={{
                    backgroundColor: checked
                        ? "rgba(13,148,136,0.25)"
                        : "rgba(148,163,184,0.2)"
                }}
                transition={{ duration: 0.25 }}
                className='relative w-12 h-6 rounded-full
          border border-slate-700'

            >
                <motion.div
                    layout
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className=' absolute top-0.5
            h-5 w-5 rounded-full
            bg-slate-200
            shadow-[0_2px_6px_rgba(0,0,0,0.35)]'
                    style={{
                        left: checked ? "1.6rem" : "0.25rem",
                    }}

                >


                </motion.div>
            </motion.div>

            <span className={`text-sm transition-colors ${checked ? "text-teal-300" : "text-slate-300"
                }`}>{label}</span>

        </div>
    )
}




export default TopicForm