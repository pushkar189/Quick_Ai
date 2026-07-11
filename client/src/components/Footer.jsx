import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 xl:px-32 pt-16 pb-8 w-full text-text-light/70 mt-20 border-t border-white/5 bg-background-dark relative overflow-hidden">
        
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

    <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-b border-white/10 pb-12 relative z-10">
        <div className="md:max-w-96">
            <div className='flex items-center gap-2'>
              <img className="h-10 brightness-200 contrast-200" src={assets.logo} alt="logo"/>
              <span className="text-xl font-bold tracking-widest text-primary hidden sm:block">QUICK AI</span>
            </div>
            <p className="mt-6 text-sm leading-relaxed">
                Experience the power of AI with QuickAI. <br/>Transform your content creation with our suite of premium AI tools. Write articles, generate images, and enhance your workflow.
            </p>
        </div>
        <div className="flex-1 flex items-start md:justify-end gap-16 lg:gap-24">
            <div>
                <h2 className="font-semibold mb-6 text-white tracking-wide uppercase text-sm">Company</h2>
                <ul className="text-sm space-y-4">
                    <li><a href="#" className='hover:text-primary transition-colors'>Home</a></li>
                    <li><a href="#" className='hover:text-primary transition-colors'>About us</a></li>
                    <li><a href="#" className='hover:text-primary transition-colors'>Contact us</a></li>
                    <li><a href="#" className='hover:text-primary transition-colors'>Privacy policy</a></li>
                </ul>
            </div>
            <div>
                <h2 className="font-semibold text-white mb-6 tracking-wide uppercase text-sm">Subscribe</h2>
                <div className="text-sm space-y-4">
                    <p className='max-w-[200px]'>The latest news, articles, and resources, sent to your inbox weekly.</p>
                    <div className="flex items-center gap-2 pt-2">
                        <input className="bg-white/5 border border-white/10 placeholder-text-light/50 focus:border-primary/50 outline-none w-full max-w-64 h-10 rounded-lg px-3 transition-colors text-white" type="email" 
                        placeholder="Enter your email"/>
                        <button className="bg-primary hover:bg-primary/80 transition-colors w-24 h-10 text-black font-semibold rounded-lg cursor-pointer">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <p className="pt-8 text-center text-xs md:text-sm text-text-light/50 relative z-10">
        Copyright 2025 © <a href="#" className='hover:text-primary'>Shivam</a>. All Right Reserved.
    </p>
</footer>
  )
}

export default Footer