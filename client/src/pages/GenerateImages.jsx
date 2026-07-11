import { Image, Sparkles } from 'lucide-react';
import React, { useState } from 'react'
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;

const GenerateImages = () => {

  const imagestyle=[
   'Realistic' ,'Ghibli style' ,'Anime style','Cartoon style','Fantasy style','Realistic style','3D style','portrait style' 

  ]
    const [selectedstyle,setselectedstyle]=useState('Realistic');
    const [input,setinput]= useState('');
    const [publish,setpublish]=useState(false)
    const [loading,setloading]=useState(false);
    const [content,setcontent]=useState('');

    const {getToken}=useAuth();

    const onsubmithandler=async(e)=>{
      e.preventDefault();

      try {
      setloading(true);
      const prompt=`Generate an image of ${input} in the ${selectedstyle} style`
      const {data}=await axios.post('/api/ai/generate-image' ,
        {prompt,publish},{headers:{Authorization:`Bearer ${await getToken()}`}})

        if(data.success){
          setcontent(data.content);
        }
        else{
          toast.error(data.message)
        }

      
      } catch (error) {
        toast.error(error.message)
        
      }
      setloading(false);

    }

    

  return (
<motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className='h-full overflow-y-auto p-6 lg:p-10 flex flex-col lg:flex-row items-start gap-8'
>
    {/* col left */}
        <form onSubmit={onsubmithandler} className='w-full lg:w-1/2 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10'>
            <div className='flex items-center gap-3 mb-8' >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                <Sparkles className='w-5 text-primary'/>
              </div>
              <h1 className='text-2xl font-bold text-white tracking-wide'>AI Image Generator</h1>
            </div>

            <p className='text-sm font-medium text-text-light/80 mb-2 uppercase tracking-wider'>Describe your Image</p>

            <textarea onChange={(e)=>setinput(e.target.value)} value={input} rows={4}
            className='w-full p-4 bg-black/20 text-white outline-none text-sm rounded-xl 
            border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all resize-none placeholder-text-light/30' placeholder='A futuristic cyberpunk city at night with neon lights...' required/>

            <p className='mt-6 mb-3 text-sm font-medium text-text-light/80 uppercase tracking-wider'>Style</p>

            {/* button div */}
            <div className='flex gap-2 flex-wrap'>
              {imagestyle.map((item)=>(
                <span onClick={()=>setselectedstyle(item)} 
                className={`text-xs px-4 py-2 border rounded-lg cursor-pointer transition-all duration-300
                  ${selectedstyle===item?'bg-primary/20 text-primary border-primary shadow-[0_0_10px_rgba(102,252,241,0.2)]':
                    'text-text-light/70 border-white/10 hover:bg-white/5 hover:border-white/30'}`}  
                key={item}>{item}</span>
              ))}
            </div>
            
            <div className='mt-8 mb-6 flex items-center gap-3 p-4 rounded-xl bg-black/20 border border-white/5'> 
              <label className='relative cursor-pointer flex items-center'>
                <input type="checkbox" name="" onChange={(e)=>setpublish(e.target.checked)}
                checked={publish} className='sr-only peer'/>
                <div className='w-11 h-6 bg-white/10 rounded-full
                peer-checked:bg-primary transition-colors border border-white/10 peer-checked:border-primary shadow-inner'>
                </div>
                <span className='absolute left-1 top-1 w-4 h-4 bg-white rounded-full 
                transition-transform peer-checked:translate-x-5 shadow-sm'></span>
              </label>
              <p className='text-sm text-text-light font-medium'>Make this image public to the community</p>

            </div>

            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(102,252,241,0.4)" }}
              whileTap={{ scale: 0.98 }}
              disabled={loading} 
              className='w-full flex justify-center items-center gap-2
            bg-primary hover:bg-primary/90 text-black font-bold px-4 py-3.5 
            text-sm rounded-xl cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {
              loading ? <span className='w-5 h-5 rounded-full border-2 border-black/20 border-t-black animate-spin'></span>
              : <><Image className='w-5'/> Generate Image</>
              }
            </motion.button>

        </form>

        {/* right col */}
          <div className='w-full lg:w-1/2 glass-panel p-6 sm:p-8 rounded-2xl flex flex-col border border-white/10 min-h-[500px]'>
            <div className='flex items-center gap-3 mb-6'>
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
                <Image className='w-5 text-secondary'/>
              </div>
              <h1 className='text-2xl font-bold text-white tracking-wide'>Result</h1>
            </div>

      {
        !content ? (
        <div className='flex-1 flex justify-center items-center rounded-xl bg-black/20 border border-white/5 border-dashed relative overflow-hidden'>
          <div className='text-sm flex flex-col items-center gap-4 text-text-light/50 text-center px-4 relative z-10'>
            <motion.img 
              src={assets.vision_graphic} 
              alt="Vision AI"
              className="w-32 h-32 object-contain drop-shadow-[0_0_20px_rgba(102,252,241,0.2)]"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <p className="mt-2 text-white/70">Enter a prompt and click "Generate image" <br/>to see the magic happen</p>
          </div>
        </div>
        ):(
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className='flex-1 rounded-xl overflow-hidden shadow-[0_0_30px_rgba(102,252,241,0.15)] border border-white/10 relative group'
          >
            <img src={content} alt="generated" className='w-full h-full object-cover'/>
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <a href={content} target="_blank" rel="noreferrer" className="px-6 py-2 bg-white/20 backdrop-blur-md text-white font-medium rounded-full border border-white/30 hover:bg-white/30 transition-colors">
                View Full Size
              </a>
            </div>
          </motion.div>
        )
      }
</div>
    </motion.div>  )
}

export default GenerateImages