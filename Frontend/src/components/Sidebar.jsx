import React from 'react'

function Sidebar({result}) {

    if(!result ||
    !result.subTopics ||
    !result.questions ||
    !result.questions.short ||
    !result.questions.long){
        return null;
    }
  return (
    <div className='space-y-6 rounded-2xl border border-slate-700/70 bg-[#111c30] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.2)]'>
        <div className='flex items-center gap-2'>

            <span className='text-xl'>📌</span>
            <h3 className='text-lg font-semibold text-slate-100'>
                Quick Exam View
            </h3>
        </div>

        <section>
            <p className='mb-3 text-sm font-semibold text-slate-200'>
                ⭐ Sub Topics (Priority Wise)
            </p>
            {
                Object.entries(result.subTopics).map(([star , topics])=>(
                    <div key={star} className='mb-3
              rounded-lg
              bg-[#0b1120]
              border border-slate-800
              p-3'>

                <p className='mb-1 text-sm font-semibold text-amber-700'>
                    {star} Priority
                </p>
                <ul className='ml-4 list-disc space-y-1 text-sm text-slate-300'>
                    {topics.map((t,i)=>(
                        <li key={i}>{t}</li>
                    ))}
                </ul>
              </div>
                ))
            }
        </section>

        <section className='rounded-lg
        bg-amber-950/25
        border border-amber-700/40
        p-3'>
            <p className='mb-1 text-sm font-semibold text-slate-200'>
                🔥 Exam Importance
            </p>
            <span className='text-sm font-bold text-amber-300'>
                {result.importance}
            </span>
       

     

            <p className='mt-2 mb-3 text-sm font-semibold text-slate-200'>
             ❓ Important Questions
            </p>

            <div className='mb-4
          rounded-lg
          bg-indigo-950/30
          border border-indigo-800/60
          p-3'>
            <p className='mb-2 text-sm font-medium text-indigo-300'>
                   Short Questions
                </p>
                <ul className='ml-4 list-disc space-y-1 text-sm text-slate-300'>
                    {result.questions.short.map((t,i)=>(
                        <li key={i}>{t}</li>
                    ))}
                </ul>


          </div>


          <div className='mb-4
          rounded-lg
          bg-purple-950/30
          border border-purple-800/60
          p-3'>
            <p className='mb-2 text-sm font-medium text-purple-300'>
                   Long Questions
                </p>
                <ul className='ml-4 list-disc space-y-1 text-sm text-slate-300'>
                    {result.questions.long.map((t,i)=>(
                        <li key={i}>{t}</li>
                    ))}
                </ul>


          </div>

          <div className='mb-4
          rounded-lg
          bg-blue-950/30
          border border-blue-800/60
          p-3'>
            <p className='mb-2 text-sm font-medium text-blue-300'>
                   Diagram Question
                </p>
                <ul className='ml-4 list-disc space-y-1 text-sm text-slate-300'>
                    <li>{result.questions.diagram}</li>
                    
                </ul>


          </div>
        </section>

    
      
    </div>
  )
}

export default Sidebar