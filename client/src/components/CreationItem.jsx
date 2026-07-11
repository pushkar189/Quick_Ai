import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { motion, AnimatePresence } from 'framer-motion'

const CreationItem = ({item}) => {

    const [expanded,setExpanded]= useState(false)


  return (
    <motion.div 
      whileHover={{ scale: 1.01 }}
      onClick={()=>setExpanded(!expanded)} 
      className='p-5 max-w-5xl text-sm glass-panel border border-white/10 rounded-2xl cursor-pointer hover:border-primary/40 transition-colors'
    >
        <div className='flex justify-between items-center gap-4'>
            <div>
                 <h2 className='text-white font-medium text-base'>{item.prompt}</h2>
                <p className='text-text-light/50 mt-1 capitalize'>{item.type} - {new Date(item.created_at).toLocaleDateString()}</p>
            </div>
             <div className='bg-primary/10 border border-primary/30 text-primary 
                 px-4 py-1.5 rounded-full uppercase text-xs font-bold tracking-wider shadow-[0_0_10px_rgba(102,252,241,0.2)]'>{item.type}</div>
        </div>
        
        <AnimatePresence>
        {
        expanded&&(
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: "auto", opacity: 1, marginTop: 16 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.3 }}
              className='overflow-hidden'
            >
                <div className="pt-4 border-t border-white/10">
                {item.type ==='image'?(
                    <div className="flex justify-center">
                        <img src = {item.content} alt="image" className='w-full max-w-md rounded-xl shadow-lg border border-white/10'/>
                        </div>
                ):(
                    <div className='h-full overflow-y-auto max-h-[400px] text-sm text-text-light/90 pr-2 custom-scrollbar'>
                        <div className='reset-tw prose prose-invert max-w-none'>
                            <Markdown>
                                 {item.content}
                            </Markdown>
                           
                            </div>
                    </div>
                )}
                </div>
                </motion.div>
        )
      }
      </AnimatePresence>
    </motion.div>
  )
}

export default CreationItem