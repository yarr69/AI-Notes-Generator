import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from "motion/react"
import axios from 'axios';
import { serverUrl } from '../App';
function Pricing() {
  const navigate = useNavigate()
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [paying, setPaying] = useState(false);
  const [payingAmount, setPayingAmount] = useState(null);

  const handlePaying = async (amount) => {
    try {
      setPayingAmount(amount)
      setPaying(true)
      const result = await axios.post(serverUrl + "/api/credit/order", { amount }, { withCredentials: true })

      if (result.data.url) {
        window.location.href = result.data.url
      }

      setPaying(false)



    } catch (error) {
      setPaying(false)
      console.log(error)
    }
  }
  return (
    <div className='relative min-h-screen bg-[#0b1120] px-4 py-8 sm:px-6 sm:py-10'>

      <button onClick={() => navigate("/")} className='mx-auto mb-8 flex max-w-5xl items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-teal-300'>
        ⬅️ Back
      </button>

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10">
        <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-teal-300">Flexible study plans</p>
        <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Buy Credits</h1>
        <p className="mt-3 text-slate-400">
          Choose a plan that fits your study needs
        </p>

      </motion.div>

      <div className='mx-auto grid max-w-5xl grid-cols-1 items-stretch gap-5 md:grid-cols-3'>

        <PricingCard
          title="Starter"
          price="₹100"
          amount={100}
          credits="50 Credits"
          description="Perfect for quick revisions"
          features={[
            "Generate AI notes",
            "Exam-focused answers",
            "Diagram & charts support",
            "Fast generation"
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />


        <PricingCard
          popular
          title="Popular"
          price="₹200"
          amount={200}
          credits="120 Credits"
          description="Best value for students"
          features={[
            "All Starter features",
            "More credits per ₹",
            "Revision mode access",
            "Priority AI response"
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

        <PricingCard
          title="Pro Learner"
          price="₹500"
          amount={500}
          credits="300 Credits"
          description="For serious exam preparation"
          features={[
            "Maximum credit value",
            "Unlimited revisions",
            "Charts & diagrams",
            "Ideal for full syllabus"
          ]}
          selectedPrice={selectedPrice}
          setSelectedPrice={setSelectedPrice}
          onBuy={handlePaying}
          paying={paying}
          payingAmount={payingAmount}
        />

      </div>


    </div>
  )
}


function PricingCard({
  title,
  price,
  amount,
  credits,
  description,
  features,
  popular,
  selectedPrice,
  setSelectedPrice,
  onBuy,
  paying,
  payingAmount
}) {

  const isSelected = selectedPrice === amount;
  const isPayingThisCard = paying && payingAmount === amount;
  return (

    <motion.div
      onClick={() => setSelectedPrice(amount)}
      whileHover={{ y: -5 }}
      className={`
        relative cursor-pointer rounded-2xl border bg-[#111c30] p-6 shadow-[0_12px_32px_rgba(0,0,0,0.2)] transition-all
        ${isSelected
          ? "border-teal-500 ring-4 ring-teal-500/10"
          : popular
            ? "border-indigo-400/50"
            : "border-slate-700"}
      `}>
      {popular && !isSelected && <span className='absolute right-4 top-4 rounded-full border border-indigo-400/20 bg-indigo-950/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-indigo-200'>Popular</span>}

      {isSelected && <span className='absolute right-4 top-4 rounded-full border border-teal-400/20 bg-teal-950/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-teal-200'>
        Selected
      </span>}


      <h2 className='text-xl font-semibold text-slate-100'>{title}</h2>
      <p className='mt-1 text-sm text-slate-400'>{description}</p>

      <div className='mt-6 border-y border-slate-800 py-5'>
        <p className="text-4xl font-bold tracking-tight text-white">{price}</p>
        <p className="mt-1 text-sm font-medium text-teal-300">{credits}</p>
      </div>
      <button
        disabled={isPayingThisCard}

        onClick={(e) => {
          e.stopPropagation();
          onBuy(amount)
        }}
        className={`
          w-full mt-5 rounded-xl py-3 font-semibold transition-colors
          ${isPayingThisCard
            ? "cursor-not-allowed bg-slate-800 text-slate-500"
            : isSelected
              ? "bg-teal-500 text-slate-950 hover:bg-teal-400"
              : "bg-slate-700 text-white hover:bg-slate-600"}
        `}>
        {isPayingThisCard ? "Redirecting..." : "Buy Now"}
      </button>

      <ul className='mt-5 space-y-3 text-sm text-slate-300'>
        {features.map((f, i) => (
          <li key={i} className="flex gap-2.5">
            <span className="font-semibold text-teal-300">✓</span>
            {f}
          </li>
        ))}
      </ul>

    </motion.div>
  )
}

export default Pricing