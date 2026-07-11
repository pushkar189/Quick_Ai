import React from 'react'
import {PricingTable} from '@clerk/clerk-react'
import { motion } from 'framer-motion'

const Plan = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8 }}
      className='max-w-2xl mx-auto z-20 my-30 relative'
    >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

        <div className='text-center relative z-10'>
            <h2 className='text-white text-[42px] font-bold tracking-tight'>Choose Your <span className='text-primary'>Plan</span></h2>
            <p className='text-text-light/80 max-w-lg mx-auto mt-4'>Start for free and scale up as you grow. Find the perfect plan for your content creation needs.</p>
        </div>

        <div className='mt-14 max-sm:mx-8 relative z-10 p-4 rounded-3xl glass-panel border border-white/10'>
            <PricingTable/>
        </div>
    </motion.div>
  )
}

export default Plan