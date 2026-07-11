import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { motion } from 'framer-motion'

const Hero = () => {
    const navigate=useNavigate()

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2, delayChildren: 0.3 }
      }
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
    };

  return (
    <div className='relative pt-32 pb-20 px-6 sm:px-20 xl:px-32 w-full min-h-screen flex flex-col lg:flex-row items-center justify-center overflow-hidden'>
        
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className='w-full lg:w-1/2 text-left z-10 flex flex-col gap-6 items-start mt-10 lg:mt-0'
        >
            <motion.div variants={itemVariants} className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium tracking-wide">
              The Next Generation of AI
            </motion.div>
            
            <motion.h1 variants={itemVariants} className='text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-bold leading-tight text-white'>
              Create amazing content <br/>with <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-[0_0_15px_rgba(102,252,241,0.5)]'>AI tools</span>
            </motion.h1>
            
             <motion.p variants={itemVariants} className='text-lg max-w-xl text-text-light/80 font-light leading-relaxed'>
              Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow effortlessly.
             </motion.p>

            <motion.div variants={itemVariants} className='flex flex-wrap justify-start gap-5 mt-4'>
                <motion.button 
                  whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(102,252,241,0.6)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={()=>navigate('/ai')} 
                  className='bg-primary text-black font-semibold px-8 py-3.5 rounded-xl transition cursor-pointer'
                >
                    Start creating now
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                  whileTap={{ scale: 0.95 }}
                  className='text-white px-8 py-3.5 rounded-xl border border-white/20 glass-panel transition cursor-pointer'
                >
                  Watch demo
                </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className='flex items-center gap-4 mt-8 text-sm text-text-light/70'>
                <div className="flex -space-x-3">
                  <img src={assets.profile_img_1} alt="user" className='w-10 h-10 rounded-full border-2 border-[#0b0c10]'/>
                  <div className='w-10 h-10 rounded-full border-2 border-[#0b0c10] bg-gray-700 flex justify-center items-center text-xs font-bold'>+9k</div>
                </div>
                Trusted by 10k+ creators worldwide
            </motion.div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
          className="w-full lg:w-1/2 flex justify-center lg:justify-end mt-16 lg:mt-0 z-10"
        >
          <motion.img 
            animate={{ 
              y: [0, -20, 0],
              rotate: [0, 2, 0, -2, 0]
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            src={assets.ai_hero_graphic} 
            alt="AI Concept" 
            className="w-full max-w-lg xl:max-w-xl rounded-2xl shadow-[0_0_50px_rgba(102,252,241,0.3)] border border-white/10"
          />
        </motion.div>
    </div>
  )
}

export default Hero