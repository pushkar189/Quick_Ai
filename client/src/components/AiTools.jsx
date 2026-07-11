import React from 'react'
import { AiToolsData , assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion'

const AiTools = () => {
    const navigate=useNavigate();
    const {user} =useUser()

    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15 }
      }
    };

    const cardVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    };

  return (
    <div className='px-4 sm:px-20 xl:px-32 my-24 relative'>
        <div className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[60%] h-[60%] rounded-full bg-secondary/10 blur-[150px] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className='text-center relative z-10'
        >
            <h2 className='text-white text-[42px] font-bold tracking-tight'>Powerful <span className='text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary'>AI Tools</span></h2>
            <p className='text-text-light max-w-lg mx-auto mt-4 font-light text-lg'>Everything you need to create, enhance, and optimize your content with cutting-edge AI technology.</p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className='flex flex-wrap mt-16 justify-center gap-6 relative z-10'
        >
            {AiToolsData.map((tool , index) => (
                <motion.div 
                  variants={cardVariants}
                  whileHover={{ y: -10, scale: 1.02 }}
                  key={index} 
                  className='p-8 w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] rounded-2xl glass-panel group transition-all duration-300 cursor-pointer border border-white/10 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(102,252,241,0.2)]' 
                  onClick={()=>user&&navigate(tool.path)}
                >
                  <div className='relative overflow-hidden w-16 h-16 rounded-2xl mb-6'>
                    <div className='absolute inset-0 opacity-80 group-hover:opacity-100 transition-opacity' style={{background:`linear-gradient(135deg,${tool.bg.from},${tool.bg.to})`}} />
                    <tool.Icon className='relative z-10 w-full h-full p-4 text-white drop-shadow-md'/>
                  </div>
                  <h3 className='mt-6 mb-3 text-xl font-bold text-white group-hover:text-primary transition-colors'>{tool.title}</h3>
                  <p className='text-text-light/80 text-sm leading-relaxed'>{tool.description}</p>
                </motion.div>
            ))}
        </motion.div>
    </div>
  )
}

export default AiTools