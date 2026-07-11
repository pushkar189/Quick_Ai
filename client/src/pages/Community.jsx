import { Heart, Globe2 } from 'lucide-react'
import React, { useState } from 'react'
import axios from 'axios';
import { useAuth, useUser } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { useEffect } from 'react';
import { motion } from 'framer-motion'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const Community = () => {
  const [creations,setcreations]=useState([])
  const [loading,setloading]=useState(true)
  const {user} = useUser()

  const {getToken} = useAuth();

  const fetchCreations=async()=>{
  try {
    const {data}=await axios.get('/api/user/get-published-creations',{
      headers:{Authorization: `Bearer ${await getToken()}`}
    })
    if(data.success){
      setcreations(data.creations)
    }
    else{
      toast.error(data.message)
    }
    
  } catch (error) {
    toast.error(error.message)
    
  }
  setloading(false);
}

const imageliketoggle=async(id)=>{

 try {
    const {data}=await axios.post('/api/user/toggle-like-creation',{id},{
       headers:{Authorization: `Bearer ${await getToken()}`}
    })
    if(data.success){
      toast.success(data.message)
      await fetchCreations() // Refresh creations after toggling like
    }
    else{
      toast.error(data.message)
    }
 } catch (error) {
  toast.error(error.message)
  
 }

}

useEffect(()=>{
if(user){
  fetchCreations()
}

},[user])

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
};


  return !loading? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='flex-1 h-full flex flex-col p-6 lg:p-10'
        >
          <div className='flex items-center gap-3 mb-8'>
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
              <Globe2 className='w-5 text-primary'/>
            </div>
            <h1 className='text-2xl font-bold text-white tracking-wide'>Community Gallery</h1>
          </div>
      
      <div className='glass-panel h-full w-full rounded-2xl overflow-y-auto p-4 custom-scrollbar border border-white/10'>

        <motion.div variants={containerVariants} initial="hidden" animate="visible" className='flex flex-wrap -m-2'>
        {creations.map((creation,index)=>(
          <motion.div variants={itemVariants} key={index} className='relative group w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 p-2'>
            <div className="w-full h-64 overflow-hidden rounded-xl border border-white/10 relative shadow-[0_0_15px_rgba(0,0,0,0.5)]">
              <img src={creation.content} alt="Community Creation" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-110'/>
              
              <div className='absolute inset-0 flex flex-col justify-end p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <p className='text-sm text-white mb-2 line-clamp-2'>{creation.prompt}</p>
                <div className='flex justify-between items-center w-full'>
                  <span className="text-xs text-text-light/70 bg-white/10 px-2 py-1 rounded backdrop-blur-md">
                    {new Date(creation.created_at).toLocaleDateString()}
                  </span>
                  <div className='flex gap-1.5 items-center bg-black/40 px-3 py-1.5 rounded-full backdrop-blur-md border border-white/10'> 
                    <span className="text-white text-xs font-bold">{creation.likes.length}</span>
                    <Heart onClick={()=>imageliketoggle(creation.id)} className={`w-4 h-4 hover:scale-125 transition-transform
                      cursor-pointer ${creation.likes.includes(user.id)?'fill-primary text-primary drop-shadow-[0_0_5px_rgba(102,252,241,0.8)]':'text-white'}`}/>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        </motion.div>

      </div>
    </motion.div>
  ):(
    <div className='flex justify-center items-center h-full'>
      <span className='w-12 h-12 rounded-full border-4 border-primary/30 border-t-primary animate-spin'></span>
    </div>
  )
}

export default Community