import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk , UserButton , useUser} from '@clerk/clerk-react'
import { motion } from 'framer-motion'

const Navbar = () => {
    const navigate = useNavigate()
    const {user}=useUser()
    const {openSignIn}=useClerk()

  return (
    <motion.div 
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className='fixed top-0 left-0 right-0 z-50 w-full glass-panel border-b border-white/10 flex justify-between items-center py-4 px-6 sm:px-20 xl:px-32'
    >
        <motion.div whileHover={{ scale: 1.05 }} className='cursor-pointer flex items-center gap-2' onClick={()=>navigate('/')}>
           <img src={assets.logo} alt="logo" className='w-28 sm:w-36 brightness-200 contrast-200 drop-shadow-[0_0_8px_rgba(102,252,241,0.5)]'/>
           <span className="text-xl font-bold tracking-widest text-primary hidden sm:block">QUICK AI</span>
        </motion.div>

       {
        user ? (
          <UserButton appearance={{ elements: { avatarBox: "w-10 h-10 border-2 border-primary" } }} />
        ) : (
          <motion.button 
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px rgba(102,252,241,0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={openSignIn} 
            className='flex items-center gap-2 rounded-full text-sm font-semibold cursor-pointer bg-primary text-black px-8 py-2.5 transition-all duration-300'
          >
            Get Started <ArrowRight className='w-4 h-4'/>
          </motion.button>
        )
      }
    </motion.div>
  )
}

export default Navbar