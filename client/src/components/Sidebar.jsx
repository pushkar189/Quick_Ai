import { useClerk , useUser } from '@clerk/clerk-react'
import { Eraser, FileText, Hash, House, Image, LogOut, Scissors, SquarePen, Users } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

const navItems = [
    {to: '/ai' , label: 'Dashboard' , Icon: House},
    {to:'/ai/write-article',label:'Write Article',Icon:SquarePen},
    {to:'/ai/blog-titles',label:'Blog Titles',Icon:Hash},
    {to:'/ai/generate-images',label:'Generate Images',Icon: Image},
    {to:'/ai/remove-background',label:'Remove Background',Icon:Eraser},
    {to:'/ai/remove-object',label:'Remove 0bject',Icon:Scissors},
    {to:'/ai/review-resume',label:'Review Resume',Icon:FileText},
    {to:'/ai/community',label:'Community',Icon:Users},
]

const Sidebar = ({ sidebar , setSidebar}) => {
    const {user} = useUser()
    const {signOut,openUserProfile}=useClerk()

  return (
    <div className={`w-60 glass-panel border-r border-white/10 flex flex-col justify-between items-center max-sm:absolute top-0 bottom-0 z-40 ${sidebar?'translate-x-0':
        'max-sm:-translate-x-full'} transition-all duration-300 ease-in-out`}>
            <div className='my-7 w-full'>
                <div className="relative w-14 h-14 mx-auto mb-2">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-secondary blur-sm opacity-50"></div>
                  <img src={user.imageUrl} alt="User avatar"  className='w-14 h-14 rounded-full relative z-10 border-2 border-background-dark' />
                </div>
                <h1 className='mt-1 text-center text-white font-medium'>{user.fullName}</h1>

                <div className='px-6 mt-8 text-sm text-text-light/80 font-medium space-y-1.5'>
                    {navItems.map(({to,label,Icon})=>(
                        <NavLink 
                            key={to} 
                            to={to}
                            end={to ==='/ai'}
                            onClick={()=>setSidebar(false)}
                            className={({isActive})=> `px-4 py-3 flex items-center gap-3 rounded-lg transition-all duration-200 ${isActive ?'bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(102,252,241,0.15)]':'hover:bg-white/5 hover:text-white'}`}>
                            {({isActive})=>(
                            <>
                                <Icon className={`w-4 h-4 ${isActive ?'text-primary drop-shadow-[0_0_5px_rgba(102,252,241,0.8)]' :''}`}/>
                                {label}
                            </>
                                )}

                        </NavLink>
                    ))}
                </div>
            </div>

            <div className='w-full border-t border-white/10 p-4 px-6 flex items-center justify-between bg-white/5'>
                    <div onClick={openUserProfile} className='flex gap-3 items-center cursor-pointer group'>
                    <img src={user.imageUrl} className='w-9 rounded-full border border-white/20 group-hover:border-primary transition-colors' alt="" />

                    <div>
                         <h1 className='text-sm font-medium text-white group-hover:text-primary transition-colors'>{user.fullName}</h1>
                         <p className='text-xs text-primary/80'>
                            Premium Plan
                        </p>
                    </div>
                    </div>
                    <motion.div whileHover={{ scale: 1.1, color: "#ff4d4d" }} whileTap={{ scale: 0.9 }}>
                      <LogOut onClick={signOut} className='w-5 text-text-light/50 transition cursor-pointer' />
                    </motion.div>
            </div>
    </div>
  )
}

export default Sidebar