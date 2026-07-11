import React, { useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets';
import { Menu, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import { SignIn, useUser } from '@clerk/clerk-react';

const Layout = () => {
    const navigate = useNavigate();
    const [ sidebar , setSidebar ] = useState(false)
    const {user} = useUser()

  return user ? (
    <div className='flex flex-col items-start justify-start h-screen bg-background-dark text-text-light overflow-hidden'>
        <nav className='w-full px-8 min-h-16 flex items-center justify-between glass-panel border-b border-white/10 z-50'>
            <div className='flex items-center gap-2 cursor-pointer' onClick={()=>navigate('/')}>
               <img className='w-28 sm:w-36 brightness-200 contrast-200 drop-shadow-[0_0_8px_rgba(102,252,241,0.5)]' src={assets.logo} alt="logo" />
               <span className="text-xl font-bold tracking-widest text-primary hidden sm:block">QUICK AI</span>
            </div>
            {
                sidebar ? <X onClick={()=>setSidebar(false)} className='w-6 h-6 text-white sm:hidden cursor-pointer'/>
                : <Menu onClick={()=>setSidebar(true)} className='w-6 h-6 text-white sm:hidden cursor-pointer'/>
            }
        </nav>
         <div className='flex-1 w-full flex h-[calc(100vh-64px)] relative'>
            <Sidebar sidebar={sidebar} setsidebar={setSidebar}/>
            <div className='flex-1 relative z-10'>
                <Outlet />
            </div>
        </div>
    </div>
  ) : (
        <div className='flex items-center justify-center h-screen bg-background-dark'>
            <SignIn />
        </div>
  )
}

export default Layout