import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import MermaidSetup from './MermaidSetup';
import RechartSetUp from './RechartSetUp';
import { downloadPdf } from '../services/api';
const markDownComponent = {
    h1: ({ children }) => (
        <h1 className="mt-7 mb-4 border-b border-slate-700 pb-2 text-2xl font-bold text-white">
            {children}
        </h1>
    ),
    h2: ({ children }) => (
        <h2 className="mt-6 mb-3 text-xl font-semibold text-teal-300">
            {children}
        </h2>
    ),
    h3: ({ children }) => (
        <h3 className="mt-5 mb-2 text-lg font-semibold text-slate-100">
            {children}
        </h3>
    ),
    p: ({ children }) => (
        <p className="mb-3 leading-7 text-slate-300">
            {children}
        </p>
    ),
    ul: ({ children }) => (
        <ul className="ml-6 list-disc space-y-2 text-slate-300">
            {children}
        </ul>
    ),
    li: ({ children }) => (
        <li className="marker:text-teal-600">{children}</li>
    ),
}
function FinalResult({ result }) {
    const [quickRevision, setQuickRevision] = useState(false);
    if (
        !result ||
        !result.subTopics ||
        !result.questions ||
        !result.questions.short ||
        !result.questions.long ||
        !result.revisionPoints
    ) {
        return null;
    }

    return (
        <div className='space-y-9 bg-transparent py-2 sm:p-3'>

            <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>

                <h2 className='text-2xl font-bold tracking-tight text-white sm:text-3xl'>
                    📘 Generated Notes
                </h2>

                <div className='flex gap-3'>
                    <button onClick={() => setQuickRevision(!quickRevision)} className={`
              rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors
              ${quickRevision
                            ? "bg-teal-600 text-white"
                            : "bg-teal-950/60 text-teal-200 hover:bg-teal-900/70"}
            `}>  {quickRevision ? "Exit Revision Mode" : "Quick Revision (5 min)"}</button>
                    <button onClick={() => downloadPdf(result)}
                        className='rounded-xl bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-slate-600'>
                        ⬇️ Download PDF
                    </button>
                </div>
            </div>


            {!quickRevision && <section>

                <SectionHeader icon="⭐" title="Sub Topics" color="indigo" />
                {
                    Object.entries(result.subTopics).map(([star, topics]) => (
                        <div key={star} className='mb-3
              '>

                            <p className='mb-1 font-medium text-indigo-300'>
                                {star} Priority
                            </p>
                            <ul className='ml-6 list-disc text-slate-300'>
                                {topics.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                        </div>
                    ))
                }
            </section>}


            {!quickRevision && <section>
                <SectionHeader icon="📝" title="Detailed Notes" color="purple" />
                <div className='rounded-xl border border-slate-700 bg-[#0b1120]/70 p-5 sm:p-6'>
                    <ReactMarkdown components={markDownComponent}>
                        {result.notes}

                    </ReactMarkdown>
                </div>
            </section>}


            {quickRevision &&
                <section className='rounded-xl border border-teal-700/40 bg-gradient-to-r from-teal-950/70 to-[#111c30] p-6'>
                    <h3 className='mb-3 text-lg font-bold text-teal-200'>
                        ⚡ Exam Quick Revision Points
                    </h3>
                    <ul className='ml-6 list-disc space-y-1 text-slate-200'>
                        {result.revisionPoints.map((p, i) => (
                            <li key={i}>{p}</li>
                        ))}
                    </ul>
                </section>}


            {result.diagram?.data && <section>
                <SectionHeader icon="📊" title="Diagram" color="cyan" />

                <MermaidSetup diagram={result.diagram?.data} />
                <p className="mt-3 text-xs italic text-slate-400">
                    ℹ️ If you need this diagram for future reference or revision,
                    you can save it by taking a screenshot.
                </p>

            </section>}


            {result.charts?.length > 0 &&
                <section>
                    <SectionHeader icon="📈" title="Visual Charts" color="indigo" />
                    <RechartSetUp charts={result.charts} />
                    <p className="mt-3 text-xs italic text-slate-400">
                        ℹ️ If you need this Chart for future reference or revision,
                        you can save it by taking a screenshot.
                    </p>

                </section>}

            {result.charts && result.charts.length === 0 && (
                <p className="text-sm italic text-slate-400">
                    📉 Charts are not relevant for this topic.
                </p>
            )}


            <section>
                <SectionHeader icon="❓" title="Important Questions" color="rose" />

                <p className='font-medium'>Short Questions:</p>
                <ul className='ml-6 list-disc text-slate-300'>
                    {result.questions.short.map((q, i) => (
                        <li key={i}>{q}</li>
                    ))}
                </ul>


                <p className='font-medium mt-4'>Long Questions:</p>
                <ul className='ml-6 list-disc text-slate-300'>
                    {result.questions.long.map((q, i) => (
                        <li key={i}>{q}</li>
                    ))}
                </ul>
                <p className='font-medium mt-4'>Diagram Question:</p>
                <ul className='ml-6 list-disc text-slate-300'>
                    <li>{result.questions.diagram}</li>
                </ul>

            </section>

        </div>
    )
}


function SectionHeader({ icon, title, color }) {
    const colors = {
        indigo: "from-indigo-950/70 to-indigo-900/30 text-indigo-200",
        purple: "from-purple-950/70 to-purple-900/30 text-purple-200",
        blue: "from-blue-950/70 to-blue-900/30 text-blue-200",
        green: "from-green-950/70 to-green-900/30 text-green-200",
        cyan: "from-cyan-950/70 to-cyan-900/30 text-cyan-200",
        rose: "from-rose-950/70 to-rose-900/30 text-rose-200",
    };
    return (
        <div className={`
        mb-4 px-4 py-2 rounded-lg
        bg-gradient-to-r ${colors[color]}
        font-semibold flex items-center gap-2
      `}>
            <span>{icon}</span>
            <span>{title}</span>
        </div>

    )
}

export default FinalResult