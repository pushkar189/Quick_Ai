import { Edit, Sparkle } from 'lucide-react'
import React, { useState } from 'react'
import Markdown from 'react-markdown';
import axios from 'axios';
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'
import { assets } from '../assets/assets'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {
   const articlelength=[
    {length:800, text: 'short(500-800 words)'},
    {length:1200, text: 'Medium(800-1200 words)'},
    {length:1600, text: 'Long(1200+ words)'},

  ]
  const [selectedlength,setselectedlength]=useState(articlelength[0]);
  const [input,setinput]= useState('');

  const [loading,setloading]=useState(false);
  const [content,setcontent]=useState('');

  const {getToken} = useAuth()


  const onSubmitHandler = async (e) => {
    e.preventDefault();
     
    try {
      setloading(true)

      const prompt = `Write an article about ${input} in ${selectedlength.text}`

      const { data } = await axios.post('/api/ai/generate-article', {prompt , length: selectedlength.length}, {
        headers: {
          Authorization: `Bearer ${await getToken()}`}
    })

    if(data.success){
      setcontent(data.content);
    }else{
      toast.error(error.message)
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
        {/* c ol left */}
        <form onSubmit={onSubmitHandler} className='w-full lg:w-1/2 glass-panel p-6 sm:p-8 rounded-2xl border border-white/10'>
            <div className='flex items-center gap-3 mb-8'>
               <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center border border-primary/30">
                 <Sparkle className='w-5 text-primary'/>
               </div>
                <h1 className='text-2xl font-bold text-white tracking-wide'>Article Configuration</h1>
            </div>

             <p className='text-sm font-medium text-text-light/80 mb-2 uppercase tracking-wider'>Article Topic</p>

            <input 
               type="text" onChange={(e)=>setinput(e.target.value)} value={input}
               className='w-full p-4 bg-black/20 text-white outline-none text-sm rounded-xl 
            border border-white/10 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder-text-light/30' placeholder='The future of artificial intelligence is ...' required />
            
            <p className='mt-8 mb-3 text-sm font-medium text-text-light/80 uppercase tracking-wider'>Article Length</p>

            <div className='flex gap-2 flex-wrap'>
              {articlelength.map((item,index)=>(
                <span onClick={()=>setselectedlength(item)} 
                className={`text-xs px-4 py-2 border rounded-lg cursor-pointer transition-all duration-300 ${selectedlength.text===item.text ?'bg-primary/20 text-primary border-primary shadow-[0_0_10px_rgba(102,252,241,0.2)]':'text-text-light/70 border-white/10 hover:bg-white/5 hover:border-white/30'}`}  
                key={index}>{item.text}</span>
              ))}
            </div>

            <br />
            <motion.button 
              whileHover={{ scale: 1.02, boxShadow: "0px 0px 15px rgba(102,252,241,0.4)" }}
              whileTap={{ scale: 0.98 }}
              disabled={loading} 
              className='w-full flex justify-center items-center gap-2
            bg-primary hover:bg-primary/90 text-black font-bold px-4 py-3.5 mt-2
            text-sm rounded-xl cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed'
            >
                {
                  loading ? <span className='w-5 h-5 rounded-full border-2 border-black/20 border-t-black animate-spin'></span>
                  :<Edit className='w-5'/>
                }
                  Generate Article
            </motion.button>
        </form>

        {/* right col */}
        <div className='w-full lg:w-1/2 glass-panel p-6 sm:p-8 rounded-2xl flex flex-col border border-white/10 min-h-[500px] max-h-[700px]'>
            <div className='flex items-center gap-3 mb-6'>
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center border border-secondary/30">
                <Edit className='w-5 text-secondary'/>
              </div>
              <h1 className='text-2xl font-bold text-white tracking-wide'>Generated Article</h1>
            </div>

            {!content?(
            <div className='flex-1 flex justify-center items-center rounded-xl bg-black/20 border border-white/5 border-dashed relative overflow-hidden'>
              <div className='text-sm flex flex-col items-center gap-4 text-text-light/50 text-center px-4 relative z-10'>
                <motion.img 
                  src={assets.document_graphic} 
                  alt="Document"
                  className="w-32 h-32 object-contain drop-shadow-[0_0_20px_rgba(102,252,241,0.2)]"
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <p className="mt-2 text-white/70">Enter a topic and click "Generate article" <br/>to get started</p>
              </div>
            </div>
            ):(
              //converts Markdown text from your backend into formatted HTML in the browser.
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className='mt-3 h-full overflow-y-auto text-sm text-text-light/90 pr-2 custom-scrollbar'
              >
            <div className='reset-tw prose prose-invert max-w-none'> 
              <Markdown>{content}</Markdown>
              </div>
                </motion.div>
            )}
        </div>
    </motion.div>
  )
}

export default WriteArticle