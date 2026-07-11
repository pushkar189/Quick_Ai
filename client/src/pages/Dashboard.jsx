import React, { useEffect, useState } from 'react'

import { Gem, Sparkle } from 'lucide-react'
import CreationItem from '../components/CreationItem'
import { useAuth } from '@clerk/clerk-react'
import axios from 'axios';
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const[ creations , setCreations] = useState([])
  const [loading,setloading]=useState(true)

  const {getToken} = useAuth();

  const getDashboardData = async()=>{
    try {
      const {data}=await axios.get('/api/user/get-user-creations',{
        headers:{Authorization: `Bearer ${await getToken()}`}
          })
        if(data.success){
          setCreations(data.creations)
        }
        else{
        toast.error(data.message)
        }
        
    } catch (error) {
      toast.error(error.message)
      
    }
    setloading(false);
  }

  useEffect (() => {
    getDashboardData()
  } , [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='h-full overflow-y-scroll p-6 lg:p-10'
    >
      <div className='flex justify-between items-start flex-wrap lg:flex-nowrap gap-10 mb-10'>
        <div className='flex gap-6 flex-wrap w-full lg:w-auto'>
          {/* Total creation card */}
          <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className='flex justify-between items-center w-72 p-5 glass-panel rounded-2xl group transition-all duration-300 hover:shadow-[0_0_20px_rgba(102,252,241,0.15)] hover:border-primary/50'
          >
            <div className='text-text-light'>
              <p className='text-sm text-text-light/70 uppercase tracking-wider font-medium mb-1'>Total creations</p>
              <h2 className='text-3xl font-bold text-white'>{creations.length}</h2>
            </div>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary text-white flex justify-center items-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-shadow'>
              <Sparkle className='w-6 text-black'/>
            </div>
          </motion.div>

          {/* active plan card */}
          <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            className='flex justify-between items-center w-72 p-5 glass-panel rounded-2xl group transition-all duration-300 hover:shadow-[0_0_20px_rgba(187,134,252,0.15)] hover:border-[#bb86fc]/50'
          >
            <div className='text-text-light'>
              <p className='text-sm text-text-light/70 uppercase tracking-wider font-medium mb-1'>Active plan</p>
              <h2 className='text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#bb86fc] to-[#e040fb]'>
                Premium
              </h2>
            </div>
            <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-[#bb86fc] to-[#e040fb] text-white flex justify-center items-center shadow-lg shadow-[#bb86fc]/20 group-hover:shadow-[#bb86fc]/40 transition-shadow'>
              <Gem className='w-6 text-white'/>
            </div>
          </motion.div>
        </div>

        {/* Animated Dashboard Graphic */}
        <div className="hidden lg:flex flex-1 justify-end items-center px-10">
          <motion.img 
            src={assets.dashboard_graphic} 
            alt="AI Core"
            className="w-48 h-48 object-contain drop-shadow-[0_0_30px_rgba(102,252,241,0.3)]"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>
      </div>

      {loading ? (
        <div className='flex justify-center items-center h-1/2'>
          <div className='animate-spin rounded-full h-12 w-12 border-4 border-primary/30 border-t-primary'></div>
        </div>
      ) : (
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className='space-y-4'>
          <h3 className='text-xl font-semibold text-white mb-6 tracking-wide flex items-center gap-2'>
            <div className="w-2 h-6 rounded bg-primary"></div>
            Recent Creations
          </h3>
          {creations.map((item) => (
            <motion.div key={item.id} variants={itemVariants}>
              <CreationItem item={item}/>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}

export default Dashboard 